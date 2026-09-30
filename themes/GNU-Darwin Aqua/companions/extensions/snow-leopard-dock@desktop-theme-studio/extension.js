/* GNU-Darwin Aqua dock. Staged source; loading/activation is coordinator-owned.
 * No global prototypes, launch overrides, favorites edits, or desktop settings writes.
 */
const {Clutter, Cinnamon, Gio, GLib, GObject, St} = imports.gi;
const AppletManager = imports.ui.appletManager;
const Mainloop = imports.mainloop;
const Tooltips = imports.ui.tooltips;
const ByteArray = imports.byteArray;

const PREFIX = 'snow-leopard-dock-';
const STYLE_MARK = '/* snow-leopard-dock-owned */';
let metadata, runtime;

// GTypes live for the entire Cinnamon process. Reuse only this stateless,
// versioned constructor across extension imports; never cache actors or a runtime.
const TYPE_CACHE = '__dtsSnowLeopardReflectionV2';
const ReflectionFade = global[TYPE_CACHE] || (global[TYPE_CACHE] = GObject.registerClass(
    {GTypeName:'DtsSnowLeopardReflectionV2'}, class DtsSnowLeopardReflectionFade extends Cinnamon.GLSLEffect {
    _init(fraction, peak) {
        super._init();
        this.set_uniform_float(this.get_uniform_location('reflection_fraction'), 1, [fraction]);
        this.set_uniform_float(this.get_uniform_location('reflection_peak'), 1, [peak]);
    }
    vfunc_build_pipeline() {
        // Fade the bottom fraction of the full-size source BEFORE its vertical flip.
        // Applying to the clone keeps the real icon's alpha and shader untouched.
        this.add_glsl_snippet(Cinnamon.SnippetHook.FRAGMENT,
            'uniform float reflection_fraction; uniform float reflection_peak;',
            'float reflection_depth = (1.0 - cogl_tex_coord_in[0].y) / reflection_fraction;\n' +
            // Cinnamon 6.6 GLSLEffect uses SRC_COLOR * SRC_ALPHA (straight-alpha blend).
            // Undo the offscreen texture's premultiplication, then fade alpha once.
            'if (cogl_color_out.a > 0.0) cogl_color_out.rgb /= cogl_color_out.a;\n' +
            'cogl_color_out.a *= reflection_peak * clamp(1.0 - reflection_depth, 0.0, 1.0);', false);
    }
}));

function rect(x, y, w, h) {
    return new Clutter.ActorBox({x1:x, y1:y, x2:x+w, y2:y+h});
}

function bounds(actor) {
    if (!actor) return null;
    try {
        const [x, y] = actor.get_transformed_position();
        const [width, height] = actor.get_transformed_size();
        return {x, y, width, height, visible:actor.visible};
    } catch (_) { return null; }
}

class Reflection {
    constructor(owner, parent, label) {
        this.owner = owner;
        this.label = label;
        this.box = owner.own(new Clutter.Actor({reactive:false, clip_to_allocation:true}), 'reflection-' + label);
        parent.add_child(this.box);
        this.source = null;
        this.clone = null;
    }
    bind(source) {
        if (this.source === source) return;
        if (this.clone) this.owner.destroyOwned(this.clone);
        this.source = source;
        this.clone = null;
        if (!source) return;
        this.clone = this.owner.own(new Clutter.Clone({source, reactive:false}), 'mirror-' + this.label);
        this.clone.set_pivot_point(0, 0);
        this.clone.set_scale(1, -1);
        const g = this.owner.config.geometry;
        const reflection = this.owner.config.materials.reflection;
        this.clone.add_effect_with_name('snow-leopard-reflection-fade',
            new ReflectionFade(g.dock_reflection_height / g.dock_icon_size, reflection.peak_opacity));
        this.box.add_child(this.clone);
        this.owner.rebindCount++;
    }
    allocate(x, baseline, size, flags) {
        const height = this.owner.metric('dock_reflection_height');
        this.box.allocate(rect(x, baseline, size, height), flags);
        this.box.set_clip(0, 0, size, height);
        if (this.clone) this.clone.allocate(rect(0, size, size, size), flags);
    }
    destroy() {
        this.bind(null);
        this.owner.destroyOwned(this.box);
    }
}

