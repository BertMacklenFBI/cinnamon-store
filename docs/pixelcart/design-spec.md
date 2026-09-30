# Pixelcart design spec

Pixelcart is a dark 8-bit / fantasy-console theme for the Cinnamon desktop (Linux Mint),
to be submitted to https://github.com/linuxmint/cinnamon-spices-themes and shown publicly.
Quality bar: professional, complete, consistent. No placeholder or TODO content.

UUID / theme name: `Pixelcart`   (exact spelling, used for every directory and Name= field)
License: GPL-3.0-or-later. All work must be ORIGINAL (written for this theme). You may read
reference themes to learn which selectors exist, but do not copy their rule bodies or assets.

## Directory layout (in this repository: `themes/Pixelcart`)

    Pixelcart/info.json, README.md, LICENSE, screenshot.png, icon.png
    Pixelcart/files/Pixelcart/index.theme
    Pixelcart/files/Pixelcart/cinnamon/cinnamon.css + cinnamon/assets/
    Pixelcart/files/Pixelcart/gtk-3.0/gtk.css + gtk-3.0/assets/
    Pixelcart/files/Pixelcart/gtk-4.0/gtk.css + gtk-4.0/assets/
    Pixelcart/files/Pixelcart/gtk-2.0/gtkrc
    Pixelcart/files/Pixelcart/metacity-1/metacity-theme-3.xml

Nothing else may go inside files/ .
Repo rules: no archives, no scripts, no fonts, no binaries except image files (png/svg).
No gnome-shell/xfce/unity dirs. No external URLs or @import of remote resources.

## Palette — the 16 fantasy-console colours. USE ONLY THESE HEX VALUES.

    black        #000000      red      #FF004D
    navy         #1D2B53      orange   #FFA300
    plum         #7E2553      yellow   #FFEC27
    forest       #008751      green    #00E436
    brown        #AB5236      blue     #29ADFF
    slate        #5F574F      lavender #83769C
    silver       #C2C3C7      pink     #FF77A8
    white        #FFF1E8      peach    #FFCCAA

The only permitted non-palette values: `transparent`, and rgba(0,0,0,a) for modal scrims /
drag shadows. No gradients, no other tints, no opacity-blended palette colours on widgets.

## Semantic roles

| Role                                   | Value                         |
|----------------------------------------|-------------------------------|
| Window / dialog / menu background      | navy #1D2B53                  |
| Panel, headerbar/titlebar, tooltip bg  | black #000000                 |
| View / entry / text-area background    | black #000000                 |
| Primary text                           | white #FFF1E8                 |
| Secondary text, inactive labels        | silver #C2C3C7                |
| Disabled text                          | lavender #83769C              |
| Standard border                        | slate #5F574F (2px solid)     |
| Strong border (buttons, entries, menus, popups, focused window) | silver #C2C3C7 (2px solid) |
| Hover background                       | plum #7E2553, text white      |
| Selected / active / checked background | blue #29ADFF, text black      |
| Keyboard focus indicator               | yellow #FFEC27 (2px outline/border) |
| Suggested / default action button      | green #00E436 bg, text black  |
| Destructive action, error, urgent      | red #FF004D bg, text BLACK #000000 (5.36:1; white on red is only 3.55:1 and is NOT allowed) |
| Warning                                | orange #FFA300, text black    |
| Success / progress fill                | green #00E436                 |
| Links                                  | blue #29ADFF; visited pink #FF77A8 |
| Trough (scale, progress, scrollbar)    | black #000000 with slate border |
| Slider / scrollbar handle              | silver #C2C3C7; hover white; active blue |
| Inactive (backdrop) window titlebar    | navy bg, lavender text, slate border |

Contrast: every text/background pair must be >= 4.5:1 (disabled text exempt, but >= 3:1).
Never put white text on red, blue, green, orange, yellow, silver, peach or pink — use black.

## Shape language

- border-radius: 0 everywhere. Square corners on everything, including windows and menus.
- Borders are 2px solid. No 1px hairlines except separators (slate, 2px preferred).
- "Chunky bevel" depth: hard offset shadows with ZERO blur only, e.g. `box-shadow: 2px 2px 0 0 #000000`
  (or inset equivalents). Pressed state: remove the shadow / shift to inset. Never use blur radius
  or text-shadow (the Spices README flags them as slow).
- No transitions longer than 0ms on colour (8-bit = instant state changes). Omit transitions.
- Do not set font-family anywhere (we cannot ship fonts; respect the user's font). font-weight bold
  is fine for titles, default buttons and the panel clock.
- Spacing on a 2px grid (2, 4, 6, 8, 12, 16 px). Em units are fine for Cinnamon panel sizing.
- Image assets: SVG, drawn as pixel art on an integer grid using <rect> elements only,
  with `shape-rendering="crispEdges"` on the root <svg>, palette colours only, no embedded
  rasters, no <script>, no external refs, no editor metadata. File names lowercase-kebab-case.
  Checkbox/radio art is 16x16 (radio = pixel-stepped octagon, not a smooth circle).

## Deliverable standards

- Each CSS file starts with a header comment: theme name, component, "Part of the Pixelcart theme",
  SPDX-License-Identifier: GPL-3.0-or-later. Then a palette legend comment.
- CSS organised into clearly commented sections. Consistent 2-space indent. Lowercase hex? NO —
  use UPPERCASE hex exactly as in the palette table so it can be grep-verified.
- Every url() must point to a file that exists, by relative path.

## Addendum (round 2 decisions — these override anything above)

- Text on red is always black. No white-on-red anywhere (buttons, info bars, urgent items, close buttons).
- Menu items (shell popup menus AND GTK menus/popovers/model buttons/combo lists): the highlighted
  item (pointer hover or keyboard) is blue #29ADFF with black text. Plum hover is for buttons,
  tabs, list rows, panel applets and other non-menu controls.
- Buttons: navy background, 2px silver border, 2px black hard drop shadow; hover plum; pressed/checked blue + black text.
- Resetting inherited defaults is allowed: `transition-duration: 0`, `text-shadow: none` style resets
  ARE permitted where needed to neutralise a lower stylesheet. What is forbidden is introducing the effects.
