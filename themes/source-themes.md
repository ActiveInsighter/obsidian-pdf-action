# Obsidian theme references

This folder records the theme research used to shape the PDF stylesheet. The PDF theme is rewritten for this repository instead of blindly copying an entire Obsidian app theme.

## Active PDF theme

`themes/obsidian-inspired.css` is currently a Minimal Light inspired PDF theme. It uses Minimal-style ideas: white background, narrow readable line width, restrained heading scale, subtle table rules, light callouts, and calm accent colors.

## Referenced themes

| Theme | Repository | Why it is useful for this PDF template | License note |
|---|---|---|---|
| Minimal | `kepano/obsidian-minimal` | Distraction-free reading, clean tables, helper classes, customizable color schemes. | MIT license in upstream repository. |
| Things | `colineckert/obsidian-things` | Elegant native-feeling light style, blue accent, readable headings. | MIT license in upstream repository. |
| Catppuccin | `catppuccin/obsidian` | Soft pastel palette and comfortable contrast. | MIT license in upstream repository. |
| AnuPpuccin | `AnubisNekhet/AnuPpuccin` | Colorful headings, expressive callouts and checkbox ideas. | GPL-3.0 upstream; used only as design reference here, not copied. |

## Implementation note

The active stylesheet is written specifically for Markdown-to-PDF output: print margins, page breaks, tables, callouts, code blocks, KaTeX, and CJK typography. The original Minimal theme is a full Obsidian app theme, so this repository uses an adapted PDF-focused stylesheet rather than a direct full-theme copy.
