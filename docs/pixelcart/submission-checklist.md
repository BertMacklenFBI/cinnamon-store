# Pixelcart: submission checklist

For the theme owner. This file is not part of the theme and must not be copied into the
Spices repository. Work through the steps in order.

The theme has not been run on a live Cinnamon session. Steps 2 to 4 are therefore
required, not optional.

## 1. Set the author

Done: `Pixelcart/info.json` lists `BertMacklenFBI` as the author. The pull request must be
opened from that account: reviewers use this field to decide who may change the theme later.

## 2. Install locally

    mkdir -p ~/.themes
    cp -r Pixelcart/files/Pixelcart ~/.themes/Pixelcart

Open **System Settings → Themes**. If the page opens in the simplified view, click
**Advanced settings...**. Select **Pixelcart** for **Applications** and for **Desktop**.
(On Cinnamon 5.2 and older the options are **Controls**, **Desktop** and
**Window borders**.) After editing a theme file, restart Cinnamon with Ctrl+Alt+Esc or
re-select the theme to reload it.

## 3. Manual test matrix

Run on a real Linux Mint / Cinnamon 6.x session. Note the Cinnamon version you tested
(`cinnamon --version`). For each item, check: text is readable, nothing falls back to
the default theme's look (rounded corners, gradients, blurred shadows), hover / pressed /
focused / disabled states are visible.

Desktop shell (`cinnamon/cinnamon.css`):

- [ ] Panel on the bottom edge
- [ ] Panel on the top edge
- [ ] Panel on the left edge
- [ ] Panel on the right edge
- [ ] On each edge: Window list applet. The focused window has a navy cell and a blue
      bar on the screen edge; hover; a window demanding attention; progress strip
- [ ] On each edge: Grouped window list applet. Indicators, focused / hover states,
      thumbnail previews, context menu
- [ ] Menu applet: search entry, category and application highlight, sidebar,
      lock / log out / shut down buttons, context menu on an application
- [ ] Calendar applet: today, selected day, weekend days, month navigation arrows
- [ ] Sound applet: volume slider (small rounded end caps are expected), media player
      controls, output device submenu
- [ ] Other panel menus: network, power, notifications applet, system tray, workspace
      switcher, panel context menu and panel edit mode
- [ ] Notifications: plain, with an image, with action buttons, critical
- [ ] Alt-Tab switcher (icons, and thumbnails if enabled)
- [ ] Expo (Ctrl+Alt+Up) and Scale (Ctrl+Alt+Down), including the add-workspace button
      and window close buttons
- [ ] OSDs: volume, brightness, workspace name; window tiling / snap preview
- [ ] Lock screen: password entry, caps-lock warning, wrong-password message
- [ ] On-screen keyboard
- [ ] End-session dialog (log out / shut down), Run dialog (Alt+F2), a password
      (polkit) prompt
- [ ] Tooltips on panel applets; desklets if you use any
- [ ] **System Settings → Themes**: the chooser buttons and their drop-down lists show
      the Pixelcart thumbnails for **Applications** and **Desktop** (and for
      **Window borders** on Cinnamon 5.2 and older), not the generic placeholder

Applications:

- [ ] Nemo: sidebar, path bar, icon and list views, selection, rename entry, context
      menus, properties dialog
- [ ] A GTK 3 application with client-side decorations (header bar), e.g. System
      Settings pages that use one, or GNOME Calculator: focused and unfocused
- [ ] A GTK 3 application with a server-side title bar (e.g. Xed, Terminal):
  - [ ] focused: black title bar, silver 2px frame, blue rule, pixel glyphs
  - [ ] unfocused: navy title bar, slate frame, lavender title
  - [ ] title buttons: hover (plum), pressed (blue), close hover (red, black glyph);
        each button shows one glyph only (no icon-theme symbol drawn on top)
  - [ ] maximized: no frame lines, restore glyph
  - [ ] tiled left / right / quarter: 2px frame stays on all sides (known limitation)
  - [ ] a dialog and a utility window
- [ ] GTK 3 widgets in general (`gtk3-widget-factory` if installed): buttons, entries,
      check / radio, switches, scales, progress and level bars, tabs, info bars, menus,
      popovers, file chooser