class GroupBinding {
    constructor(owner, group) {
        this.owner = owner;
        this.group = group;
        this.alive = true;
        this.methods = [];
        this.signals = [];
        this.originalIconSize = group.iconSize;
        this.restoreStyle = group.actor.get_style();
        this.appliedStyle = null;
        this.badgeOffsets = [group.windowsBadge, group.notificationsBadge].filter(Boolean).map(b => [b, b.translation_y]);
        const id = group.groupState.appId;
        this.reflection = new Reflection(owner, group.actor, id);
        this.lamp = owner.own(new St.Widget({reactive:false}), 'lamp-' + id);
        group.actor.add_child(this.lamp);
        this.wrap('allocate', (original, args) => {
            const result = original.apply(group, args);
            if (this.alive && owner.enabled) this.allocate(args[1], args[2]);
            return result;
        });
        this.wrap('getPreferredWidth', (original, args) => {
            original.apply(group, args);
            args[2].min_size = args[2].natural_size = owner.metric('dock_icon_size');
        });
        this.wrap('getPreferredHeight', (original, args) => {
            original.apply(group, args);
            args[2].natural_size = owner.config.geometry.bottom_panel_height * owner.uiScale();
        });
        this.wrap('setIcon', (original, args) => {
            // Drop the reference before the stock method destroys its previous icon.
            this.reflection.bind(null);
            const result = original.apply(group, args);
            this.reflection.bind(group.iconBox.get_child());
            return result;
        });
        this.wrap('setMargin', (original, args) => {
            const result = original.apply(group, args);
            this.applyStyle();
            return result;
        });
        this.signals.push([group.actor, group.actor.connect('destroy', () => this.destroy(true))]);
        this.signals.push([group.actor, group.actor.connect('key-focus-in', () => group.actor.add_style_pseudo_class('dts-key-focus'))]);
        this.signals.push([group.actor, group.actor.connect('key-focus-out', () => group.actor.remove_style_pseudo_class('dts-key-focus'))]);
        this.refresh();
    }
    wrap(name, callback) {
        const descriptor = Object.getOwnPropertyDescriptor(this.group, name);
        const original = this.group[name];
        if (typeof original !== 'function') throw new Error('Unsupported AppGroup method: ' + name);
        const wrapper = (...args) => callback(original, args);
        this.methods.push({name, descriptor, wrapper});
        this.group[name] = wrapper;
    }
    applyStyle() {
        const actor = this.group.actor;
        const current = actor.get_style() || '';
        this.restoreStyle = current.split(STYLE_MARK)[0];
        this.appliedStyle = this.restoreStyle + STYLE_MARK + `padding:0px; margin-right:${this.owner.metric('dock_icon_gap')}px;`;
        if (actor.get_style() !== this.appliedStyle) actor.set_style(this.appliedStyle);
    }
    refresh() {
        if (!this.alive) return;
        const size = this.owner.metric('dock_icon_size');
        if (this.group.iconSize !== size) this.group.setActorAttributes(size);
        this.reflection.bind(this.group.iconBox.get_child());
        this.applyStyle();
        this.lamp.set_style(this.owner.imageStyle('dock-running.svg',
            this.owner.metric('dock_indicator_halo_width'), this.owner.metric('dock_indicator_halo_height')));
        this.running = this.group.groupState.metaWindows.length > 0;
        this.lamp.visible = this.running;
        this.group.actor.queue_relayout();
    }
    allocate(box, flags) {
        const size = this.owner.metric('dock_icon_size');
        const width = box.x2-box.x1, height = box.y2-box.y1;
        const x = box.x1 + Math.round((width-size)/2);
        const baseline = box.y2-this.owner.metric('dock_icon_baseline_from_bottom');
        const oldY = this.group.iconBox.y;
        const newY = baseline-size;
        this.group.iconBox.allocate(rect(x, newY, size, size), flags);
        // Preserve stock badges, shifted together with the actual icon.
        for (const badge of [this.group.windowsBadge, this.group.notificationsBadge])
            if (badge) badge.translation_y = newY-oldY;
        this.reflection.allocate(x, baseline, size, flags);
        const w = this.owner.metric('dock_indicator_halo_width');
        const h = this.owner.metric('dock_indicator_halo_height');
        this.lamp.allocate(rect(box.x1+(width-w)/2,
            box.y2-this.owner.metric('dock_indicator_center_from_bottom')-h/2, w, h), flags);
    }
    diagnostics() {
        return {appId:this.group.groupState.appId, running:!!this.running,
            reflectionBound:!!this.reflection.clone && this.reflection.source === this.group.iconBox.get_child(),
            iconSize:this.group.iconSize, iconBox:bounds(this.group.iconBox),
            reflectionBox:bounds(this.reflection.box), lampBox:bounds(this.lamp)};
    }
    destroy(actorDestroyed=false) {
        if (!this.alive) return;
        this.alive = false;
        for (const [object, id] of this.signals) { try { object.disconnect(id); } catch (_) {} }
        this.signals = [];
        for (const item of this.methods.reverse()) {
            if (this.group[item.name] !== item.wrapper) { this.owner.cleanup.methodConflicts++; continue; }
            if (item.descriptor) Object.defineProperty(this.group, item.name, item.descriptor);
            else delete this.group[item.name];
            this.owner.cleanup.methodsRestored++;
        }
        this.methods = [];
        this.reflection.destroy();
        this.owner.destroyOwned(this.lamp);
        if (!actorDestroyed) {
            this.group.actor.remove_style_pseudo_class('dts-key-focus');
            if (this.group.iconSize !== this.originalIconSize) this.group.setActorAttributes(this.originalIconSize);
            if (this.group.actor.get_style() === this.appliedStyle) this.group.actor.set_style(this.restoreStyle || null);
            for (const [badge, offset] of this.badgeOffsets) badge.translation_y = offset;
            this.group.actor.queue_relayout();
        }
    }
}

