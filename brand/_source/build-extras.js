/** Supporting folders: typography, logo PDFs, mockups, motion, licensing, email signature, guideline source notes. */
const fs = require('fs');
const path = require('path');
const { launch } = require('./cdp');
const { CONTACT } = require('./brand');

const B = (...p) => path.resolve(__dirname, '..', ...p);
const mk = (...p) => { const d = B(...p); fs.mkdirSync(d, { recursive: true }); return d; };
const cp = (from, to) => fs.copyFileSync(from, to);
const W = (p, s) => fs.writeFileSync(p, s.replace(/^\n/, ''));

/* ---------- 04 Typography ---------- */
const fontsDir = mk('04-Typography', 'fonts'); const licDir = mk('04-Typography', 'licences');
for (const f of fs.readdirSync(path.resolve(__dirname, '../../presentation/fonts'))) cp(path.resolve(__dirname, '../../presentation/fonts', f), path.join(fontsDir, f));
for (const [pkg, name] of [['bricolage-grotesque', 'Bricolage-Grotesque'], ['instrument-sans', 'Instrument-Sans'], ['newsreader', 'Newsreader']]) cp(path.resolve(__dirname, `../../node_modules/@fontsource-variable/${pkg}/LICENSE`), path.join(licDir, `OFL-${name}.txt`));
W(B('04-Typography', 'README.md'), `
# BFourU typography

| Role | Typeface | Weights supplied | Licence |
|---|---|---|---|
| Display / headings / logo | Bricolage Grotesque | Regular 400, Bold 700 | SIL OFL 1.1 |
| Text / UI / documents | Instrument Sans | Regular 400, SemiBold 600, Bold 700 | SIL OFL 1.1 |
| Editorial accent (1–3 words only) | Newsreader Italic | Italic 400 | SIL OFL 1.1 |

## Installing
Windows: right-click each file in \`fonts/\` → **Install for all users**. macOS: double-click → **Install**.
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
See the brand guidelines (section 04) and \`/05-Design-Tokens\` for the fluid web scale and print / slide sizes.
`);

/* ---------- 09 Motion ---------- */
mk('09-Motion');
W(B('09-Motion', 'BFourU-Motion-Guidelines.md'), `
# BFourU motion guidelines

Motion is **smooth, calm and purposeful**: it explains a change or guides attention — it never decorates.

## Principles
1. **Purposeful** — every movement has a reason (reveal, feedback, continuity).
2. **Calm** — ease-out curves; no bounce, elastic, spin or flashing.
3. **Continuous** — objects move to their new position instead of disappearing (Morph in PowerPoint).
4. **Respectful** — honour \`prefers-reduced-motion\`; nothing auto-plays with sound.

## Tokens
| Token | Value | Use |
|---|---|---|
| \`--bf-dur-feedback\` | 180 ms | hover, press, toggles |
| \`--bf-dur-short\` | 320 ms | colour changes, menus |
| \`--bf-dur-reveal\` | 700–900 ms | scroll reveals, panels |
| \`--bf-dur-scene\` | 1100–1250 ms | headline lines, Morph |
| stagger | 60–110 ms | between sequenced items |
| \`--bf-ease\` | cubic-bezier(0.2, 0.7, 0.1, 1) | standard UI and reveals |
| \`--bf-ease-out\` | cubic-bezier(0.16, 1, 0.3, 1) | entrances, Morph-like moves |

CSS: \`bfouru-motion.css\` in this folder (also included in \`/05-Design-Tokens/bfouru-tokens.css\`).

## Behaviours
| Element | Behaviour |
|---|---|
| **Logo animation** | The four cells rotate in from −90° and scale 40→100 %, staggered 70 ms; the Persimmon circle lands last. Wordmark fades in after. Total ≤ 1.2 s. |
| **Typography reveal** | Headline lines rise from 105 % inside a mask, 1100 ms, stagger 110 ms. Body copy fades up 14 px after 350 ms. |
| **Page transitions** | Fade + 10 px rise, 600 ms — only on in-app navigation, never on first load. |
| **Scroll animation** | Reveal once at ~8 % visibility: 28 px rise + fade, 700–900 ms. No scroll-jacking; no parallax on text. |
| **Hover** | Buttons: Persimmon fills from below (420 ms), arrow swaps. Links: underline draws left→right (380 ms). Cards lift 3 px. |
| **Presentations** | Morph between slides (1.25 s) using shared object names prefixed \`!!\`; on-click reveals with Fade, Float In, Wipe or Zoom only. |
| **Social motion** | 6–10 s loops; each line holds ≥ 1.5 s; logo end-card 1.5 s on Forest Ink; captions burned in; text inside the centre 80 % safe area. |
| **Video** | Logo end-card 1.5 s; lower-thirds in Instrument Sans SemiBold on a 60 % Forest Ink bar; cuts or 300 ms cross-fades only. |
| **3D motion** | Not part of the current identity. If ever used: one slow rotation ≤ 15°, matte brand colours, never behind text. |

## Reduced motion
When the user prefers reduced motion: no reveals, marquees or parallax; content appears instantly; state changes may use a 0–120 ms opacity change.

## Avoid
Bounce, elastic, spin, flash, typewriter effects, confetti, auto-playing sound, any UI motion longer than 1.5 s.

## Reference implementations
- Website: \`src/styles/global.css\` and \`src/lib/hooks.ts\` (reveals, hero line masks, button fills).
- Presentation: \`presentation/output/BFourU-Healthcare-Deck.pptx\` (Morph + on-click entrances).
`);
W(B('09-Motion', 'bfouru-motion.css'), `
/* BFourU motion tokens + reference keyframes */
:root {
  --bf-ease: cubic-bezier(0.2, 0.7, 0.1, 1);
  --bf-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --bf-dur-feedback: 180ms;
  --bf-dur-short: 320ms;
  --bf-dur-reveal: 800ms;
  --bf-dur-scene: 1100ms;
  --bf-stagger: 90ms;
}
@keyframes bf-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes bf-line { from { transform: translateY(105%); } to { transform: none; } }
@keyframes bf-cell { from { opacity: 0; transform: rotate(-90deg) scale(.4); } to { opacity: 1; transform: none; } }
.bf-reveal { animation: bf-rise var(--bf-dur-reveal) var(--bf-ease) both; }
.bf-line-mask { display: block; overflow: hidden; } .bf-line-mask > span { display: block; animation: bf-line var(--bf-dur-scene) var(--bf-ease-out) both; }
/* Logo: give each mark cell (<path>/<circle>/<rect>) class bf-cell and --i: 0..3 */
.bf-cell { transform-box: fill-box; transform-origin: center; animation: bf-cell 700ms var(--bf-ease-out) both; animation-delay: calc(var(--i, 0) * 70ms); }
@media (prefers-reduced-motion: reduce) { .bf-reveal, .bf-line-mask > span, .bf-cell { animation: none; } }
`);

