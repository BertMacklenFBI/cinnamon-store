# Window decorations on modern Cinnamon: where they come from

Scope: how Cinnamon's window manager (Muffin) draws server-side titlebars and
borders, and what that means for the Pixelcart GTK 3 stylesheet.

## Conclusion

On Cinnamon 5.4 and later, window borders and titlebars of server-side
decorated windows come from the **GTK 3 theme** (`gtk-3.0/gtk.css` of the theme
selected as the applications/GTK theme): Muffin builds a small tree of GTK style
contexts and paints the frame with `gtk_render_background/frame/layout`.
`metacity-1/metacity-theme-3.xml` is not read by Muffin 5.4+ at all; it is used
by Cinnamon 5.2 and older, and by other window managers that still implement
the Metacity theme format (Metacity itself, MATE's Marco). Shipping it remains
worthwhile for those, but it has no effect on a current Cinnamon desktop.

Confidence: **high** for Muffin master (source read directly); **high** that
the switch happened at 5.4.0 (changelog + secondary reporting); **not
independently verified** for each intermediate release (5.6, 5.8, 6.0-6.4) —
only master was read, plus the changelog entries between them. No live
Cinnamon session was available; nothing here was observed on a running desktop.

## Evidence

Source read: `linuxmint/muffin` master at commit
`cebbf29294328355695cca19df83f2ce7f0266ad` (version 6.7.8 in `meson.build`),
`linuxmint/cinnamon` master at `a5ed84df597e73cc0ddff7282ba85fd50c6bd047`.

1. **No Metacity theme code remains in Muffin.** `src/ui/` contains only
   `frames.c`, `theme.c`, `theme-private.h`, `ui.c` (no `theme-parser.c`), and
   `grep -ri metacity src/` finds only an unrelated historical comment in
   `src/core/boxes.c`.
2. **The theme is a GTK CSS provider.**
   [`meta_theme_create_style_info()`](https://github.com/linuxmint/muffin/blob/cebbf29294328355695cca19df83f2ce7f0266ad/src/ui/theme.c#L1072-L1134)
   reads `gtk-theme-name` from `GtkSettings` and calls
   `gtk_css_provider_get_named (theme_name, variant)`; the provider is attached
   to every context at `GTK_STYLE_PROVIDER_PRIORITY_SETTINGS`
   ([`create_style_context()`](https://github.com/linuxmint/muffin/blob/cebbf29294328355695cca19df83f2ce7f0266ad/src/ui/theme.c#L1000-L1053)).
   `variant` is the window's `_GTK_THEME_VARIANT` (e.g. `dark`), so
   `gtk-dark.css` is used for windows that request it
   (`meta_ui_frame_attach_style()` in `src/ui/frames.c`).
3. **Changelog** (`debian/changelog` in the Muffin repo): `muffin (5.4.0)`
   lists "Mutter 3.36.9-0ubuntu0.20.04.1 rebase" and "Catch gtk theme name
   changes…"; 5.4.1 "Suppress 'invisible' borders and theme shadows for
   maximized and tiled windows". Older entries (pre-5.4) still mention
   "metacity themes" and `theme-parser.c`.
4. **Cinnamon's settings no longer offer a window-border theme.**
   `cs_themes.py` on master contains no reference to `metacity`; its theme
   chooser enumerates themes by the presence of `gtk-3.0` and `cinnamon`
   directories. (Only leftover thumbnail images under
   `files/usr/share/cinnamon/thumbnails/metacity-1/` remain in the repo.)
5. **Secondary sources.** LWN's Linux Mint 21 article
   (<https://lwn.net/Articles/906859>) reports that Muffin was rebased on
   Mutter 3.36 and that starting with Cinnamon 5.4 GTK is used for both CSD and
   SSD decorations where Metacity themes were used for SSD before (read through
   a summarising fetch tool, so treat the wording as paraphrase). A user thread
   (<https://forum.endeavouros.com/t/windows-border-disappeared-from-themes-settings/28719>)
   confirms the "Window borders" chooser disappeared with 5.4. The official
   page <https://www.linuxmint.com/rel_vanessa_cinnamon_whatsnew.php> could not
   be fetched from this sandbox.
6. The `cinnamon-spices-themes` README does not mention `metacity-1` or
   `gtk-3.0` at all (only `cinnamon/cinnamon.css` is listed as required); most
   themes in that repository still ship a `metacity-1` directory.

## The style contexts Muffin creates

`meta_theme_create_style_info()`, `src/ui/theme.c`:

| Element (`META_STYLE_ELEMENT_*`) | GType | CSS node | Classes |
|---|---|---|---|
| `WINDOW` | `MetaFrames` (a `GtkWindow`) | `window` | `background`, `ssd` |
| `FRAME` | `MetaFrames` | `decoration` (child of window) | – |
| `TITLEBAR` | `GtkHeaderBar` | `headerbar` (child of decoration) | `titlebar`, `horizontal`, `default-decoration` |
| `TITLE` | `GtkLabel` | `label` (child of headerbar) | `title` |
| `BUTTON` | `GtkButton` | `button` (child of headerbar) | `titlebutton`, plus `close` / `maximize` / `minimize` added only while that button is drawn; the window-menu button gets no extra class |
| `IMAGE` | `GtkImage` | `image` (child of button) | – |

So the full selector path of a close button is
`window.background.ssd > decoration > headerbar.titlebar.horizontal.default-decoration > button.titlebutton.close`.

State and classes set per frame
([`meta_style_info_set_flags()`](https://github.com/linuxmint/muffin/blob/cebbf29294328355695cca19df83f2ce7f0266ad/src/ui/theme.c#L1195-L1228)):

- Unfocused: `GTK_STATE_FLAG_BACKDROP` on **every** context (`:backdrop`).
  There is no `:focus`/`:active` on a focused frame.
- `maximized` **or** `tiled` (one generic class, no side information) is added
  to the top-level `window` node of every context's path.
- Buttons: `:hover` (`GTK_STATE_PRELIGHT`) and `:active` on the button context
  while that button is drawn. Text direction sets `:dir(ltr)`/`:dir(rtl)`.
- Fullscreen windows get no frame (`meta_frame_layout_get_borders()` returns
  zero borders). No class distinguishes dialogs, attached modal dialogs or
  utility windows.

## Which CSS properties are honoured

Geometry — [`meta_frame_layout_sync_with_style()`](https://github.com/linuxmint/muffin/blob/cebbf29294328355695cca19df83f2ce7f0266ad/src/ui/theme.c#L273-L356)
and `meta_frame_layout_get_borders()`:

- `decoration`: `border-width + padding` = visible frame thickness on all four
  sides (`frame_border`). The **clip extents** of its background
  (`gtk_render_background_get_clip`, i.e. how far outset `box-shadow` reaches)
  become the *invisible* border. For resizable windows the invisible border is
  at least `draggable-border-width` (GSettings, default 10) minus the visible
  border, and 0 on tiled edges; so `box-shadow` is **not** needed to obtain a
  resize grab area.
- `headerbar`: `min-height`, `border-width + padding` (`titlebar_border`),
  `border-radius` (used for corner rounding/shape; bottom corners use
  `max(radius, min(frame bottom, frame side))`).
- `label.title`: `margin` (adds to height only), `font` (merged with the
  `titlebar-font` preference, which can override weight/size), `color`.
  Title `padding` is ignored.
- `button.titlebutton`: `min-width`, `min-height`, `border-width + padding`,
  `margin`. `image`: `min-width/height`, border, padding, margin are added to
  the button. Icon size is fixed at 16 px; spacing between buttons is fixed
  at 6 px.
- Title-bar height = `frame.top + max(button height, title height, headerbar
  min-height) + headerbar border/padding (top+bottom)`.

Painting — [`meta_frame_layout_draw_with_style()`](https://github.com/linuxmint/muffin/blob/cebbf29294328355695cca19df83f2ce7f0266ad/src/ui/theme.c#L718-L921):

1. `gtk_render_background` + `gtk_render_frame` of `decoration` over the whole
   visible frame rectangle (so `background*`, `border*`, `box-shadow`,
   `border-radius`, `border-image` all work).
2. `gtk_render_background` + `gtk_render_frame` of `headerbar` over the full
   width and the full title-bar height, **starting at the very top-left of
   the frame**: it paints over the decoration's top and side borders in that
   band, so the title bar must draw those frame lines itself.
3. `gtk_render_layout` of the title with the `label.title` context (`color`;
   `text-shadow` would apply). Centred, ellipsised.
4. Per button: `gtk_render_background` + `gtk_render_frame`, then the icon.

Title-button icons: looked up **from the icon theme** by name
(`window-close-symbolic`, `window-maximize-symbolic`,
`window-restore-symbolic` when maximised, `window-minimize-symbolic`,
`open-menu-symbolic`), loaded with
`gtk_icon_info_load_symbolic_for_context (info, button_style)` — i.e. tinted
with the button's CSS `color` (and the named warning/error/success colours) —
and painted with `gtk_render_icon_surface` using the **button** context.
`-gtk-icon-source` is never consulted, and the `image` node is used for
geometry only. A `background-image` on the button is drawn underneath, so a
theme that supplies its own glyphs that way must set `color: transparent` to
avoid a double draw. (The changelog shows a short-lived switch to XApp icon
names that was reverted: "theme.c: Revert symbolic name changes for window
controls".)

Shape/mask — `meta_ui_frame_get_mask()` in `src/ui/frames.c` (called from
`build_and_scan_frame_mask()` in `src/compositor/meta-window-actor-x11.c`):
the visible shape of the frame is whatever `gtk_render_background` of
`decoration` and `headerbar` paints. Borders are not rendered into the mask,
so **a frame border only shows if the decoration's background is opaque
beneath it**. Drop shadows are added by the compositor, not by CSS.

HiDPI: the contexts get `gtk_style_context_set_scale()` and the cairo surface
a matching device scale, so CSS px are logical pixels and `-gtk-scaled()`
picks the 2x image. A plain `url()` bitmap is upscaled with filtering.

Utility/menu-type windows: `title_scale` is `PANGO_SCALE_SMALL`; all borders
read from CSS are multiplied by it and truncated to integers
(`scale_border()`), so a 2px CSS border reserves only 1px of geometry.

## What Pixelcart does with this (gtk-3.0/gtk.css, section 16)

- `.ssd decoration`: `border: 2px solid` silver (slate on `:backdrop`), opaque
  navy background, `box-shadow: none`, `margin: 0`.
  `.ssd.maximized decoration`: `border-width: 0`.
  Tiled windows keep the 2px frame: Muffin exposes only a generic `tiled`
  class, so the touching edge cannot be singled out.
- `.ssd headerbar.titlebar`: black, 2px silver top/left/right border, no bottom
  border, 2px blue rule as a zero-blur inset shadow; `:backdrop` navy with
  slate border and slate rule. Height 32px (2 frame + 2 gap + 24 + 2 gap + 2
  rule); 30px when maximised.
- Title: bold, white; lavender on `:backdrop` (existing `headerbar .title` rules).
- Buttons: 24px squares, transparent until hovered; hover plum + silver
  border; pressed blue with black glyph; close hover/pressed red with **black**
  glyph. Glyphs are Pixelcart's own pixel art as `background-image`
  (`-gtk-scaled`, 1x and 2x), with `color: transparent` hiding the icon-theme
  symbol. The optional menu button is matched with
  `button.titlebutton:not(.close):not(.maximize):not(.minimize)`.
- CSD-only rules (`decoration { margin; box-shadow }`, `.csd …`,
  `.solid-csd …`) are overridden for `.ssd` by later/more specific rules;
  the `.ssd` rules cannot match CSD windows.

## Verification performed, and its limits

A test-only C port of `meta_theme_create_style_info`,
`meta_frame_layout_sync_with_style`, `meta_frame_layout_get_borders`, the
right/left button placement, `meta_frame_layout_draw_with_style` and
`meta_ui_frame_get_mask` was linked against the installed GTK 3.24.41 and run
under Xvfb with the theme loaded via `gtk_css_provider_get_named`. It renders
focused, backdrop, hover/pressed, maximised, tiled, shaded, attached, utility
and border-only frames at scale 1 and 2:
`previews/gtk3-ssd.png`, `previews/gtk3-ssd-2x.png`.

Not verified: behaviour inside a real Muffin process (compositor shadow,
actual mask application, Wayland session, a user `titlebar-font` override,
RTL), Cinnamon releases other than master at the source level, and icon
themes whose window icons are not symbolic (those would be drawn in full
colour on top of the pixel glyph).