- [ ] A GTK 4 application that is not libadwaita-based (`gtk4-demo` or
      `gtk4-widget-factory` from the `gtk-4-examples` package)
- [ ] A GTK 2 application if any is installed: readable colours, classic bevels expected
- [ ] HiDPI: set **Display → User interface scale** to 200% and repeat a short pass over
      the title bar, check boxes, radio buttons and the panel
- [ ] Optional: a different icon theme, to confirm the title-button glyphs still show

Fix anything you find in `~/.themes/Pixelcart`, copy the fix back into
`Pixelcart/files/Pixelcart`, and correct the README if a statement in it turns out to
be wrong.

## 4. Replace screenshot.png with a real capture

**The current `Pixelcart/screenshot.png` is a rendered HTML mock, not a screenshot.** Its
icons and background are placeholders that the theme does not provide. The repository
describes `screenshot.png` as "a screenshot of the spice in action", so a real capture is
required before submitting.

- Capture the whole desktop with the theme applied: the panel, the open menu and one or
  two application windows (one focused) show the theme well.
- Save it as PNG, named exactly `screenshot.png`, in the `Pixelcart/` root.
- The repository does not enforce a size, and existing themes vary. 1920x1080 is a
  common size there and works well.
- The icon theme and wallpaper visible in the capture are your own; Pixelcart does not
  ship either.
- Afterwards, delete nothing else: `icon.png` (256x256, palette colours only) stays.

While you have the real session open, consider replacing the three theme-chooser
thumbnails as well. The Themes settings page looks them up by path, so keep the names
and sizes:

| File | Size | How the current one was made |
|------|------|------------------------------|
| `files/Pixelcart/gtk-3.0/thumbnail.png` | 120x36 | Real GTK 3.24 render of the theme at that exact size (a button, a checked check box and a selected radio button), font antialiasing switched off so that the pixels stay on the palette |
| `files/Pixelcart/metacity-1/thumbnail.png` | 100x32 | Native-size crop of the focused title bar from the test port of Muffin's frame drawing, rendered with GTK 3.24 and the theme. Only read by Cinnamon 5.2 and older |
| `files/Pixelcart/cinnamon/thumbnail.png` | 240x90 | **Drawn, not captured.** No shell could be run in the sandbox, so the panel, window-list item and menu fragment were drawn from the values in `cinnamon.css`, with plain bars in place of text and icons |

Suggested replacement: crop each one from a real capture at native size (no scaling),
for example a button and a check box from a GTK 3 application, the right end of a focused
title bar, and the panel corner with the menu open. Save as PNG under the same names.
The shell thumbnail is the one most worth replacing.

## 5. Open the pull request

1. Fork <https://github.com/linuxmint/cinnamon-spices-themes> on GitHub and clone your
   fork.
2. Create and check out a branch (do not work on `master`):

       git checkout -b pixelcart

3. Copy (do not move) the whole `Pixelcart` directory into the root of the clone, so
   that `cinnamon-spices-themes/Pixelcart/info.json` exists. Do not copy
   `SUBMISSION-CHECKLIST.md`, `SPEC.md`, `notes/`, `preview-src/` or `previews/`.
4. Validate:

       ./validate-spice Pixelcart

   Expected output: `No errors found. Everything looks good.`
5. Commit and push:

       git add Pixelcart/
       git commit -m "Pixelcart: Initial creation"
       git push origin pixelcart

6. Open a pull request against `linuxmint/cinnamon-spices-themes` `master`. One theme
   per pull request. Say in the description which Cinnamon version you tested on.

## Verification status at hand-over

What was checked in the build sandbox, and how. Nothing below was observed on a running
Cinnamon desktop.

