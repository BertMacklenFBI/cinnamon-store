# How Cinnamon loads a shell theme relative to its default stylesheet

Source read: linuxmint/Cinnamon master at a5ed84df (2026-09-29); the same code is present in
the 6.0.5, 6.4.14 and 6.6.9 tags. No live Cinnamon session was available; everything below is
from reading the source.

## Short answer

The default stylesheet is **not** cascaded underneath a user theme. A user theme **replaces** it.
The default is kept only as a per-widget fallback: it is consulted for a widget when both of
these hold:

1. the widget, or any ancestor, was created with `important: true`, and
2. the user theme matches **zero** declarations for that widget.

When the fallback fires, the widget gets the default theme's complete rule set for that node
(including its rounded corners, blurred shadows and transitions). When the user theme matches
even one declaration, nothing from the default reaches that widget.

## Evidence

| Step | File and line | What it does |
|------|---------------|--------------|
| Default path | `js/ui/main.js:393` | `_defaultCssStylesheet = global.datadir + '/theme/cinnamon.css'` |
| Theme lookup | `js/ui/themeManager.js:63-75` | reads `org.cinnamon.theme name`, finds `<themes dir>/<name>/cinnamon/cinnamon.css`, calls `Main.setThemeStylesheet()` and `Main.loadTheme()` |
| Theme object | `js/ui/main.js:944-959` | `new St.Theme({ fallback_stylesheet: _defaultCssStylesheet })`, then `theme.load_stylesheet(_cssStylesheet)`. Only if that load fails is the default loaded as the main stylesheet |
| Two separate lists | `src/st/st-theme.c:210-226`, `:285-286` | `st_theme_load_stylesheet()` adds the file to `custom_stylesheets`; the fallback is parsed into `fallback_cr_stylesheet` and is never added to that list |
| Normal matching | `src/st/st-theme.c:889-909` | `_st_theme_get_matched_properties()` walks `custom_stylesheets` only |
| Fallback matching | `src/st/st-theme.c:911-928` | `_st_theme_get_matched_properties_fallback()` walks the fallback sheet only |
| The switch | `src/st/st-theme-node.c:468-475` | fallback is used only `if (properties->len == 0 && node->important)` |
| Inheritance | `src/st/st-theme-node.c:255` | `node->important = parent important OR own important` |
| Documented intent | `src/st/st-widget.c:1442-1452` | "When an actor is set to important, and the active theme does not account for it, a fallback lookup is made to the default cinnamon theme ... This property is inherited by the actor's children." |

Widgets created with `important: true` include the panel zones (`js/ui/panel.js:1586-1588`, so
every applet on a panel inherits it), popup menus (`js/ui/popupMenu.js:1700`), dialogs
(`js/ui/dialog.js`), OSDs, the lock screen and the on-screen keyboard.

## Consequences for Pixelcart

- Reset declarations (`transition-duration: 0`, `text-shadow: none`, and so on) are not needed to
  stop the default leaking through, and none were added for that purpose. The `border-radius: 0`
  and `background-gradient-direction: none` lines already in the file are harmless.
- What does matter is that every node the default theme styles is also matched by at least one
  Pixelcart rule. Otherwise an "important" widget would show up in the default look.
- This was checked mechanically. The default theme's Sass (`data/theme/cinnamon-sass`) was
  compiled to CSS with `sassc`, and every selector in the result was tested against
  Pixelcart's selectors: a default selector counts as covered when some Pixelcart selector has a
  subject compound that is a subset of it and ancestor compounds that match in order, so any
  node the default selector matches is also matched by Pixelcart.

  | Default theme | Selectors | Not covered |
  |---------------|-----------|-------------|
  | master (a5ed84df) | 596 | 1 |
  | 6.6.9 | 527 | 1 |
  | 6.4.14 | 443 | 1 |

  The one remaining selector is `.notification {}`, an empty rule in the default theme, so its
  fallback would contribute nothing.
- 6.0.5 ships a hand-written default stylesheet. 35 of its 432 selectors have no Pixelcart
  counterpart; they are for widgets that release no longer creates or that are covered through
  another class on the same widget (for example `.run-dialog`, which is also `.dialog`). This
  was judged by reading, not proven by the script.

## Related St facts confirmed in the same pass

- Specificity is (ids, classes + pseudo-classes, type names); ties go to the later rule
  (`src/st/st-theme.c:869-887`, `src/st/croco/cr-simple-sel.c`).
- Lengths accept px, pt, in, cm, mm, pc, em and ex (`src/st/st-theme-node.c:925-955`).
- `box-shadow` accepts `inset` and a zero blur (`src/st/st-theme-node.c:3213-3296`). An inset
  shadow is painted only when the node also has a border or a non-transparent background
  (`src/st/st-theme-node-drawing.c:1466`).
- `background-gradient-direction: none` is a recognised value (`src/st/st-theme-node.c:2114`).
- `:hover`, `:focus`, `:active`, `:checked`, `:insensitive`, `:first-child`, `:last-child`, `:ltr`
  and `:rtl` are set by St itself; `:only-child` is never set by anything.
- Sliders and level bars are drawn by Cinnamon's JavaScript with hard-coded semicircular end
  caps (`js/ui/slider.js:55`, `js/ui/barLevel.js:113`); a theme cannot square them off.
