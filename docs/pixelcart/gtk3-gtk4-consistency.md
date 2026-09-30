# GTK 3 / GTK 4 consistency table

Pixelcart theme, `gtk-3.0/gtk.css` against `gtk-4.0/gtk.css`.

How this table is produced: a small static cascade resolver (test tooling, not shipped) parses each stylesheet, resolves every `@define-color` name to its palette colour, matches all rules against a described widget node path (node names, classes and states as the toolkit creates them), applies specificity and source order, and reports the winning value of each key property. Colours are printed by palette name. A property is listed only when at least one toolkit sets it to something other than the default. The resolver models descendant and child combinators, classes, states and `:not()`; it does not model sibling combinators, and it is not a substitute for rendering - the rendered previews in `previews/` were checked separately.

Result column: `=` identical; `toolkit` = intentional, explained toolkit difference (see the numbered notes at the end); `GTK 3 only` = no GTK 4 counterpart (server-side decorations drawn by Muffin from the GTK 3 stylesheet).

Summary: 180 widget states, 1025 property rows: 862 identical, 75 explained toolkit differences, 88 GTK 3 only, **0 unexplained differences**.

| Widget / state | Property | GTK 3 | GTK 4 | Result |
|---|---|---|---|---|
| titlebutton close | `background-image` | img:titlebutton-close (+2x) | img:titlebutton-close (+2x) | = |
|  | `color` | transparent | white | toolkit [1] |
|  | `border-color` | transparent | transparent | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| titlebutton maximize | `background-image` | img:titlebutton-maximize (+2x) | img:titlebutton-maximize (+2x) | = |
|  | `color` | transparent | white | toolkit [1] |
|  | `border-color` | transparent | transparent | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| titlebutton close:hover | `background-color` | red | red | = |
|  | `background-image` | img:titlebutton-close-active (+2x) | img:titlebutton-close-active (+2x) | = |
|  | `color` | transparent | white | toolkit [1] |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| titlebutton maximize:hover | `background-color` | plum | plum | = |
|  | `background-image` | img:titlebutton-maximize (+2x) | img:titlebutton-maximize (+2x) | = |
|  | `color` | transparent | white | toolkit [1] |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| titlebutton close:active | `background-color` | red | red | = |
|  | `background-image` | img:titlebutton-close-active (+2x) | img:titlebutton-close-active (+2x) | = |
|  | `color` | transparent | black | toolkit [1] |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| titlebutton maximize:active | `background-color` | blue | blue | = |
|  | `background-image` | img:titlebutton-maximize-active (+2x) | img:titlebutton-maximize-active (+2x) | = |
|  | `color` | transparent | black | toolkit [1] |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| titlebutton close:hover:active | `background-color` | red | red | = |
|  | `background-image` | img:titlebutton-close-active (+2x) | img:titlebutton-close-active (+2x) | = |
|  | `color` | transparent | black | toolkit [1] |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| titlebutton maximize:hover:active | `background-color` | blue | blue | = |
|  | `background-image` | img:titlebutton-maximize-active (+2x) | img:titlebutton-maximize-active (+2x) | = |
|  | `color` | transparent | black | toolkit [1] |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| titlebutton close :backdrop | `background-image` | img:titlebutton-close-backdrop (+2x) | img:titlebutton-close-backdrop (+2x) | = |
|  | `color` | transparent | lavender | toolkit [1] |
|  | `border-color` | transparent | transparent | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| titlebutton close :backdrop:hover | `background-color` | red | red | = |
|  | `background-image` | img:titlebutton-close-active (+2x) | img:titlebutton-close-active (+2x) | = |
|  | `color` | transparent | lavender | toolkit [1] |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| SSD titlebutton close (GTK 3 only) | `background-color` | transparent | - | GTK 3 only |
|  | `background-image` | img:titlebutton-close (+2x) | - | GTK 3 only |
|  | `color` | transparent | - | GTK 3 only |
|  | `border-color` | transparent | - | GTK 3 only |
|  | `border-width` | 2px | - | GTK 3 only |
|  | `min-height` | 20px | - | GTK 3 only |
|  | `min-width` | 20px | - | GTK 3 only |
|  | `padding` | 0 | - | GTK 3 only |
|  | `margin` | 0 | - | GTK 3 only |
|  | `box-shadow` | none | - | GTK 3 only |
|  | `font-weight` | normal | - | GTK 3 only |
| SSD titlebutton maximize (GTK 3 only) | `background-color` | transparent | - | GTK 3 only |
|  | `background-image` | img:titlebutton-maximize (+2x) | - | GTK 3 only |
|  | `color` | transparent | - | GTK 3 only |
|  | `border-color` | transparent | - | GTK 3 only |
|  | `border-width` | 2px | - | GTK 3 only |
|  | `min-height` | 20px | - | GTK 3 only |
|  | `min-width` | 20px | - | GTK 3 only |
|  | `padding` | 0 | - | GTK 3 only |
|  | `margin` | 0 | - | GTK 3 only |
|  | `box-shadow` | none | - | GTK 3 only |
|  | `font-weight` | normal | - | GTK 3 only |
| SSD titlebutton close:hover (GTK 3 only) | `background-color` | red | - | GTK 3 only |
|  | `background-image` | img:titlebutton-close-active (+2x) | - | GTK 3 only |
|  | `color` | transparent | - | GTK 3 only |
|  | `border-color` | silver | - | GTK 3 only |
|  | `border-width` | 2px | - | GTK 3 only |
|  | `min-height` | 20px | - | GTK 3 only |
|  | `min-width` | 20px | - | GTK 3 only |
|  | `padding` | 0 | - | GTK 3 only |
|  | `margin` | 0 | - | GTK 3 only |
|  | `box-shadow` | none | - | GTK 3 only |
|  | `font-weight` | normal | - | GTK 3 only |
| SSD titlebutton maximize:hover (GTK 3 only) | `background-color` | plum | - | GTK 3 only |
|  | `background-image` | img:titlebutton-maximize (+2x) | - | GTK 3 only |
|  | `color` | transparent | - | GTK 3 only |
|  | `border-color` | silver | - | GTK 3 only |
|  | `border-width` | 2px | - | GTK 3 only |
|  | `min-height` | 20px | - | GTK 3 only |
|  | `min-width` | 20px | - | GTK 3 only |
|  | `padding` | 0 | - | GTK 3 only |
|  | `margin` | 0 | - | GTK 3 only |
|  | `box-shadow` | none | - | GTK 3 only |
|  | `font-weight` | normal | - | GTK 3 only |
| SSD titlebutton close:active (GTK 3 only) | `background-color` | red | - | GTK 3 only |
|  | `background-image` | img:titlebutton-close-active (+2x) | - | GTK 3 only |
|  | `color` | transparent | - | GTK 3 only |
|  | `border-color` | silver | - | GTK 3 only |
|  | `border-width` | 2px | - | GTK 3 only |
|  | `min-height` | 20px | - | GTK 3 only |
|  | `min-width` | 20px | - | GTK 3 only |
|  | `padding` | 0 | - | GTK 3 only |
|  | `margin` | 0 | - | GTK 3 only |
|  | `box-shadow` | none | - | GTK 3 only |
|  | `font-weight` | normal | - | GTK 3 only |
| SSD titlebutton maximize:active (GTK 3 only) | `background-color` | blue | - | GTK 3 only |
|  | `background-image` | img:titlebutton-maximize-active (+2x) | - | GTK 3 only |
|  | `color` | transparent | - | GTK 3 only |
|  | `border-color` | silver | - | GTK 3 only |
|  | `border-width` | 2px | - | GTK 3 only |
|  | `min-height` | 20px | - | GTK 3 only |
|  | `min-width` | 20px | - | GTK 3 only |
|  | `padding` | 0 | - | GTK 3 only |
|  | `margin` | 0 | - | GTK 3 only |
|  | `box-shadow` | none | - | GTK 3 only |
|  | `font-weight` | normal | - | GTK 3 only |
| headerbar.titlebar (CSD) | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | - - blue - | - - blue - | = |
|  | `border-width` | 0 0 2px 0 | 0 0 2px 0 | = |
|  | `min-height` | 40px | 40px | = |
|  | `padding` | 0 6px | 0 6px | = |
| headerbar.titlebar :backdrop | `background-color` | navy | navy | = |
|  | `color` | lavender | lavender | = |
|  | `border-color` | - - slate - | - - slate - | = |
|  | `border-width` | 0 0 2px 0 | 0 0 2px 0 | = |
|  | `min-height` | 40px | 40px | = |
|  | `padding` | 0 6px | 0 6px | = |
| headerbar title label | `color` | white | white | = |
|  | `padding` | 0 12px | 0 12px | = |
|  | `font-weight` | bold | bold | = |
| headerbar title label :backdrop | `color` | lavender | lavender | = |
|  | `padding` | 0 12px | 0 12px | = |
|  | `font-weight` | bold | bold | = |
| headerbar button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `margin` | 4px 0 | 0 | toolkit [2] |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
| headerbar button:hover | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `border-color` | white | white | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `margin` | 4px 0 | 0 | toolkit [2] |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
| SSD headerbar (GTK 3 only) | `background-color` | black | - | GTK 3 only |
|  | `background-image` | none | - | GTK 3 only |
|  | `color` | white | - | GTK 3 only |
|  | `border-color` | silver silver - silver | - | GTK 3 only |
|  | `border-width` | 2px 2px 0 2px | - | GTK 3 only |
|  | `min-height` | 24px | - | GTK 3 only |
|  | `min-width` | 0 | - | GTK 3 only |
|  | `padding` | 0 4px 4px 4px | - | GTK 3 only |
|  | `margin` | 0 | - | GTK 3 only |
|  | `box-shadow` | inset 0 -2px 0 0 blue | - | GTK 3 only |
|  | `font-weight` | normal | - | GTK 3 only |
| SSD headerbar :backdrop (GTK 3 only) | `background-color` | navy | - | GTK 3 only |
|  | `background-image` | none | - | GTK 3 only |
|  | `color` | lavender | - | GTK 3 only |
|  | `border-color` | slate slate - slate | - | GTK 3 only |
|  | `border-width` | 2px 2px 0 2px | - | GTK 3 only |
|  | `min-height` | 24px | - | GTK 3 only |
|  | `min-width` | 0 | - | GTK 3 only |
|  | `padding` | 0 4px 4px 4px | - | GTK 3 only |
|  | `margin` | 0 | - | GTK 3 only |
|  | `box-shadow` | inset 0 -2px 0 0 slate | - | GTK 3 only |
|  | `font-weight` | normal | - | GTK 3 only |
| window (base) | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
| window :backdrop | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
| label in :backdrop window | `color` | white | white | = |
| button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
| button:hover | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `border-color` | white | white | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
| button:active | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | inset 2px 2px 0 0 black | inset 2px 2px 0 0 black | = |
| button:checked | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| button:focus | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
|  | `outline-color` | yellow | yellow | = |
|  | `outline-width` | 2px | 2px | = |
| button:disabled | `background-color` | navy | navy | = |
|  | `color` | lavender | lavender | = |
|  | `border-color` | lavender | lavender | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| button :backdrop | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| button.suggested-action | `background-color` | green | green | = |
|  | `color` | black | black | = |
|  | `border-color` | white | white | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
|  | `font-weight` | bold | bold | = |
| button.suggested-action:hover | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `border-color` | green | green | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
|  | `font-weight` | bold | bold | = |
| button.suggested-action:active | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | inset 2px 2px 0 0 black | inset 2px 2px 0 0 black | = |
|  | `font-weight` | bold | bold | = |
| button.suggested-action:disabled | `background-color` | navy | navy | = |
|  | `color` | lavender | lavender | = |
|  | `border-color` | lavender | lavender | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| button.destructive-action | `background-color` | red | red | = |
|  | `color` | black | black | = |
|  | `border-color` | white | white | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
|  | `font-weight` | bold | bold | = |
| button.destructive-action:hover | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `border-color` | red | red | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
|  | `font-weight` | bold | bold | = |
| button.destructive-action:active | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | inset 2px 2px 0 0 black | inset 2px 2px 0 0 black | = |
|  | `font-weight` | bold | bold | = |
| button.destructive-action:disabled | `background-color` | navy | navy | = |
|  | `color` | lavender | lavender | = |
|  | `border-color` | lavender | lavender | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| button.flat | `color` | white | white | = |
|  | `border-color` | transparent | transparent | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| button.flat:hover | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| entry | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| entry focused | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | yellow | yellow | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
|  | `outline-color` | yellow | transparent | toolkit [3] |
|  | `outline-width` | 2px | 0 | toolkit [3] |
| entry:disabled | `background-color` | navy | navy | = |
|  | `color` | lavender | lavender | = |
|  | `border-color` | lavender | lavender | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| entry.error | `background-color` | black | black | = |
|  | `color` | red | red | = |
|  | `border-color` | red | red | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| entry.error focused | `background-color` | black | black | = |
|  | `color` | red | red | = |
|  | `border-color` | red | red | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
|  | `box-shadow` | inset 0 0 0 2px yellow | inset 0 0 0 2px yellow | = |
|  | `outline-color` | yellow | transparent | toolkit [3] |
|  | `outline-width` | 2px | 0 | toolkit [3] |
| entry.warning | `background-color` | black | black | = |
|  | `color` | orange | orange | = |
|  | `border-color` | orange | orange | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| entry :backdrop | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| spinbutton | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
| spinbutton focused | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | yellow | yellow | = |
|  | `border-width` | 2px | 2px | = |
|  | `outline-color` | yellow | transparent | toolkit [3] |
|  | `outline-width` | 2px | 0 | toolkit [3] |
| text selection | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
| label.error | `color` | pink | pink | = |
| label.warning | `color` | orange | orange | = |
| label.success | `color` | green | green | = |
| label.dim-label | `color` | silver | silver | = |
| link label | `color` | blue | blue | = |
| link visited | `color` | pink | pink | = |
| levelbar trough | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `padding` | 2px | 2px | = |
| levelbar block.filled | `background-color` | blue | blue | = |
|  | `color` | white | white | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 32px | 32px | = |
| levelbar block.filled.high | `background-color` | blue | blue | = |
|  | `color` | white | white | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 32px | 32px | = |
| levelbar block.filled.full | `background-color` | green | green | = |
|  | `color` | white | white | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 32px | 32px | = |
| levelbar block.filled.low | `background-color` | red | red | = |
|  | `color` | white | white | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 32px | 32px | = |
| levelbar block.empty | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 32px | 32px | = |
| levelbar discrete block.filled | `background-color` | blue | blue | = |
|  | `color` | white | white | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 12px | 12px | = |
|  | `margin` | 0 2px 0 0 | 0 2px 0 0 | = |
| levelbar discrete block.empty | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 12px | 12px | = |
|  | `margin` | 0 2px 0 0 | 0 2px 0 0 | = |
| menu surface | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `padding` | 2px | 2px | = |
|  | `box-shadow` | none | 4px 4px 0 0 rgba(0, 0, 0, 0.5) | toolkit [4] |
| menu item | `color` | white | white | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 40px | 40px | = |
|  | `padding` | 6px 8px | 6px 8px | = |
| menu item:hover | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 40px | 40px | = |
|  | `padding` | 6px 8px | 6px 8px | = |
| menu item:disabled | `color` | lavender | lavender | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 40px | 40px | = |
|  | `padding` | 6px 8px | 6px 8px | = |
| popover modelbutton:hover (both) | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 40px | 40px | = |
|  | `padding` | 6px 8px | 6px 8px | = |
| popover surface | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `padding` | 6px | 6px | = |
|  | `box-shadow` | 4px 4px 0 0 rgba(0, 0, 0, 0.5) | 4px 4px 0 0 rgba(0, 0, 0, 0.5) | = |
| menubar item:hover | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `min-height` | 16px | 16px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| menubar item | `color` | white | white | = |
|  | `min-height` | 16px | 16px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| infobar.info | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `border-color` | - - black - | - - black - | = |
|  | `border-width` | 0 0 2px 0 | 0 0 2px 0 | = |
|  | `padding` | 0 | 6px 8px | toolkit [5] |
| infobar.info button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | black | black | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| infobar.question | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `border-color` | - - black - | - - black - | = |
|  | `border-width` | 0 0 2px 0 | 0 0 2px 0 | = |
|  | `padding` | 0 | 6px 8px | toolkit [5] |
| infobar.question button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | black | black | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| infobar.warning | `background-color` | orange | orange | = |
|  | `color` | black | black | = |
|  | `border-color` | - - black - | - - black - | = |
|  | `border-width` | 0 0 2px 0 | 0 0 2px 0 | = |
|  | `padding` | 0 | 6px 8px | toolkit [5] |
| infobar.warning button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | black | black | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| infobar.error | `background-color` | red | red | = |
|  | `color` | black | black | = |
|  | `border-color` | - - black - | - - black - | = |
|  | `border-width` | 0 0 2px 0 | 0 0 2px 0 | = |
|  | `padding` | 0 | 6px 8px | toolkit [5] |
| infobar.error button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | black | black | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| switch | `background-color` | black | black | = |
|  | `color` | silver | silver | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 48px | 48px | = |
|  | `font-weight` | bold | normal | toolkit [6] |
| switch:checked | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 48px | 48px | = |
|  | `font-weight` | bold | normal | toolkit [6] |
| switch:disabled | `background-color` | navy | navy | = |
|  | `color` | lavender | lavender | = |
|  | `border-color` | lavender | lavender | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 48px | 48px | = |
|  | `font-weight` | bold | normal | toolkit [6] |
| switch slider | `background-color` | silver | silver | = |
|  | `color` | silver | silver | = |
|  | `border-color` | black | black | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| switch:checked slider | `background-color` | white | white | = |
|  | `color` | black | black | = |
|  | `border-color` | black | black | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
| switch:focus | `background-color` | black | black | = |
|  | `color` | silver | silver | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 48px | 48px | = |
|  | `outline-color` | yellow | yellow | = |
|  | `outline-width` | 2px | 2px | = |
|  | `font-weight` | bold | normal | toolkit [6] |
| check | `color` | white | white | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 16px | 16px | = |
|  | `margin` | 0 4px | 0 | toolkit [7] |
| check:checked | `color` | white | white | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 16px | 16px | = |
|  | `margin` | 0 4px | 0 | toolkit [7] |
| radio | `color` | white | white | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 16px | 16px | = |
|  | `margin` | 0 4px | 0 | toolkit [7] |
| scale | `color` | white | white | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 10px | 10px | = |
| scale trough | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 4px | 4px | = |
|  | `min-width` | 4px | 4px | = |
| scale highlight | `background-color` | blue | blue | = |
|  | `color` | white | white | = |
| scale slider | `background-color` | silver | silver | = |
|  | `color` | white | white | = |
|  | `border-color` | black | black | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 12px | 12px | = |
|  | `min-width` | 12px | 12px | = |
|  | `margin` | -6px | -6px | = |
| scale slider:hover | `background-color` | white | white | = |
|  | `color` | white | white | = |
|  | `border-color` | black | black | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 12px | 12px | = |
|  | `min-width` | 12px | 12px | = |
|  | `margin` | -6px | -6px | = |
| scale slider:active | `background-color` | blue | blue | = |
|  | `color` | white | white | = |
|  | `border-color` | black | black | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 12px | 12px | = |
|  | `min-width` | 12px | 12px | = |
|  | `margin` | -6px | -6px | = |
| scale slider:disabled | `background-color` | slate | slate | = |
|  | `color` | white | lavender | toolkit [8] |
|  | `border-color` | navy | navy | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 12px | 12px | = |
|  | `min-width` | 12px | 12px | = |
|  | `margin` | -6px | -6px | = |
| progressbar trough | `background-color` | black | black | = |
|  | `color` | silver | silver | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 128px | 128px | = |
| progressbar progress | `background-color` | green | green | = |
|  | `color` | silver | silver | = |
|  | `min-height` | 8px | 8px | = |
| progressbar progress :backdrop | `background-color` | forest | forest | = |
|  | `color` | silver | silver | = |
|  | `min-height` | 8px | 8px | = |
| progressbar.osd progress | `background-color` | green | green | = |
|  | `color` | white | white | = |
|  | `min-height` | 4px | 4px | = |
| scrollbar | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | - - - slate | - - - slate | = |
|  | `border-width` | 0 0 0 2px | 0 0 0 2px | = |
| scrollbar slider | `background-color` | silver | silver | = |
|  | `color` | white | white | = |
|  | `border-color` | black | - | toolkit [9] |
|  | `border-width` | 2px | 0 | toolkit [9] |
|  | `min-height` | 32px | 32px | = |
|  | `min-width` | 10px | 10px | = |
|  | `margin` | 0 | 2px | toolkit [9] |
| scrollbar slider:hover | `background-color` | white | white | = |
|  | `color` | white | white | = |
|  | `border-color` | black | - | toolkit [9] |
|  | `border-width` | 2px | 0 | toolkit [9] |
|  | `min-height` | 32px | 32px | = |
|  | `min-width` | 10px | 10px | = |
|  | `margin` | 0 | 2px | toolkit [9] |
| scrollbar slider:active | `background-color` | blue | blue | = |
|  | `color` | white | white | = |
|  | `border-color` | black | - | toolkit [9] |
|  | `border-width` | 2px | 0 | toolkit [9] |
|  | `min-height` | 32px | 32px | = |
|  | `min-width` | 10px | 10px | = |
|  | `margin` | 0 | 2px | toolkit [9] |
| notebook header | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | - - slate - | - - slate - | = |
|  | `border-width` | 0 0 2px 0 | 0 0 2px 0 | = |
| notebook tab | `color` | silver | silver | = |
|  | `border-color` | - slate - - | - slate - - | = |
|  | `border-width` | 0 2px 0 0 | 0 2px 0 0 | = |
|  | `min-height` | 24px | 24px | = |
|  | `min-width` | 24px | 24px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| notebook tab:hover | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `border-color` | - slate - - | - slate - - | = |
|  | `border-width` | 0 2px 0 0 | 0 2px 0 0 | = |
|  | `min-height` | 24px | 24px | = |
|  | `min-width` | 24px | 24px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| notebook tab:checked | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | - slate - - | - slate - - | = |
|  | `border-width` | 0 2px 0 0 | 0 2px 0 0 | = |
|  | `min-height` | 24px | 24px | = |
|  | `min-width` | 24px | 24px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | inset 0 4px 0 0 blue | inset 0 4px 0 0 blue | = |
|  | `font-weight` | bold | bold | = |
| notebook tab :backdrop:checked | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | - slate - - | - slate - - | = |
|  | `border-width` | 0 2px 0 0 | 0 2px 0 0 | = |
|  | `min-height` | 24px | 24px | = |
|  | `min-width` | 24px | 24px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | inset 0 4px 0 0 lavender | inset 0 4px 0 0 lavender | = |
|  | `font-weight` | bold | bold | = |
| tooltip | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| tooltip label | `color` | white | white | = |
| list row | `color` | white | white | = |
|  | `min-height` | 0 | 24px | toolkit [10] |
|  | `padding` | 0 | 2px 6px | toolkit [10] |
| list row:hover | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `min-height` | 0 | 24px | toolkit [10] |
|  | `padding` | 0 | 2px 6px | toolkit [10] |
| list row:selected | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `min-height` | 0 | 24px | toolkit [10] |
|  | `padding` | 0 | 2px 6px | toolkit [10] |
| list row:selected :backdrop | `background-color` | lavender | lavender | = |
|  | `color` | black | black | = |
|  | `min-height` | 0 | 24px | toolkit [10] |
|  | `padding` | 0 | 2px 6px | toolkit [10] |
| view row selected | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `min-height` | 0 | 24px | toolkit [10] |
|  | `padding` | 0 | 2px 6px | toolkit [10] |
| view (base) | `background-color` | black | black | = |
|  | `color` | white | white | = |
| column header button | `background-color` | navy | navy | = |
|  | `color` | silver | silver | = |
|  | `border-color` | - slate slate - | - slate - - | toolkit [11] |
|  | `border-width` | 0 2px 2px 0 | 0 2px 0 0 | toolkit [11] |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 2px 8px | 2px 8px | = |
|  | `font-weight` | bold | bold | = |
| treeview header button (both) | `background-color` | navy | navy | = |
|  | `color` | silver | silver | = |
|  | `border-color` | - slate slate - | - slate slate - | = |
|  | `border-width` | 0 2px 2px 0 | 0 2px 2px 0 | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 2px 8px | 2px 8px | = |
|  | `font-weight` | bold | bold | = |
| treeview header button :backdrop | `background-color` | navy | navy | = |
|  | `color` | silver | silver | = |
|  | `border-color` | - slate slate - | - slate slate - | = |
|  | `border-width` | 0 2px 2px 0 | 0 2px 2px 0 | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 2px 8px | 2px 8px | = |
|  | `font-weight` | bold | bold | = |
| treeview row selected (both) | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
| treeview progress cell | `background-color` | green | green | = |
|  | `color` | black | black | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
| treeview trough cell | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
| textview text | `background-color` | black | transparent | toolkit [12] |
|  | `color` | white | white | = |
| frame | `color` | white | white | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
| separator | `background-color` | slate | slate | = |
|  | `color` | white | white | = |
|  | `min-height` | 2px | 2px | = |
|  | `min-width` | 2px | 2px | = |
| combobox button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 6px 4px 8px | 4px 6px 4px 8px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
| toolbar | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `padding` | 4px | 4px | = |
| statusbar | `color` | silver | silver | = |
|  | `padding` | 2px 8px | 2px 8px | = |
| expander title:hover | `color` | white | white | = |
| calendar :selected | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `border-color` | slate | - | toolkit [13] |
|  | `border-width` | 2px | 0 | toolkit [13] |
|  | `min-height` | 0 | 20px | toolkit [13] |
|  | `min-width` | 0 | 24px | toolkit [13] |
|  | `padding` | 2px | 2px | = |
| stackswitcher button:checked | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `border-color` | silver - silver silver | silver - silver silver | = |
|  | `border-width` | 2px 0 2px 2px | 2px 0 2px 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 80px | 80px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| sidebar row:selected | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `min-height` | 24px | 24px | = |
|  | `padding` | 6px 12px | 6px 12px | = |
| actionbar | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | slate - - - | slate - - - | = |
|  | `border-width` | 2px 0 0 0 | 2px 0 0 0 | = |
|  | `padding` | 6px | 6px | = |
| headerbar button :backdrop | `background-color` | navy | navy | = |
|  | `color` | lavender | lavender | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `margin` | 4px 0 | 0 | toolkit [2] |
| headerbar button.suggested :backdrop | `background-color` | navy | navy | = |
|  | `color` | lavender | lavender | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `margin` | 4px 0 | 0 | toolkit [2] |
|  | `font-weight` | bold | bold | = |
| button.suggested-action :backdrop | `background-color` | green | green | = |
|  | `color` | black | black | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `font-weight` | bold | bold | = |
| button.default | `background-color` | navy | green | toolkit [14] |
|  | `color` | white | black | toolkit [14] |
|  | `border-color` | silver | white | toolkit [14] |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
|  | `font-weight` | bold | bold | = |
| button:checked :backdrop | `background-color` | lavender | lavender | = |
|  | `color` | black | black | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| button.image-button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 20px | 20px | = |
|  | `padding` | 4px | 4px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
| button.circular | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 24px | 24px | = |
|  | `min-width` | 24px | 24px | = |
|  | `padding` | 2px | 2px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
| switch :backdrop | `background-color` | black | black | = |
|  | `color` | silver | silver | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 48px | 48px | = |
|  | `font-weight` | bold | normal | toolkit [6] |
| switch:checked :backdrop | `background-color` | lavender | lavender | = |
|  | `color` | black | black | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 48px | 48px | = |
|  | `font-weight` | bold | normal | toolkit [6] |
| scale trough:disabled | `background-color` | navy | navy | = |
|  | `color` | white | lavender | toolkit [8] |
|  | `border-color` | lavender | lavender | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 4px | 4px | = |
|  | `min-width` | 4px | 4px | = |
| scale highlight:disabled | `background-color` | lavender | lavender | = |
|  | `color` | white | lavender | toolkit [8] |
| scale highlight :backdrop | `background-color` | lavender | lavender | = |
|  | `color` | white | white | = |
| progressbar trough:disabled | `background-color` | navy | navy | = |
|  | `color` | silver | lavender | toolkit [8] |
|  | `border-color` | lavender | lavender | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 128px | 128px | = |
| progressbar progress:disabled | `background-color` | lavender | lavender | = |
|  | `color` | silver | lavender | toolkit [8] |
|  | `min-height` | 8px | 8px | = |
| levelbar block.filled :backdrop | `background-color` | lavender | lavender | = |
|  | `color` | white | white | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 32px | 32px | = |
| notebook tab :backdrop | `color` | silver | silver | = |
|  | `border-color` | - slate - - | - slate - - | = |
|  | `border-width` | 0 2px 0 0 | 0 2px 0 0 | = |
|  | `min-height` | 24px | 24px | = |
|  | `min-width` | 24px | 24px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| notebook tab.needs-attention | `color` | orange | orange | = |
|  | `border-color` | - slate - - | - slate - - | = |
|  | `border-width` | 0 2px 0 0 | 0 2px 0 0 | = |
|  | `min-height` | 24px | 24px | = |
|  | `min-width` | 24px | 24px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| notebook tab close button:hover | `background-color` | red | red | = |
|  | `color` | black | black | = |
|  | `border-color` | white | white | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 16px | 16px | = |
|  | `margin` | 0 0 0 6px | 0 0 0 6px | = |
| notebook arrow | `color` | white | white | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px | 4px | = |
| popover :backdrop | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | slate | slate | = |
|  | `border-width` | 2px | 2px | = |
|  | `padding` | 6px | 6px | = |
| searchbar | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | - - slate - | - - slate - | = |
|  | `border-width` | 0 0 2px 0 | 0 0 2px 0 | = |
|  | `padding` | 6px | 6px | = |
| inline toolbar | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | - slate slate slate | - slate slate slate | = |
|  | `border-width` | 0 2px 2px 2px | 0 2px 2px 2px | = |
|  | `padding` | 2px | 2px | = |
| sidebar | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
| infobar (no type) | `background-color` | black | black | = |
|  | `color` | white | white | = |
|  | `border-color` | - - black - | - - black - | = |
|  | `border-width` | 0 0 2px 0 | 0 0 2px 0 | = |
|  | `padding` | 0 | 6px 8px | toolkit [5] |
| infobar.info button:hover | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `border-color` | white | white | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 16px | 16px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| rubberband | `color` | white | white | = |
|  | `border-color` | blue | blue | = |
|  | `border-width` | 2px | 2px | = |
| keycap | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 24px | 24px | = |
|  | `min-width` | 20px | 20px | = |
|  | `padding` | 0 6px 2px 6px | 0 6px 2px 6px | = |
|  | `margin` | 2px 0 0 0 | 2px 0 0 0 | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |
| spinner:checked | `background-image` | img:spinner-1 (+2x) | img:spinner-1 (+2x) | = |
|  | `color` | transparent | white | toolkit [15] |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 16px | 16px | = |
| flowboxchild:selected | `background-color` | blue | blue | = |
|  | `color` | black | black | = |
|  | `padding` | 4px | 4px | = |
| entry.success | `background-color` | black | black | = |
|  | `color` | green | green | = |
|  | `border-color` | green | green | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| spinbutton button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | - - - slate | - - - slate | = |
|  | `border-width` | 0 0 0 2px | 0 0 0 2px | = |
|  | `min-height` | 16px | 16px | = |
|  | `min-width` | 20px | 20px | = |
|  | `padding` | 0 4px | 0 4px | = |
| spinbutton text | `color` | white | white | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 28px | 28px | = |
|  | `padding` | 4px 8px | 4px 8px | = |
| popover (generic) padding | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `padding` | 6px | 6px | = |
|  | `box-shadow` | 4px 4px 0 0 rgba(0, 0, 0, 0.5) | 4px 4px 0 0 rgba(0, 0, 0, 0.5) | = |
| tab.dnd | `background-color` | plum | plum | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 24px | 24px | = |
|  | `min-width` | 24px | 24px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
| overshoot.top | `color` | white | white | = |
|  | `box-shadow` | inset 0 2px 0 0 blue | inset 0 2px 0 0 blue | = |
| paned separator | `background-color` | transparent | slate | toolkit [16] |
|  | `background-image` | image(slate) | none | toolkit [16] |
|  | `color` | white | white | = |
|  | `min-height` | 2px | 2px | = |
|  | `min-width` | 2px | 2px | = |
|  | `padding` | 0 6px 0 0 | 0 | toolkit [16] |
|  | `margin` | 0 -6px 0 0 | 0 | toolkit [16] |
| paned separator.wide | `background-color` | navy | navy | = |
|  | `background-image` | img:pane-handle-vertical (+2x) | img:pane-handle-vertical (+2x) | = |
|  | `color` | white | white | = |
|  | `border-color` | - slate | - slate | = |
|  | `border-width` | 0 2px | 0 2px | = |
|  | `min-height` | 8px | 8px | = |
|  | `min-width` | 8px | 8px | = |
| frame label | `color` | silver | silver | = |
|  | `margin` | 0 | 4px | toolkit [17] |
| placessidebar row | `color` | white | white | = |
|  | `min-height` | 28px | 28px | = |
|  | `padding` | 0 4px | 0 4px | = |
| print paper | `background-color` | white | white | = |
|  | `color` | black | black | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
| colorswatch:selected overlay | `color` | white | white | = |
|  | `border-color` | white | white | = |
|  | `border-width` | 2px | 2px | = |
|  | `box-shadow` | inset 0 0 0 2px black | inset 0 0 0 2px black | = |
| dialog action area button | `background-color` | navy | navy | = |
|  | `color` | white | white | = |
|  | `border-color` | silver | silver | = |
|  | `border-width` | 2px | 2px | = |
|  | `min-height` | 20px | 20px | = |
|  | `min-width` | 64px | 64px | = |
|  | `padding` | 4px 12px | 4px 12px | = |
|  | `box-shadow` | 2px 2px 0 0 black | 2px 2px 0 0 black | = |

