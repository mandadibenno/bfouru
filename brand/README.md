# BFourU brand identity package, v1.0 (November 2026)

**One Brand. Multiple Solutions. Complete Support.**

This package documents and extends the existing BFourU identity, which is the logo and design system already used on the website and in the healthcare deck. The logo has **not** been redesigned. It is outlined from the same construction the website uses.

| Folder | What's inside | Who uses it |
|---|---|---|
| `01-Brand-Guidelines` | **BFourU-Brand-Guidelines-v1.0.pdf** (72 pp, A4 landscape): strategy, logo, colour, type, layout, visual language, voice, motion, applications, healthcare, production | Everyone |
| `02-Logo` | `svg/` masters (4 layouts × 6 colourways), `pdf/` for print, `png/` at 600 / 1200 / 2400 px wide, favicon and app icons, social profile icons | Designers, developers, printers |
| `03-Colour` | Colour specification (HEX / RGB / approximate CMYK / tokens) and the WCAG contrast matrix | Designers, printers |
| `04-Typography` | Font files (TTF), SIL OFL licences, installation and fallback notes | Everyone |
| `05-Design-Tokens` | `bfouru-tokens.css` and `bfouru-tokens.json` (colour, type, spacing, radius, shadow, motion) | Developers |
| `06-Icons-and-Graphics` | 15 service glyphs (SVG, reversed SVG, 512 px PNG), the 10 primitives, glyph-grid patterns, paper grain | Designers |
| `07-Templates` | PowerPoint master (8 layouts); social templates (4 sizes); Word letterhead, proposal, quotation and invoice; print-ready PDFs; email signature | Marketing, admin, agencies |
| `08-Mockups` | Presentation-ready application renders, plus flat renders of every template | Sales, pitches |
| `09-Motion` | Motion guidelines and `bfouru-motion.css` | Designers, developers, video |
| `10-Licensing` | Font and asset licensing, trademark note | Management, agencies |
| `_source` | Generators (Node.js) for every file above: logos, tokens, print, Office, guidelines, extras | Maintainers |

## Rebuilding (maintainers)
From `_source`, run `npm install`. This needs Node 22 or later, Google Chrome and LibreOffice for the Office previews. Then run:

```
node build-logos.js
node build-tokens.js
node build-print.js
set NODE_PATH=./node_modules
node build-office.js
node build-guidelines.js
node build-extras.js
```

## Known limitations (please read)
- **CMYK values are approximate.** They are converted from sRGB. Print PDFs are RGB with embedded fonts, so ask the printer to convert them to their profile and to supply a hard proof on the actual stock.
- **Print templates are generated from HTML/CSS** (`_source/print`), not InDesign or Illustrator. They are editable as code. A designer can also open the PDFs or SVGs in Illustrator. Folders and standees must be placed on the vendor's dieline or hardware template.
- **Office templates were verified in LibreOffice**, not Microsoft PowerPoint or Word, because Office isn't installed here. Check them in Office before wide rollout.
- **Fonts are Latin-subset TTFs.** For Indian scripts or the full families, download the same typefaces from Google Fonts.
- **Placeholders to confirm:** the domain (www.bfouru.com), the email (currently a personal Gmail; a domain email is recommended), the office address, GST and bank details on the quotation and invoice, and the names on the cards and signature.
- No photography library exists yet; the guidelines give the direction for commissioning one. Every person, clinic ("Aarogya") and number in the examples is fictional and labelled as a concept.
