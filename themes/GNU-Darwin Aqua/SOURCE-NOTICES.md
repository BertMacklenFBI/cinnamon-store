# Source notices

The rendered desktop source is the reviewed GNU-Darwin Aqua Snow Leopard edition from Desktop Theme Studio, exported on 30 September 2026. CSS, SVG, XML and JavaScript remain editable source; no source obfuscation or minification is used.

- Mint-Y-derived GTK/Cinnamon/Metacity styling retains the original `COPYRIGHT`; see also the theme tree's original `SOURCE.md`.
- Aqua controls: B00merang-Project/OS-X-Leopard at `cf4db83440d45e02bb849e54003664b931386acd`, https://github.com/B00merang-Project/OS-X-Leopard . The pinned source record and license are in `provenance/`.
- Period icons and menu mark: B00merang-Artwork/Mac-OS-X-Lion at `42c0ade506b5f2a0aff90d23a38543ffa1614a58`, https://github.com/B00merang-Artwork/Mac-OS-X-Lion . These are reproductions, not authenticated Apple-original resources; no upstream license file was found.
- Modern app icons: Papirus, https://github.com/PapirusDevelopmentTeam/papirus-icon-theme . Original SVGs and `PAPIRUS-COPYRIGHT` are retained.
- Wallpaper archive: https://media.512pixels.net/downloads/macos-wallpapers-6k/10-6-6k.jpg . The image was only resampled proportionally to 2880×1800; no color editing or branding overlay.
- Visual reference: https://512pixels.net/projects/aqua-screenshot-library/mac-os-x-10-6-snow-leopard/ . Reference screenshots themselves are not bundled as theme assets.
- The optional external cursor is Bibata Modern Classic, https://github.com/ful1e5/Bibata_Cursor . The reference font source/hashes are described in `provenance/external-fonts.json`; font software is excluded.

The dock runtime is locally authored around Cinnamon's standard Grouped window list. It copies the real icon actor into a clipped reflection, retaining the original button and handlers. Its shader compensates for Cinnamon 6.6 GLSLEffect's straight-alpha blend: https://github.com/linuxmint/cinnamon/blob/6.6.9/src/cinnamon-glsl-effect.c .

Package-only changes: five non-rendered Inkscape export-path attributes were removed, and `CursorTheme` was removed from index.theme because the cursor is an external dependency. Artwork, icon pixels, dock code and rendered theme rules are otherwise preserved. `provenance/package-transforms.json` lists those changes; private runtime validation uses this exported payload. Original source notices may describe the earlier local staging context; this file and LICENSING.md describe the public submission scope.
