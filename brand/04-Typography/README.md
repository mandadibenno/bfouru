# BFourU typography

| Role | Typeface | Weights supplied | Licence |
|---|---|---|---|
| Display / headings / logo | Bricolage Grotesque | Regular 400, Bold 700 | SIL OFL 1.1 |
| Text / UI / documents | Instrument Sans | Regular 400, SemiBold 600, Bold 700 | SIL OFL 1.1 |
| Editorial accent (1–3 words only) | Newsreader Italic | Italic 400 | SIL OFL 1.1 |

## Installing
Windows: right-click each file in `fonts/` → **Install for all users**. macOS: double-click → **Install**.
Restart PowerPoint / Word afterwards. When sharing PowerPoint files, use **File › Options › Save › Embed fonts in the file**.

## Important
- The supplied TTFs are **Latin-subset static instances** made from the website's web fonts. They cover English, numbers, punctuation and ₹.
  For Hindi, Kannada, Telugu or other scripts, or for the complete variable families, download the official families from Google Fonts
  (fonts.google.com — "Bricolage Grotesque", "Instrument Sans", "Newsreader"). These are the same typefaces under the same licence.
- The website self-hosts the variable web fonts through Fontsource (see the website's package.json).

## Fallbacks
| Typeface | Web fallback stack | Office / email fallback |
|---|---|---|
| Bricolage Grotesque | "Arial Narrow", Arial, sans-serif | Arial Bold |
| Instrument Sans | "Segoe UI", Roboto, Arial, sans-serif | Calibri / Arial |
| Newsreader Italic | Georgia, "Times New Roman", serif | Georgia Italic |

## Type scale
See the brand guidelines (section 04) and `/05-Design-Tokens` for the fluid web scale and print / slide sizes.
