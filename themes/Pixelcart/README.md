# Pixelcart

Pixelcart is a dark theme for the Cinnamon desktop with an 8-bit, fantasy-console look. Every colour comes from a fixed 16-colour palette, corners are square, borders are 2px solid, and depth is drawn with hard offset shadows instead of blur or gradients.

## What is included

| Component | Path | What it themes |
|-----------|------|----------------|
| Cinnamon | `cinnamon/cinnamon.css`, `cinnamon/assets/` | Panel, applets, menu, notifications, dialogs, window switcher and the other desktop shell elements |
| GTK 3 | `gtk-3.0/gtk.css`, `gtk-3.0/assets/` | GTK 3 applications (Nemo, Xed, System Settings and most of the Mint desktop). On Cinnamon 5.4 and later it also draws the title bars and borders of windows |
| GTK 4 | `gtk-4.0/gtk.css`, `gtk-4.0/assets/` | GTK 4 applications that follow the desktop theme |
| GTK 2 | `gtk-2.0/gtkrc` | Legacy GTK 2 applications: matching colours drawn with GTK 2's built-in renderer, so they get classic bevels rather than the full pixel look. No theme engine is required |
| Metacity | `metacity-1/metacity-theme-3.xml` | Title bars and window borders on Cinnamon 5.2 and older, and in other window managers that read Metacity themes. Not used by Cinnamon 5.4 and later |
| Theme index | `index.theme` | Theme name and metadata |

All image assets are SVG pixel art drawn on an integer grid. The theme contains no fonts, icons, mouse pointers, wallpapers or scripts.

## Palette

| Colour | Hex | Role |
|--------|-----|------|
| Black | `#000000` | Panel, title bars, tooltips, text views, entries and troughs; text on red, orange, yellow, green and blue |
| Navy | `#1D2B53` | Window, dialog and menu backgrounds; buttons; unfocused title bars |
| Plum | `#7E2553` | Hover on buttons, tabs, list rows and panel applets |
| Forest | `#008751` | Progress fill in unfocused windows |
| Brown | `#AB5236` | Reserved; not currently used |
| Slate | `#5F574F` | Standard borders and separators |
| Silver | `#C2C3C7` | Strong borders, secondary text, slider and scrollbar handles |
| White | `#FFF1E8` | Primary text |
| Red | `#FF004D` | Destructive actions, errors and urgent items. Text on red is black, which gives better contrast than white |
| Orange | `#FFA300` | Warnings |
| Yellow | `#FFEC27` | Keyboard focus indicator |
| Green | `#00E436` | Suggested actions, success and progress fill |
| Blue | `#29ADFF` | Selected, active and checked items; the highlighted menu item; links |
| Lavender | `#83769C` | Disabled text; unfocused window titles |
| Pink | `#FF77A8` | Visited links; error text; hover on destructive buttons in the desktop shell |
| Peach | `#FFCCAA` | Weekend days and day names in calendars |

## Installation

### From System Settings

1. Open **System Settings → Themes**. If the page opens in the simplified view, click **Advanced settings...** to show the full page.
2. Open the **Add/Remove** tab, find **Pixelcart** and install it.
3. Go back to the **Themes** tab and select **Pixelcart** for both **Applications** and **Desktop**.

On Cinnamon 5.2 and older, the Applications option is named **Controls**, and there is an additional **Window borders** option. Select **Pixelcart** there as well.

### Manual installation

Download the theme from the [Cinnamon Spices website](https://cinnamon-spices.linuxmint.com/themes), extract the archive and place the `Pixelcart` folder in `~/.themes`, so that the theme ends up at `~/.themes/Pixelcart`. Then select it in **System Settings → Themes** as described above.

## Compatibility

- Written against the default-theme sources of Cinnamon 6.0, 6.4 and 6.6, and against GTK 3.24. The GTK 3 and GTK 4 stylesheets have been checked with the real GTK 3 and GTK 4 parsers. Older Cinnamon versions are supported on a best-effort basis.
- On Cinnamon 5.4 and later, the title bars and borders of windows are drawn from the GTK 3 theme, so there is no separate window border setting. The title-bar buttons need SVG image support (librsvg) and an icon theme that provides symbolic window icons. Both are standard on Linux Mint.
- HiDPI: the GTK 3 and GTK 4 image assets include 2x versions. The desktop shell assets are vector images that Cinnamon scales.
- GTK 4 applications built with libadwaita use their own styling and do not follow GTK themes. They are not affected by Pixelcart.
- No font is bundled. The theme does not set a font family and uses the fonts chosen in **System Settings → Font Selection**.
- Panels are styled for all four screen edges.

## Known limitations

- This is a dark theme only. There is no light variant, and applications that ask for a dark variant get the same style.
- Pixelcart does not include an icon theme or a mouse pointer theme. Icons and pointers are left at your current settings.
- The palette is strictly limited to 16 colours, so some states that other themes express with subtle tints are shown with a border or a solid colour change instead.
- Sliders in the desktop shell (for example the volume slider) keep small rounded end caps. Cinnamon draws them itself and a theme cannot change their shape.
- Tiled windows keep their 2px frame on every side, including the edges that touch the screen edge or another window. Cinnamon does not tell the theme which side a window is tiled to.
- Utility windows (small tool windows) have a thinner, 1px frame.
- GTK 2 applications get the Pixelcart colours but not the pixel-art controls.
- Applications that draw their own interface (for example Qt, Electron and libadwaita applications, and Flatpak applications without access to your themes) may ignore the theme partly or entirely.

## Reporting issues

Please report problems on the [cinnamon-spices-themes issue tracker](https://github.com/linuxmint/cinnamon-spices-themes/issues). Start the title with the theme name so that the report reaches the right person, for example:

`Pixelcart: short description of the problem`

Include your Cinnamon version, the affected application and, where possible, a screenshot.

## Changelog

- 1.0: initial release

## Licence

Pixelcart is free software, released under the GNU General Public License, version 3 or (at your option) any later version. See the `LICENSE` file for the full text.

## Credits

The colours are the 16-colour palette popularised by the PICO-8 fantasy console by Lexaloffle Games, used here as a colour reference. This theme is not affiliated with or endorsed by Lexaloffle Games.
