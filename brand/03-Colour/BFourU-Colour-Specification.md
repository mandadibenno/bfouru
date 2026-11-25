# BFourU Colour Specification

All colours are defined in sRGB (screen). **CMYK values are mathematical approximations** (uncoated/coated not specified) for briefing only. Before any print run, ask the printer for a **physical proof** and adjust to their press profile (e.g. FOGRA39 coated / FOGRA29 uncoated). For signage and paint, match against a physical swatch book; no Pantone references are given because they must be confirmed visually against a printed guide.

| Name | HEX | RGB | CMYK (approx.) | CSS token | Role |
|---|---|---|---|---|---|
| Forest Ink | `#10211C` | 16, 33, 28 | 52 / 0 / 15 / 87 | `--bf-ink` | Primary — text, dark surfaces, primary buttons |
| Ivory Paper | `#F3EFE7` | 243, 239, 231 | 0 / 2 / 5 / 5 | `--bf-paper` | Primary — main background |
| Persimmon | `#E4572E` | 228, 87, 46 | 0 / 62 / 80 / 11 | `--bf-accent` | Signature accent — the mark’s dot, highlights, large accents |
| **Supporting** | | | | | |
| Care Teal | `#1E6B58` | 30, 107, 88 | 72 / 0 / 18 / 58 | `--bf-teal` | Secondary — healthcare accent, success, links on light |
| Sage | `#D3DFD3` | 211, 223, 211 | 5 / 0 / 5 / 13 | `--bf-sage` | Secondary surface — healthcare and calm sections |
| Marigold | `#E9B44C` | 233, 180, 76 | 0 / 23 / 67 / 9 | `--bf-marigold` | Tertiary — illustrations, editorial italics on dark |
| Deep Teal | `#0F2B25` | 15, 43, 37 | 65 / 0 / 14 / 83 | `--bf-teal-dark` | Illustration and screen surfaces |
| **Neutrals & functional** | | | | | |
| Warm White | `#FBF8F2` | 251, 248, 242 | 0 / 1 / 4 / 2 | `--bf-white` | Cards and documents on paper |
| Sand | `#EAE4D8` | 234, 228, 216 | 0 / 3 / 8 / 8 | `--bf-paper2` | Raised surfaces and alternating bands |
| Stone | `#DED6C6` | 222, 214, 198 | 0 / 4 / 11 / 13 | `--bf-paper3` | Borders, chips, dividers |
| Ink 80 | `#33433D` | 51, 67, 61 | 24 / 0 / 9 / 74 | `--bf-ink2` | Secondary text |
| Ink 60 | `#5A6862` | 90, 104, 98 | 13 / 0 / 6 / 59 | `--bf-muted` | Tertiary text, captions (on light only) |
| Mist | `#A9B5AF` | 169, 181, 175 | 7 / 0 / 3 / 29 | `--bf-on-ink-muted` | Secondary text on Forest Ink |
| Persimmon Deep | `#A63A1B` | 166, 58, 27 | 0 / 65 / 84 / 35 | `--bf-accent-ink` | Accent for small text on light backgrounds |

## Proportion
Ivory Paper 60% · Forest Ink 25% · Sand/Stone neutrals 8% · Persimmon 5% · Teal/Sage/Marigold 2% (rising to ~15% sage/teal on healthcare material).

## Contrast (WCAG 2.2)
| Foreground on background | Ratio | Normal text | Large text (≥ 24px / 19px bold) |
|---|---|---|---|
| Forest Ink on Ivory Paper | 14.58:1 | AA | AA |
| Ink 80 on Ivory Paper | 9.11:1 | AA | AA |
| Ink 60 on Ivory Paper | 5.1:1 | AA | AA |
| Ink 60 on Sand | 4.62:1 | AA | AA |
| Persimmon Deep on Ivory Paper | 5.65:1 | AA | AA |
| Persimmon Deep on Sand | 5.12:1 | AA | AA |
| Care Teal on Ivory Paper | 5.55:1 | AA | AA |
| Care Teal on Sage | 4.63:1 | AA | AA |
| Forest Ink on Sage | 12.15:1 | AA | AA |
| Forest Ink on Persimmon | 4.54:1 | AA | AA |
| Ivory Paper on Forest Ink | 14.58:1 | AA | AA |
| Mist on Forest Ink | 7.89:1 | AA | AA |
| Persimmon on Forest Ink | 4.54:1 | AA | AA |
| Marigold on Forest Ink | 8.83:1 | AA | AA |
| Persimmon on Ivory Paper | 3.21:1 | fail | AA |
| Ivory Paper on Persimmon | 3.21:1 | fail | AA |
| Ivory Paper on Care Teal | 5.55:1 | AA | AA |

**Rules:** Persimmon is never used for body text on light backgrounds (use Persimmon Deep). Ink 60 is not used on Sage for small text. Ivory on Persimmon is for large display type and graphics only.