## Notes on toolkit differences

1. GTK 3 hides the icon-theme symbol with color: transparent; GTK 4 hides the image node with opacity: 0. Both show only the pixel glyph.
2. GTK 3 centres bar children with a 4px margin; GTK 4 pads the inner windowhandle box by 4px. Same 40px bar.
3. GTK 3 sets the focus outline on every node and draws it only on the focused one (here it coincides with the yellow border); GTK 4 sets it via :focus-visible.
4. GTK 3 menus are separate windows: their 4px hard shadow comes from ".csd.popup decoration". GTK 4 menus are popovers and cast it from "contents".
5. GTK 3 info bars have built-in 8px / 6px container borders on their content and action areas, so the bar adds none; GTK 4 has no such borders and pads the bar instead. Both render 46px high with text 8px from the edge.
6. GTK 3 switches draw ON/OFF text (bold); GTK 4 switches use symbol images.
7. GTK 3 spaces the indicator from its label with a 4px margin; GTK 4 uses border-spacing: 4px on the check button.
8. Inherited text colour on a node that draws no text.
9. The 2px gap around the handle is a trough-coloured border in GTK 3 and a margin in GTK 4; the handle is 10px and the track 14px in both.
10. GTK 4 list rows carry their own padding because built-in list factories add none; GTK 3 rows are padded by the application.
11. GTK 4 column views draw the bottom rule on the header node instead of on each button.
12. GTK 4 paints the black surface on the textview node; the text node is transparent over it.
13. Different widget structure: GTK 3 calendar is one node with states, GTK 4 has a grid of day labels.
14. GTK 3 moves the default class to whichever button has keyboard focus, so there it is bold only; in GTK 4 the class stays on the real default action and is green like a suggested action.
15. GTK 3 hides the built-in spinner drawing with color: transparent; GTK 4 with -gtk-icon-source: none. Both show the pixel-art frames.
16. GTK 3 needs an invisible 6px grab strip next to the 2px line (margin/padding trick, line drawn as a background image); GTK 4 provides the grab area itself.
17. GTK 4 places the frame label inside the border, so it needs its own 4px margin.