/* ---------- 10 Licensing ---------- */
mk('10-Licensing');
W(B('10-Licensing', 'LICENSING.md'), `
# Licensing and usage rights

## Fonts — SIL Open Font License 1.1
Bricolage Grotesque, Instrument Sans and Newsreader. Free for commercial use, embedding in PDFs / Office files / apps / websites,
and redistribution with this brand package. They may not be sold on their own. Full texts: \`/04-Typography/licences\`.

## BFourU-owned assets
Logo artwork, symbol, service glyphs, primitives, patterns, templates, mock-up illustrations and these guidelines were created for BFourU.
They are for use by BFourU and partners it approves. Do not modify the logo artwork.

> Trademark: this package does not register or prove trademark rights. Before heavy investment in signage and print, BFourU should run a
> trademark availability search and consider registration in India (Classes 35, 41, 42 as advised by a trademark attorney).

## Third-party content
- **No stock photography, stock illustration or stock icons** are included. All visuals are code-built.
- Example people, clinic names ("Aarogya") and data are fictional and labelled as concepts. Do not present them as client work.
- Tools used to produce files (pptxgenjs, docx, opentype.js, sharp, LibreOffice, Chrome) do not place restrictions on the outputs.

## Before publishing
- Replace placeholder contact details, domain and address with confirmed details.
- Photography of real people requires written consent; patient images require explicit informed consent (see guidelines, section 07).
`);

/* ---------- 07 Email signature ---------- */
const em = mk('07-Templates', 'email');
cp(B('02-Logo', 'png', 'bfouru-horizontal-full-colour-600w.png'), path.join(em, 'bfouru-logo-email.png'));
const sig = `<!-- BFourU email signature. Host bfouru-logo-email.png at a public HTTPS URL and replace LOGO_URL. Edit the name lines. -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#10211C;font-size:13px;line-height:1.5">
  <tr><td style="padding:0 0 2px;font-size:15px;font-weight:bold">Name Surname</td></tr>
  <tr><td style="padding:0 0 10px;color:#5A6862">Designation · BFourU</td></tr>
  <tr><td style="padding:0 0 10px"><img src="LOGO_URL/bfouru-logo-email.png" width="132" alt="BFourU" style="display:block;border:0;width:132px;height:auto"></td></tr>
  <tr><td style="color:#33433D">T <a href="tel:${CONTACT.phone.replace(/\s/g, '')}" style="color:#33433D;text-decoration:none">${CONTACT.phone}</a> &nbsp;·&nbsp; <a href="https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}" style="color:#1E6B58;text-decoration:none">WhatsApp</a></td></tr>
  <tr><td style="color:#33433D">E <a href="mailto:${CONTACT.email}" style="color:#33433D;text-decoration:none">${CONTACT.email}</a> &nbsp;·&nbsp; W <a href="https://${CONTACT.web}" style="color:#33433D;text-decoration:none">${CONTACT.web}</a></td></tr>
  <tr><td style="padding:10px 0 0;font-size:11px;color:#5A6862">One Brand. Multiple Solutions. Complete Support.</td></tr>
</table>
`;
W(path.join(em, 'BFourU-Email-Signature.html'), sig);
W(path.join(em, 'README.md'), `
# Email signature
1. Upload \`bfouru-logo-email.png\` to the website (e.g. https://www.bfouru.com/brand/) and replace \`LOGO_URL\` in the HTML.
2. Open \`BFourU-Email-Signature.html\` in a browser, select all, copy, and paste into Gmail › Settings › Signature (or Outlook › Signatures).
3. Edit name and designation. Keep Arial — brand fonts do not load in most email clients.
Contact details are placeholders from the company brief; confirm before use.
`);