| Component | Verified | Not verified |
|-----------|----------|--------------|
| Packaging (`info.json`, layout, README) | `validate-spice Pixelcart` passes; JSON parses; every `url()` in the CSS resolves to a shipped file; all SVG and the Metacity XML are well-formed; every shipped text file except `README.md` and `LICENSE` is pure ASCII; no archives, scripts, fonts, hidden or empty files | Author field (placeholder); real screenshot |
| Theme-chooser thumbnails | Sizes match the convention used by existing themes (120x36, 240x90, 100x32); palette colours only; the lookup path was read in `cs_themes.py` | How they look in the Themes settings page, which scales them to 125px wide; the shell thumbnail is a drawing (see step 4) |
| Cinnamon shell (`cinnamon/`) | Selector coverage compared mechanically against the default theme of Cinnamon 6.4.14, 6.6.9 and master (every default selector is covered except one empty rule); 6.0.5 compared by reading (35 of 432 selectors without a direct counterpart, judged to be obsolete or covered through another class). Property support checked against the St source. The SVG assets were rendered on their own (`previews/shell-assets.png`) | Any rendering by Cinnamon itself: panels, applets, menus, dialogs, lock screen, on-screen keyboard. Cinnamon 5.x |
| GTK 3 (`gtk-3.0/`) | `gtk.css` and `gtk-dark.css` load in the real GTK 3 parser with no errors or warnings. Rendered with the real toolkit (GTK 3.24.41, under Xvfb): widgets, menus, dialogs, unfocused state (`previews/gtk3-*.png`) | Real Mint applications (Nemo, Xed, System Settings); RTL |
| Window title bars on Cinnamon 5.4+ (GTK 3 theme, section 16) | Muffin's frame code was read (master) and a test-only port of its style and drawing routines was run against GTK 3.24.41 with the theme: focused, unfocused, hover / pressed, maximized, tiled, shaded, dialog, utility, at 1x and 2x (`previews/gtk3-ssd.png`, `gtk3-ssd-2x.png`). The title colour resolves to white when focused and lavender when unfocused | Behaviour inside a real Muffin process (compositor shadow, frame mask, Wayland session, a custom title-bar font, RTL); Muffin releases other than master; icon themes whose window icons are not symbolic (they would be drawn on top of the pixel glyph) |
| GTK 4 (`gtk-4.0/`) | `gtk.css` and `gtk-dark.css` load in the real GTK 4 parser with no errors or warnings. Rendered with the real toolkit (`previews/gtk4-*.png`) | Real applications; libadwaita applications are out of scope by design |
| GTK 2 (`gtk-2.0/gtkrc`) | Read for facts only (no theme engine, no images) | No render exists in `previews/`; not loaded by a GTK 2 application |
| Metacity (`metacity-1/`) | XML is well-formed; design checked with a mock render (`previews/metacity-mock.png`) | Not loaded by a real window manager (Cinnamon 5.2 or older, Metacity, Marco) |
| HiDPI | GTK 3 has a 2x file for every 1x image asset except the four symbolic arrows, which are vector icons scaled by GTK (49 pairs + 4 arrows = 102 files); GTK 4 has a 2x file for every 1x image asset (58 pairs = 116 files); title bars rendered at scale 2 | Shell and GTK 4 at 2x |

Details: `notes/window-decorations.md`, `notes/shell-theme-loading.md`,
`preview-src/NOTES.md`.

## Final inventory

The `Pixelcart/` directory holds 254 files, about 0.8 MB in total.

| Location | Files |
|----------|-------|
| `Pixelcart/` (root) | 5: `info.json`, `README.md`, `LICENSE`, `icon.png`, `screenshot.png` |
| `files/Pixelcart/` | 1: `index.theme` |
| `files/Pixelcart/cinnamon/` | 22: `cinnamon.css`, `thumbnail.png`, 20 SVG assets |
| `files/Pixelcart/gtk-2.0/` | 1: `gtkrc` |
| `files/Pixelcart/gtk-3.0/` | 105: `gtk.css`, `gtk-dark.css`, `thumbnail.png`, 102 SVG assets |
| `files/Pixelcart/gtk-4.0/` | 118: `gtk.css`, `gtk-dark.css`, 116 SVG assets |
| `files/Pixelcart/metacity-1/` | 2: `metacity-theme-3.xml`, `thumbnail.png` |

By type: 238 SVG, 5 CSS, 5 PNG, and one each of JSON, Markdown, licence text, `gtkrc`,
`index.theme` and XML. There are no archives, scripts, fonts, hidden files, backup
files, symbolic links, empty directories or executable files.