## Decisions applied in the round-3 alignment pass

Window chrome
- Close button (CSD in both toolkits, SSD in GTK 3): hover and pressed are red with the black glyph and a silver frame. Other title buttons: hover plum, pressed blue with the black glyph. Title buttons are 20px + 2px frame (24px squares) and 6px apart in both.
- A header bar used as a title bar has a 2px blue bottom rule when focused and a slate one in `:backdrop`; other header bars keep the slate rule. 40px minimum height and bold title in both.
- Client-side window frame: 2px silver with a 4px hard shadow; slate and no visible shadow when unfocused (the shadow stays in the layout, transparent, so the window does not move).

Colours and states
- Level bars: default and `high` blue, `full` green, `low` red, empty navy blocks inside the slate-framed black trough.
- Status text: `.error` labels pink, `.warning` orange, `.success` green. Entries in a validation state keep a red / orange / green frame and text; when focused they add the yellow frame just inside.
- Disabled frames are lavender everywhere (buttons, entries, switches, troughs, swatches).
- Menus highlight in blue with black text; info bars are blue/black, plum/white, orange/black, red/black with a black bottom rule, flat close button and black-framed buttons; suggested hover is plum with a green frame, destructive hover plum with a red frame.
- Inactive (`:backdrop`) windows keep their text and surface colours in both toolkits. Only chrome changes: navy title bar with lavender text, slate frames on buttons, entries and switches, flattened bevels, lavender selections, forest progress fills.
- Bars inside a window (menu bar, action bar, search bar, inline toolbar, status bar, sidebars) are navy in both; black is kept for views, entries, troughs, title bars and tooltips.
- Rubber-band selection is blue; yellow is reserved for keyboard focus.

