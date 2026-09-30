# GNU-Darwin Aqua — desktop theme sources

* Base: packaged Mint-Y-Dark snapshot (mint-themes, GPL-3+; see COPYRIGHT) kept pristine in `../base/`.
* Recolouring: every Mint-Y hex/rgba role-mapped to `design.json` palette tokens by `../build.py`, adapted by the Desktop Theme Studio agent team on 2026-09-29.
* GTK3/GTK4: Mint fallback state assets plus pinned B00merang Aqua raster controls; GTK2 uses native Murrine rules.
* Window controls: source-backed 13px glossy bright discs with dark hover glyphs in GTK3, GTK4 and Metacity.
* Cinnamon shell, lock-screen (.csstage), window-frame and material (smooth unified gray) styling authored for this preset.
* Thumbnails: regenerated from palette (PIL).
* Icons (`GNU-Darwin Aqua icons`) and cursors (`GNU-Darwin Aqua cursors`) are built by build_assets.py.
* Exact period target and source deviations are recorded in build-report.json; no texture or pinstripes.
* Extra control source: B00merang OS-X-Leopard, see ../vendor/OS-X-Leopard/LICENSE.md and STUDIO-SOURCE.json.