/* ---------- 01 guideline source notes ---------- */
W(B('01-Brand-Guidelines', 'README.md'), `
# BFourU Brand Guidelines v1.0

- \`BFourU-Brand-Guidelines-v1.0.pdf\` — the manual (A4 landscape, 72 pages, fonts embedded, RGB).
- **Editable source:** \`/_source/guidelines/guidelines.html\` + \`guide.css\`, generated by \`/_source/build-guidelines.js\`.
  Edit the text in \`build-guidelines.js\`, then run \`node build-guidelines.js\` from \`/_source\` (needs Node 22+ and Google Chrome).
  The HTML can also be opened directly in Chrome and printed to PDF (A4 landscape, margins none, background graphics on).
`);

/* ---------- logo PDFs + mockups (Chrome) ---------- */
(async () => {
  const b = await launch();
  try {
    const pdfDir = mk('02-Logo', 'pdf');
    const svgDir = B('02-Logo', 'svg');
    const tmp = path.join(__dirname, '_logo.html');
    for (const f of fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg'))) {
      const svg = fs.readFileSync(path.join(svgDir, f), 'utf8');
      const vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
      const hMm = f.includes('symbol') ? 40 : f.includes('stacked') ? 50 : 20; const wMm = hMm * vb[2] / vb[3];
      const pad = hMm * 0.25; const dark = /reversed|mono-paper|white/.test(f);
      fs.writeFileSync(tmp, `<!doctype html><style>@page{size:${wMm + pad * 2}mm ${hMm + pad * 2}mm;margin:0}html,body{margin:0;background:${dark ? (f.includes('white') ? '#000' : '#10211C') : 'transparent'}}svg{display:block;margin:${pad}mm;width:${wMm}mm;height:${hMm}mm}*{-webkit-print-color-adjust:exact}</style>${svg}`);
      await b.open(tmp, 800, 600, 1);
      await b.pdf(path.join(pdfDir, f.replace('.svg', '.pdf')));
    }
    fs.rmSync(tmp);
    W(path.join(pdfDir, 'README.md'), `Vector PDFs of every logo for print vendors. Reversed / mono-ivory / white versions are placed on a Forest Ink (or black) background so they are visible; ask the printer to use the artwork only, not the background. For the cleanest vector source, use the SVG files.\n`);

    // Mockups: high-resolution renders of the application pages in the guidelines
    const mo = mk('08-Mockups'); for (const f of fs.readdirSync(mo)) fs.rmSync(path.join(mo, f), { recursive: true });
    await b.open(path.join(__dirname, 'guidelines', 'guidelines.html'), 1123, 794, 1);
    await b.sleep(1200);
    const list = await b.eval(`[...document.querySelectorAll('.page')].filter(p => /^(09|10) /.test(p.querySelector('.run span:last-child')?.textContent || '')).map(p => { const r = p.getBoundingClientRect(); return { name: (p.querySelector('h2')?.textContent || 'page').replace(/[^A-Za-z0-9]+/g, '-').replace(/-+$/,''), x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height }; })`);
    let i = 1; for (const r of list) { await b.png(path.join(mo, `${String(i++).padStart(2, '0')}-${r.name}.jpg`), { x: r.x, y: r.y, width: r.width, height: r.height, scale: 2.4 }); }
    const flat = mk('08-Mockups', 'flat-renders');
    for (const f of fs.readdirSync(path.join(__dirname, 'previews')).filter((f) => f.endsWith('.png'))) cp(path.join(__dirname, 'previews', f), path.join(flat, f));
    for (const f of fs.readdirSync(path.join(__dirname, 'previews', 'office'))) cp(path.join(__dirname, 'previews', 'office', f), path.join(flat, f));
    for (const f of fs.readdirSync(path.join(__dirname, 'previews', 'web'))) cp(path.join(__dirname, 'previews', 'web', f), path.join(flat, 'website-' + f));
    W(path.join(mo, 'README.md'), `Presentation-ready renders of BFourU applications (2.4× A4 landscape) and flat renders of every template.\nThese are code-built mock-ups, not photographs. Concepts and fictional names (e.g. "Aarogya") must be captioned as concepts when shown.\n`);
    console.log('logo pdfs:', fs.readdirSync(pdfDir).length - 1, 'mockups:', list.length);
  } finally { b.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