Geometry
- Buttons: 20px minimum height, 4px 8px padding (12px sides for text buttons), 2px frame. Entries and spin buttons the same height.
- Menu items: 16px minimum height, 6px 8px padding; menus pad 2px, other popovers 6px.
- Scrollbar handle 10px in a 14px track; overlay indicator 4px; overshoot marker 2px.
- Level bar blocks 32px minimum (12px in discrete mode); stack-switcher text buttons 80px minimum.

Assets
- The check box, radio, title-button, arrow, pane-handle and spinner art is the same pixel grid in both toolkits (GTK 4 was redrawn from the GTK 3 art). GTK 3 recolours its arrow glyphs from one `-symbolic` file each; GTK 4 ships white / black (`-active`) / lavender (`-dim`) copies.
- Both toolkits reference bitmap-style assets as `-gtk-scaled(name.svg, name-2x.svg)`. The `-2x` file has the same rectangles with a doubled pixel size, so the art is not interpolated at scale 2.
- The spinner is the same eight-frame pixel chase in both.

Named colours
- Every `@define-color` name present in both files resolves to the same palette colour (checked by script). GTK 3 additionally defines the legacy GTK 2 and window-manager names; GTK 4 additionally defines the libadwaita-style names.

## Known remaining differences that are not in the table

- Layout that the toolkit decides, not the stylesheet: GTK 4 scales with a value label are about 25px taller, GTK 4 calendar rows are about 3px taller and its month arrows are filled triangles, GTK 3 draws a divider slot before the window controls (made invisible), GTK 3 switches draw I / O marks, GTK 4 popover menus have a pointer arrow.
- GTK 4 marks today's date in the calendar with a green frame; the GTK 3 calendar has no separate "today" node.