class TrashEndcap {
    constructor(owner, parent) {
        this.owner = owner;
        this.alive = true;
        this.signals = [];
        this.querying = false;
        this.refreshAgain = false;
        this.cancellable = new Gio.Cancellable();
        this.separator = owner.own(new St.Widget({reactive:false}), 'separator');
        parent.add_child(this.separator);
        this.actor = owner.own(new Cinnamon.GenericContainer({reactive:true, can_focus:true, track_hover:true,
            accessible_name:'Trash', style_class:'snow-leopard-dock-trash'}), 'trash');
        this.reflection = new Reflection(owner, this.actor, 'trash');
        this.icon = owner.own(new St.Icon({icon_name:'user-trash', icon_type:St.IconType.FULLCOLOR,
            icon_size:owner.metric('dock_icon_size'), reactive:false}), 'trash-icon');
        this.actor.add_child(this.icon);
        this.reflection.bind(this.icon);
        parent.add_child(this.actor);
        this.connect(this.actor, 'get-preferred-width', (_actor, _height, alloc) => {
            alloc.min_size = alloc.natural_size = owner.metric('dock_icon_size');
        });
        this.connect(this.actor, 'get-preferred-height', (_actor, _width, alloc) => {
            alloc.min_size = 0;
            alloc.natural_size = owner.config.geometry.bottom_panel_height * owner.uiScale();
        });
        this.connect(this.actor, 'allocate', (_actor, box, flags) => {
            const size = owner.metric('dock_icon_size');
            const x = box.x1+(box.x2-box.x1-size)/2;
            const baseline = box.y2-owner.metric('dock_icon_baseline_from_bottom');
            this.icon.allocate(rect(x, baseline-size, size, size), flags);
            this.reflection.allocate(x, baseline, size, flags);
        });
        this.connect(this.actor, 'button-release-event', (_actor, event) => {
            if (event.get_button() !== 1) return Clutter.EVENT_PROPAGATE;
            this.open(); return Clutter.EVENT_STOP;
        });
        this.connect(this.actor, 'key-press-event', (_actor, event) => {
            if (![Clutter.KEY_Return, Clutter.KEY_KP_Enter, Clutter.KEY_space].includes(event.get_key_symbol()))
                return Clutter.EVENT_PROPAGATE;
            this.open(); return Clutter.EVENT_STOP;
        });
        this.tooltip = new Tooltips.PanelItemTooltip({actor:this.actor}, 'Trash', St.Side.BOTTOM);
        this.directory = Gio.File.new_for_uri('trash:///');
        try {
            this.monitor = this.directory.monitor_directory(Gio.FileMonitorFlags.NONE, this.cancellable);
            this.connect(this.monitor, 'changed', () => this.refreshTrash());
        } catch (error) { owner.note('Trash monitor: ' + error.message); }
        this.refreshTrash();
        this.refresh();
    }
    connect(object, signal, callback) { this.signals.push([object, object.connect(signal, callback)]); }
    open() {
        try { Gio.app_info_launch_default_for_uri('trash:///', global.create_app_launch_context()); }
        catch (error) { this.owner.note('Trash launch: ' + error.message); }
    }
    finishTrashQuery() {
        this.querying = false;
        if (this.alive && this.refreshAgain) {
            this.refreshAgain = false;
            this.refreshTrash();
        }
    }
    refreshTrash() {
        if (!this.alive) return;
        if (this.querying) { this.refreshAgain = true; return; }
        this.querying = true;
        this.directory.enumerate_children_async('standard::name', Gio.FileQueryInfoFlags.NONE,
            GLib.PRIORITY_LOW, this.cancellable, (file, result) => {
                let enumerator;
                try { enumerator = file.enumerate_children_finish(result); }
                catch (error) { this.finishTrashQuery(); if (this.alive) this.owner.note('Trash status: ' + error.message); return; }
                enumerator.next_files_async(1, GLib.PRIORITY_LOW, this.cancellable, (object, res) => {
                    try {
                        const full = object.next_files_finish(res).length > 0;
                        if (this.alive) this.icon.icon_name = full ? 'user-trash-full' : 'user-trash';
                    } catch (error) { if (this.alive) this.owner.note('Trash status: ' + error.message); }
                    finally {
                        this.finishTrashQuery();
                        object.close_async(GLib.PRIORITY_LOW, null, (_obj, done) => {
                            try { _obj.close_finish(done); } catch (_) {}
                        });
                    }
                });
            });
    }
    refresh() {
        const owner = this.owner, height = owner.config.geometry.bottom_panel_height * owner.uiScale();
        const imageHeight = owner.metric('bottom_panel_height');
        this.icon.icon_size = owner.metric('dock_icon_size');
        this.separator.set_width(owner.metric('dock_separator_width'));
        this.separator.set_style(owner.imageStyle('dock-separator.svg', owner.metric('dock_separator_width'), imageHeight)
            + `background-position:0px ${height-imageHeight}px;`);
        this.actor.queue_relayout();
    }
    destroy() {
        if (!this.alive) return;
        this.alive = false;
        this.cancellable.cancel();
        for (const [object, id] of this.signals) { try { object.disconnect(id); } catch (_) {} }
        this.signals = [];
        if (this.monitor) { this.monitor.cancel(); this.monitor = null; }
        this.tooltip.destroy();
        this.reflection.destroy();
        this.owner.destroyOwned(this.icon);
        this.owner.destroyOwned(this.actor);
        this.owner.destroyOwned(this.separator);
    }
}

class DockRuntime {
    constructor(meta, config) {
        this.meta = meta;
        this.config = config;
        this.enabled = false;
        this.applet = null;
        this.center = null;
        this.records = new Map();
        this.owned = new Set();
        this.signals = [];
        this.timers = new Set();
        this.scale = 1;
        this.rebindCount = 0;
        this.messages = [];
        this.cleanup = {methodsRestored:0, methodConflicts:0, centerStyleRestored:false};
    }
    uiScale() { return global.ui_scale || 1; }
    metric(key) { return Math.round(this.config.geometry[key] * this.scale * this.uiScale()); }
    imageStyle(file, width, height) {
        return `background-image:url("${this.meta.path}/assets/${file}"); background-size:${width}px ${height}px; background-repeat:no-repeat;`;
    }
    note(message) {
        if (this.messages.includes(message)) return;
        this.messages.push(message);
        global.logWarning(this.config.uuid + ': ' + message);
    }
    own(actor, name) {
        actor.set_name(PREFIX + name);
        this.owned.add(actor);
        actor.connect('destroy', () => this.owned.delete(actor));
        return actor;
    }
    destroyOwned(actor) {
        if (actor && this.owned.delete(actor)) actor.destroy();
    }
    connect(object, signal, callback) { this.signals.push([object, object.connect(signal, callback)]); }
    start() {
        this.enabled = true;
        this.themeSettings = new Gio.Settings({schema_id:'org.cinnamon.theme'});
        this.connect(this.themeSettings, 'changed::name', () => this.reconcile());
        this.connect(global.settings, 'changed::enabled-applets', () => this.reconcile());
        this.connect(global.workspace_manager, 'active-workspace-changed', () => this.reconcile());
        const id = Mainloop.timeout_add(250, () => {
            if (!this.enabled) { this.timers.delete(id); return false; }
            this.reconcile(); return true;
        });
        this.timers.add(id);
        this.reconcile();
    }
    findApplet() {
        if (this.themeSettings.get_string('name') !== this.config.theme_name) return null;
        const target = this.config.target;
        const definition = AppletManager.getAppletDefinition({applet_id:String(target.instance_id)});
        if (!definition || definition.real_uuid !== target.applet_uuid || definition.panelId !== target.panel_id
            || definition.location_label !== 'center') return null;
        const applet = definition.applet;
        if (!applet || !applet.panel || applet.panel.panelId !== target.panel_id
            || typeof applet.getCurrentWorkspace !== 'function') return null;
        return applet;
    }
    reconcile() {
        if (!this.enabled) return;
        const applet = this.findApplet();
        if (applet !== this.applet) {
            this.detach();
            if (!applet) return;
            this.applet = applet;
            this.center = applet.actor.get_parent();
            this.centerOriginalStyle = this.center.get_style();
            this.endcap = new TrashEndcap(this, this.center);
        }
        if (!this.applet) return;
        const workspace = this.applet.getCurrentWorkspace();
        const groups = workspace ? workspace.appGroups.filter(group => group && !group.groupState.willUnmount) : [];
        for (const [group, record] of this.records) {
            if (!groups.includes(group) || !record.alive) { record.destroy(); this.records.delete(group); }
        }
        const g = this.config.geometry;
        const count = groups.length + 1;
        const desired = 2*g.dock_padding_horizontal + count*g.dock_icon_size
            + Math.max(0,count-1)*g.dock_icon_gap + g.dock_separator_width;
        const available = this.applet.panel.monitor.width;
        let iconPixels = Math.max(1, Math.floor(g.dock_icon_size * Math.min(1, available/(desired*this.uiScale()))));
        const occupied = size => {
            const px = key => Math.round(g[key]*size/g.dock_icon_size*this.uiScale());
            return 2*px('dock_padding_horizontal') + count*px('dock_icon_size')
                + Math.max(0,count-1)*px('dock_icon_gap') + px('dock_separator_width');
        };
        while (iconPixels > 1 && occupied(iconPixels) > available) iconPixels--;
        this.scale = iconPixels/g.dock_icon_size;
        this.applyCenterStyle();
        for (const group of groups) {
            let record = this.records.get(group);
            if (!record) { record = new GroupBinding(this, group); this.records.set(group, record); }
            else record.refresh();
        }
        this.endcap.refresh();
    }
    applyCenterStyle() {
        const g = this.config.geometry;
        const pad = this.metric('dock_padding_horizontal');
        const edge = Math.round((g.dock_perspective_inset+1)*this.scale*this.uiScale());
        const shelf = this.scale === 1 ? 'dock-shelf.svg' : `dock-shelf-${Math.round(g.dock_icon_size*this.scale)}.svg`;
        const base = (this.center.get_style() || '').split(STYLE_MARK)[0];
        this.centerOriginalStyle = base;
        this.centerAppliedStyle = base + STYLE_MARK + `padding:0px ${pad}px; spacing:0px;`
            + `border-image:url("${this.meta.path}/assets/${shelf}") 0 ${edge} ${this.metric('dock_shelf_height')} ${edge};`;
        if (this.center.get_style() !== this.centerAppliedStyle) this.center.set_style(this.centerAppliedStyle);
    }
    detach() {
        for (const record of this.records.values()) record.destroy();
        this.records.clear();
        if (this.endcap) { this.endcap.destroy(); this.endcap = null; }
        if (this.center && this.center.get_style() === this.centerAppliedStyle) {
            this.center.set_style(this.centerOriginalStyle || null);
            this.cleanup.centerStyleRestored = true;
        }
        this.center = null;
        this.applet = null;
    }
    stop() {
        this.enabled = false;
        for (const id of this.timers) Mainloop.source_remove(id);
        this.timers.clear();
        for (const [object, id] of this.signals) { try { object.disconnect(id); } catch (_) {} }
        this.signals = [];
        this.detach();
        for (const actor of [...this.owned]) this.destroyOwned(actor);
    }
    getDiagnostics() {
        const groups = [...this.records.values()].filter(record => record.alive).map(record => record.diagnostics());
        return {enabled:this.enabled, attached:!!this.applet, groupCount:groups.length, groups,
            workspaceIndex:global.workspace_manager.get_active_workspace_index(),
            instanceId:this.applet ? this.applet.instance_id : null,
            panelId:this.applet ? this.applet.panel.panelId : null,
            endcapCount:this.endcap ? 1 : 0, trashBox:this.endcap ? bounds(this.endcap.actor) : null,
            trashUri:this.endcap ? 'trash:///' : null, trashVisible:this.endcap ? this.endcap.actor.visible : false,
            ownedActors:this.owned.size, timers:this.timers.size, signals:this.signals.length,
            rebindCount:this.rebindCount, scale:this.scale, magnification:false,
            messages:[...this.messages], cleanup:{...this.cleanup}};
    }
}

function init(meta) { metadata = meta; }

function enable() {
    const config = JSON.parse(ByteArray.toString(GLib.file_get_contents(metadata.path + '/config.json')[1]));
    runtime = new DockRuntime(metadata, config);
    try { runtime.start(); }
    catch (error) { runtime.stop(); throw error; }
    // Capture this instance so a saved callback remains useful AFTER disable/re-enable.
    const current = runtime;
    return {getDiagnostics:() => current.getDiagnostics()};
}

function disable() {
    if (runtime) runtime.stop();
    runtime = null;
}
