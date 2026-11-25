/**
 * Editable Office templates:
 *  - PowerPoint master (16:9) with named layouts + placeholders and example slides
 *  - Social media templates as editable PPTX at platform sizes (1px = 0.01in)
 *  - Word templates: letterhead, proposal, quotation, invoice
 */
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const docx = require('docx');
const { C, CONTACT } = require('./brand');
const { applyTheme } = require('../../presentation/apply_theme');

const H = (k) => C[k].hex.slice(1);
const HEAD = 'Bricolage Grotesque', BODY = 'Instrument Sans', SERIF = 'Newsreader';
const OUT = path.resolve(__dirname, '../07-Templates');
const LOGO = path.resolve(__dirname, '../02-Logo/png');
const THEME = { name: 'BFourU', headFontFace: HEAD, bodyFontFace: BODY, colors: { dk1: H('ink'), lt1: H('white'), dk2: H('ink2'), lt2: H('paper'), accent1: H('accent'), accent2: H('teal'), accent3: H('marigold'), accent4: H('sage'), accent5: H('paper2'), accent6: H('muted'), hlink: H('teal'), folHlink: H('accentInk') } };
const L = (n) => path.join(LOGO, n);
const ratio = async (f) => { const m = await sharp(f).metadata(); return m.width / m.height; };

/* ======================================================= PowerPoint master */
async function master() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.title = 'BFourU Presentation Template';
  pres.author = 'BFourU'; pres.company = 'BFourU';
  pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };
  const W = 13.333, M = 0.75;
  const rInk = await ratio(L('bfouru-horizontal-full-colour-1200w.png'));
  const logoInk = { image: { path: L('bfouru-horizontal-full-colour-1200w.png'), x: M, y: 6.98, w: 0.27 * rInk, h: 0.27 } };
  const logoPaper = { image: { path: L('bfouru-horizontal-reversed-1200w.png'), x: M, y: 6.98, w: 0.27 * rInk, h: 0.27 } };
  const num = (c) => ({ x: W - M - 0.6, y: 6.97, w: 0.6, h: 0.3, fontFace: BODY, fontSize: 10, color: c, align: 'right' });
  const ph = (name, type, o) => ({ placeholder: { options: { name, type, align: 'left', margin: 0, fit: 'none', ...o }, text: o.text || '' } });
  const eyebrow = (dark) => ph('eyebrow', 'body', { x: M, y: 0.6, w: 8, h: 0.3, fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2.5, color: dark ? H('onInkMuted') : H('ink2'), text: 'SECTION LABEL' });
  const title = (dark, y = 1.05, size = 38) => ph('title', 'title', { x: M, y, w: 10.5, h: 1.3, fontFace: HEAD, bold: true, fontSize: size, color: dark ? H('paper') : H('ink'), valign: 'top', text: 'Slide title in sentence case' });

  pres.defineSlideMaster({ title: 'Cover', background: { color: H('ink') }, objects: [
    { image: { path: L('bfouru-horizontal-reversed-1200w.png'), x: M, y: 0.62, w: 0.42 * rInk, h: 0.42 } },
    { image: { path: L('bfouru-symbol-reversed-1200w.png'), x: 9.0, y: 1.9, w: 3.55, h: 3.55 } },
    ph('title', 'title', { x: M, y: 2.0, w: 7.8, h: 2.8, fontFace: HEAD, bold: true, fontSize: 54, color: H('paper'), valign: 'top', text: 'Presentation title' }),
    ph('subtitle', 'body', { x: M, y: 5.2, w: 7, h: 0.9, fontFace: BODY, fontSize: 16, color: H('onInkMuted'), text: 'Subtitle, client or date' }),
    { line: { x: M, y: 6.55, w: W - 2 * M, h: 0, line: { color: '3A4A44', width: 0.75 } } },
    { text: { text: 'One Brand. Multiple Solutions. Complete Support.', options: { x: M, y: 6.7, w: 6, h: 0.3, fontFace: BODY, fontSize: 11, color: H('onInkMuted') } } },
  ] });
  pres.defineSlideMaster({ title: 'Section Divider', background: { color: H('ink') }, objects: [logoPaper,
    ph('number', 'body', { x: M, y: 0.75, w: 1, h: 0.4, fontFace: BODY, fontSize: 13, bold: true, color: H('accent'), text: '01' }),
    ph('label', 'body', { x: M + 0.6, y: 0.75, w: 6, h: 0.4, fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2.5, color: H('onInkMuted'), text: 'SECTION NAME' }),
    ph('title', 'title', { x: M, y: 2.2, w: 11, h: 2.6, fontFace: HEAD, bold: true, fontSize: 58, color: H('paper'), valign: 'top', text: 'A big, short statement for the section' }),
    { image: { path: L('bfouru-symbol-reversed-1200w.png'), x: 11.2, y: 5.0, w: 1.35, h: 1.35 } }], slideNumber: num(H('onInkMuted')) });
  pres.defineSlideMaster({ title: 'Title and Content', background: { color: H('paper') }, objects: [logoInk, eyebrow(false), title(false),
    ph('body', 'body', { x: M, y: 2.55, w: 11.8, h: 3.9, fontFace: BODY, fontSize: 16, color: H('ink2'), valign: 'top', text: 'Body text. Keep to one idea per slide and three to five short points.' })], slideNumber: num(H('muted')) });
  pres.defineSlideMaster({ title: 'Two Columns', background: { color: H('paper') }, objects: [logoInk, eyebrow(false), title(false),
    ph('left', 'body', { x: M, y: 2.55, w: 5.6, h: 3.9, fontFace: BODY, fontSize: 15, color: H('ink2'), valign: 'top', text: 'Left column' }),
    ph('right', 'body', { x: 6.98, y: 2.55, w: 5.6, h: 3.9, fontFace: BODY, fontSize: 15, color: H('ink2'), valign: 'top', text: 'Right column' })], slideNumber: num(H('muted')) });
  pres.defineSlideMaster({ title: 'Image Right', background: { color: H('paper2') }, objects: [logoInk, eyebrow(false), ph('title', 'title', { x: M, y: 1.05, w: 5.4, h: 1.9, fontFace: HEAD, bold: true, fontSize: 34, color: H('ink'), valign: 'top', text: 'Title beside an image' }),
    ph('body', 'body', { x: M, y: 3.1, w: 5.2, h: 3.2, fontFace: BODY, fontSize: 15, color: H('ink2'), valign: 'top', text: 'Supporting text' }),
    ph('image', 'pic', { x: 6.6, y: 0.75, w: 6.0, h: 5.8, text: 'Insert image or mock-up' })], slideNumber: num(H('muted')) });
  pres.defineSlideMaster({ title: 'Statement', background: { color: H('ink') }, objects: [logoPaper, eyebrow(true),
    ph('title', 'title', { x: M, y: 1.6, w: 11.2, h: 3.2, fontFace: HEAD, bold: true, fontSize: 48, color: H('paper'), valign: 'top', text: 'A single sentence that the audience should remember.' }),
    ph('body', 'body', { x: M, y: 5.0, w: 8, h: 1, fontFace: BODY, fontSize: 16, color: H('onInkMuted'), text: 'Optional supporting line' })], slideNumber: num(H('onInkMuted')) });
  pres.defineSlideMaster({ title: 'Healthcare (Sage)', background: { color: H('sage') }, objects: [logoInk, eyebrow(false), title(false),
    ph('body', 'body', { x: M, y: 2.55, w: 11.8, h: 3.9, fontFace: BODY, fontSize: 16, color: H('ink'), valign: 'top', text: 'Healthcare content — calm, factual, consent-first.' })], slideNumber: num(H('ink2')) });
  pres.defineSlideMaster({ title: 'Closing', background: { color: H('ink') }, objects: [
    { image: { path: L('bfouru-horizontal-reversed-1200w.png'), x: M, y: 0.62, w: 0.42 * rInk, h: 0.42 } },
    ph('title', 'title', { x: M, y: 1.9, w: 7.4, h: 1.9, fontFace: HEAD, bold: true, fontSize: 50, color: H('paper'), valign: 'top', text: 'Let’s start with a conversation.' }),
    { text: { text: 'PHONE / WHATSAPP', options: { x: 8.95, y: 4.2, w: 3.6, h: 0.3, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 2, color: H('onInkMuted') } } },
    { text: { text: CONTACT.phone, options: { x: 8.95, y: 4.5, w: 3.6, h: 0.4, fontFace: BODY, fontSize: 14, bold: true, color: H('paper') } } },
    { text: { text: 'EMAIL', options: { x: 8.95, y: 5.05, w: 3.6, h: 0.3, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 2, color: H('onInkMuted') } } },
    { text: { text: CONTACT.email, options: { x: 8.95, y: 5.35, w: 3.6, h: 0.4, fontFace: BODY, fontSize: 14, bold: true, color: H('paper') } } },
    { image: { path: L('bfouru-symbol-reversed-1200w.png'), x: 10.65, y: 0.7, w: 1.9, h: 1.9 } }] });

  const add = (m, fill) => { const s = pres.addSlide({ masterName: m }); fill(s); return s; };
  add('Cover', (s) => { s.addText('Presentation title', { placeholder: 'title' }); s.addText('Subtitle, client name or date', { placeholder: 'subtitle' }); s.addNotes('Cover layout. Replace the title and subtitle. Keep the mark and logo where they are.'); });
  add('Section Divider', (s) => { s.addText('01', { placeholder: 'number' }); s.addText('SECTION NAME', { placeholder: 'label' }); s.addText('A big, short statement for the section.', { placeholder: 'title' }); });
  add('Title and Content', (s) => { s.addText('SECTION LABEL', { placeholder: 'eyebrow' }); s.addText('One message per slide', { placeholder: 'title' }); s.addText([{ text: 'Use sentence case for titles; no full stop on content titles.', options: { bullet: true, breakLine: true } }, { text: 'Body 14–18pt, Instrument Sans, left aligned.', options: { bullet: true, breakLine: true } }, { text: 'Three to five points, each a single line where possible.', options: { bullet: true } }], { placeholder: 'body' }); });
  add('Two Columns', (s) => { s.addText('COMPARISON', { placeholder: 'eyebrow' }); s.addText('Project, subscription — or both', { placeholder: 'title' }); s.addText('Project-based: a defined piece of work with a clear finish.', { placeholder: 'left' }); s.addText('Subscription: ongoing monthly support for work that never stops.', { placeholder: 'right' }); });
  add('Image Right', (s) => { s.addText('CASE OR CONCEPT', { placeholder: 'eyebrow' }); s.addText('Title beside an image', { placeholder: 'title' }); s.addText('Use real work with permission, or label concept mock-ups clearly.', { placeholder: 'body' }); });
  add('Statement', (s) => { s.addText('KEY IDEA', { placeholder: 'eyebrow' }); s.addText('Patients judge care by everything around the consultation.', { placeholder: 'title' }); });
  add('Healthcare (Sage)', (s) => { s.addText('HEALTHCARE', { placeholder: 'eyebrow' }); s.addText('You care for patients. We take care of the rest.', { placeholder: 'title' }); s.addText('Clinical content is always approved by the treating doctor.', { placeholder: 'body' }); });
  add('Closing', (s) => { s.addText('Let’s start with a conversation.', { placeholder: 'title' }); });

  const dir = path.join(OUT, 'powerpoint'); fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, 'BFourU-Presentation-Master.pptx');
  await pres.writeFile({ fileName: f });
  await applyTheme(f, THEME);
  return f;
}

/* ======================================================= Social templates */
const glyphs = JSON.parse(fs.readFileSync(path.join(__dirname, 'glyphs.json'), 'utf8'));
const GL = (n, rev) => path.resolve(__dirname, `../06-Icons-and-Graphics/service-glyphs/${n}${rev ? '-reversed' : ''}.svg`);
async function glyphPng(n, rev) { const out = path.join(__dirname, `tmp-glyph-${n}${rev ? '-r' : ''}.png`); await sharp(GL(n, rev), { density: 600 }).resize(600).png().toFile(out); return out; }

async function social(name, Wpx, Hpx, designs) {
  const pres = new pptxgen();
  const w = Wpx / 100, h = Hpx / 100;
  pres.defineLayout({ name, width: w, height: h });
  pres.layout = name;
  pres.title = `BFourU ${name}`; pres.author = 'BFourU';
  pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };
  for (const d of designs) await d(pres, w, h);
  const dir = path.join(OUT, 'social-media'); fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, `BFourU-Social-${name}.pptx`);
  await pres.writeFile({ fileName: f });
  await applyTheme(f, THEME);
  return f;
}
const rLogo = () => ratio(L('bfouru-horizontal-full-colour-1200w.png'));
// design factories (sizes proportional to the canvas width)
const D = {
  statement: (text, sub) => async (p, w, h) => { const s = p.addSlide(); const r = await rLogo(); const u = Math.min(w, h); const m = u * 0.08;
    s.background = { color: H('ink') };
    s.addImage({ path: L('bfouru-horizontal-reversed-1200w.png'), x: m, y: m, w: u * 0.06 * r, h: u * 0.06 });
    const ms = u * 0.5; s.addImage({ path: L('bfouru-symbol-reversed-1200w.png'), x: w - ms * 0.78, y: -ms * 0.16, w: ms, h: ms });
    s.addText(text, { x: m, y: h * 0.42, w: w > h ? w - ms * 0.78 - 2 * m : w - 2 * m, h: h * 0.38, fontFace: HEAD, bold: true, fontSize: u * 6.4, color: H('paper'), valign: 'bottom', margin: 0, lineSpacingMultiple: 0.9 });
    s.addText(sub, { x: m, y: h - m - u * 0.06, w: w - 2 * m, h: u * 0.06, fontFace: BODY, fontSize: u * 2.4, color: H('onInkMuted'), margin: 0 });
    s.addNotes('Statement post: one short line (max ~8 words). Keep the logo top-left and the mark cropped top-right.'); },
  service: (glyph, eyebrow, title, body) => async (p, w, h) => { const s = p.addSlide(); const r = await rLogo(); const u = Math.min(w, h); const m = u * 0.08;
    s.background = { color: H('paper') };
    s.addImage({ path: await glyphPng(glyph), x: m, y: m, w: u * 0.16, h: u * 0.16 });
    s.addText(eyebrow.toUpperCase(), { x: m, y: h * 0.42, w: w - 2 * m, h: u * 0.05, fontFace: BODY, bold: true, fontSize: u * 2.1, charSpacing: u * 0.25, color: H('accentInk'), margin: 0 });
    s.addText(title, { x: m, y: h * 0.42 + u * 0.07, w: w - 2 * m, h: h * 0.28, fontFace: HEAD, bold: true, fontSize: u * 5.4, color: H('ink'), valign: 'top', margin: 0, lineSpacingMultiple: 0.92 });
    s.addText(body, { x: m, y: h - m - u * 0.2, w: w * 0.7, h: w * 0.12, fontFace: BODY, fontSize: u * 2.5, color: H('ink2'), valign: 'top', margin: 0 });
    s.addImage({ path: L('bfouru-horizontal-full-colour-1200w.png'), x: w - m - u * 0.05 * r, y: h - m - u * 0.05, w: u * 0.05 * r, h: u * 0.05 });
    s.addNotes('Service spotlight: swap the glyph for the matching service (06-Icons-and-Graphics/service-glyphs).'); },
  health: (title, points) => async (p, w, h) => { const s = p.addSlide(); const r = await rLogo(); const u = Math.min(w, h); const m = u * 0.08;
    s.background = { color: H('sage') };
    s.addText('HEALTH AWARENESS', { x: m, y: m, w: w - 2 * m, h: u * 0.05, fontFace: BODY, bold: true, fontSize: u * 2.1, charSpacing: u * 0.25, color: H('teal'), margin: 0 });
    s.addText(title, { x: m, y: m + u * 0.09, w: w - 2 * m, h: h * 0.3, fontFace: HEAD, bold: true, fontSize: u * 5.6, color: H('ink'), valign: 'top', margin: 0, lineSpacingMultiple: 0.92 });
    points.forEach((t, i) => { const y = h * 0.5 + i * u * 0.11;
      s.addShape(p.shapes.OVAL, { x: m, y, w: w * 0.07, h: u * 0.07, fill: { color: H('white') }, line: { type: 'none' } });
      s.addText(String(i + 1), { x: m, y, w: w * 0.07, h: u * 0.07, fontFace: BODY, bold: true, fontSize: u * 2.2, color: H('teal'), align: 'center', valign: 'middle', margin: 0 });
      s.addText(t, { x: m + u * 0.1, y, w: w * 0.75, h: u * 0.07, fontFace: BODY, fontSize: u * 2.7, color: H('ink'), valign: 'middle', margin: 0 }); });
    s.addText('Content reviewed by the treating doctor before publishing.', { x: m, y: h - m - u * 0.04, w: w * 0.6, h: u * 0.04, fontFace: BODY, fontSize: u * 1.6, color: H('ink2'), margin: 0 });
    s.addImage({ path: L('bfouru-horizontal-full-colour-1200w.png'), x: w - m - u * 0.05 * r, y: h - m - u * 0.05, w: u * 0.05 * r, h: u * 0.05 });
    s.addNotes('Healthcare awareness template. Clinical content must be approved by the relevant doctor. No outcome claims, no patient testimonials, no superlatives.'); },
  tip: (num, title, body) => async (p, w, h) => { const s = p.addSlide(); const r = await rLogo(); const u = Math.min(w, h); const m = u * 0.08;
    s.background = { color: H('paper2') };
    s.addText(num, { x: m, y: m, w: w * 0.4, h: w * 0.2, fontFace: HEAD, bold: true, fontSize: u * 12, color: H('accent'), margin: 0, valign: 'top' });
    s.addText(title, { x: m, y: h * 0.4, w: w - 2 * m, h: h * 0.24, fontFace: HEAD, bold: true, fontSize: u * 5, color: H('ink'), valign: 'top', margin: 0, lineSpacingMultiple: 0.95 });
    s.addText(body, { x: m, y: h * 0.66, w: w * 0.78, h: h * 0.16, fontFace: BODY, fontSize: u * 2.6, color: H('ink2'), valign: 'top', margin: 0 });
    s.addImage({ path: L('bfouru-horizontal-full-colour-1200w.png'), x: m, y: h - m - u * 0.05, w: u * 0.05 * r, h: u * 0.05 });
    s.addNotes('Tip / carousel slide. Number in Persimmon, one idea per slide.'); },
};
async function socials() {
  const out = [];
  out.push(await social('Square-1080', 1080, 1080, [D.statement('One brand. Multiple solutions. Complete support.', 'Creative · Digital · Technology'), D.service('website-app-development', 'Websites & apps', 'Easy to find. Easy to trust. Easy to book.', 'Mobile-first websites connected to booking, WhatsApp and enquiries.'), D.health('Monsoon care for little ones', ['Boil and cool drinking water', 'Keep vaccinations on schedule', 'Ask your doctor about fever']), D.tip('01', 'One brief beats ten vendors.', 'Explain your business once. Every discipline works from the same understanding.')]));
  out.push(await social('Portrait-1080x1350', 1080, 1350, [D.statement('Everything your brand needs.', 'One partner · bfouru.com'), D.service('opd-tv-displays', 'OPD TV & displays', 'Turn the waiting room into a calmer space.', 'Content and design for the screens you already have.')]));
  out.push(await social('Story-1080x1920', 1080, 1920, [D.statement('You care for patients. We take care of the rest.', 'Healthcare · BFourU'), D.tip('03', 'Reminders that run themselves.', 'WhatsApp confirmations and follow-ups, built around consent.')]));
  out.push(await social('Landscape-1200x627', 1200, 627, [D.statement('One partner, not ten vendors.', 'LinkedIn · Facebook · Ads'), D.service('branding-identity', 'Branding & identity', 'A brand people recognise.', 'Logo, identity and guidelines — applied the same way everywhere.')]));
  fs.readdirSync(__dirname).filter((f) => f.startsWith('tmp-glyph-')).forEach((f) => fs.rmSync(path.join(__dirname, f)));
  return out;
}

/* ======================================================= Word templates */
async function words() {
  const { Document, Packer, Paragraph, TextRun, Header, Footer, ImageRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, TabStopType, PageNumber } = docx;
  const logoBuf = fs.readFileSync(L('bfouru-horizontal-full-colour-1200w.png'));
  const lr = await ratio(L('bfouru-horizontal-full-colour-1200w.png'));
  const mm = (v) => Math.round(v * 56.6929); // twips
  const ink = H('ink'), muted = H('muted'), accent = H('accentInk');
  const styles = {
    default: { document: { run: { font: BODY, size: 20, color: ink }, paragraph: { spacing: { after: 120, line: 300 } } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', run: { font: HEAD, size: 56, bold: true, color: ink }, paragraph: { spacing: { after: 200, line: 240 } } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', run: { font: HEAD, size: 32, bold: true, color: ink }, paragraph: { spacing: { before: 360, after: 160 } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', run: { font: HEAD, size: 24, bold: true, color: ink }, paragraph: { spacing: { before: 240, after: 100 } } },
      { id: 'Eyebrow', name: 'Eyebrow', basedOn: 'Normal', run: { font: BODY, size: 15, bold: true, color: accent, characterSpacing: 40, allCaps: true }, paragraph: { spacing: { after: 80 } } },
      { id: 'Small', name: 'Small', basedOn: 'Normal', run: { font: BODY, size: 16, color: muted } },
    ],
  };
  const header = () => new Header({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: mm(170) }], children: [new ImageRun({ type: 'png', data: logoBuf, transformation: { width: Math.round(38 * lr / 1.2), height: Math.round(38 / 1.2) } }), new TextRun({ text: `\t${CONTACT.phone}  ·  ${CONTACT.email}`, font: BODY, size: 15, color: muted })] })] });
  const footer = () => new Footer({ children: [new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 4, color: H('paper3'), space: 6 } }, tabStops: [{ type: TabStopType.RIGHT, position: mm(170) }], children: [new TextRun({ text: 'BFourU · One Brand. Multiple Solutions. Complete Support.', size: 14, color: muted }), new TextRun({ text: '\tPage ', size: 14, color: muted }), new TextRun({ children: [PageNumber.CURRENT], size: 14, color: muted })] })] });
  const page = { size: { width: mm(210), height: mm(297) }, margin: { top: mm(32), bottom: mm(24), left: mm(20), right: mm(20), header: mm(12), footer: mm(10) } };
  const P = (text, o = {}) => new Paragraph({ style: o.style, alignment: o.align, children: [new TextRun({ text, bold: o.bold, color: o.color, size: o.size, font: o.font })] });
  const cell = (text, o = {}) => new TableCell({ width: { size: o.w, type: WidthType.PERCENTAGE }, shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined, margins: { top: 100, bottom: 100, left: 120, right: 120 }, borders: { top: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: H('paper3') } }, children: [new Paragraph({ alignment: o.align, children: [new TextRun({ text, bold: o.bold, color: o.color || ink, size: o.size || 19, font: o.font })] })] });
  const table = (head, rows, widths) => new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [new TableRow({ tableHeader: true, children: head.map((t, i) => cell(t, { w: widths[i], fill: ink, color: H('paper'), bold: true, size: 16, align: i >= head.length - 2 ? AlignmentType.RIGHT : undefined })) }), ...rows.map((r) => new TableRow({ children: r.map((t, i) => cell(t, { w: widths[i], align: i >= r.length - 2 ? AlignmentType.RIGHT : undefined })) }))] });
  const save = async (name, children, sectionExtra = {}) => { const doc = new Document({ creator: 'BFourU', title: name, styles, sections: [{ properties: { page }, headers: { default: header() }, footers: { default: footer() }, children, ...sectionExtra }] }); const dir = path.join(OUT, 'documents'); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, `BFourU-${name}.docx`), await Packer.toBuffer(doc)); };

  await save('Letterhead', [P('Date', { style: 'Small' }), P(''), P('Recipient name'), P('Organisation'), P('Address line, City – PIN'), P(''), P('Subject line', { style: 'Heading2' }), P('Dear Recipient,'), P('Write the letter here. Body text is Instrument Sans 10pt on 15pt leading. Keep paragraphs short and leave clear space between them.'), P('Warm regards,'), P(''), P('Name Surname', { style: 'Heading2' }), P('Designation, BFourU', { style: 'Small' })]);
  await save('Proposal', [P('PROPOSAL', { style: 'Eyebrow' }), P('Proposal title for the client', { style: 'Title' }), P('Prepared for: Client name · Date · Reference', { style: 'Small' }), P('1. Understanding your requirements', { style: 'Heading1' }), P('Summarise what the client told you: their business, audience, goals and constraints, in their own terms.'), P('2. Recommended solution', { style: 'Heading1' }), P('Recommend the right mix of services — nothing they don’t need — and explain how they work together.'), table(['Service', 'Deliverables', 'Timeline', 'Notes'], [['Branding & Identity', 'Logo, guidelines, stationery', '3–4 weeks', ''], ['Website & App Development', 'Website with booking', '4–6 weeks', '']], [25, 40, 15, 20]), P('3. Process and approvals', { style: 'Heading1' }), P('Understand · Shape the solution · Plan & design · Review & approve · Execute & deliver · Ongoing support. Nothing goes live without the client’s sign-off — and no clinical content without a doctor’s.'), P('4. Investment', { style: 'Heading1' }), P('Reference the attached quotation. Explain what is included and what is not.'), P('5. Next steps', { style: 'Heading1' }), P('Confirm scope, sign the quotation, share brand assets and access.'), P('Timelines and items above are placeholders — replace them for each proposal.', { style: 'Small' })]);
  await save('Quotation', [P('QUOTATION', { style: 'Eyebrow' }), P('Quotation', { style: 'Title' }), P('Quotation no.: BF-Q-0000 · Date: DD Month YYYY · Valid until: DD Month YYYY', { style: 'Small' }), P('Prepared for: Client name, Organisation, Address', { style: 'Small' }), P(''), table(['#', 'Description', 'Qty', 'Amount (₹)'], [['1', 'Service / deliverable description', '1', '0.00'], ['2', 'Service / deliverable description', '1', '0.00'], ['3', 'Monthly subscription (per month)', '1', '0.00']], [8, 62, 10, 20]), P(''), P('Subtotal: ₹ 0.00    GST (as applicable): ₹ 0.00    Total: ₹ 0.00', { align: AlignmentType.RIGHT, bold: true }), P('Terms', { style: 'Heading2' }), P('Scope, payment schedule, revisions and validity — add the agreed terms here.', { style: 'Small' })]);
  await save('Invoice', [P('TAX INVOICE', { style: 'Eyebrow' }), P('Invoice', { style: 'Title' }), P('Invoice no.: BF-INV-0000 · Date: DD Month YYYY · Due: DD Month YYYY', { style: 'Small' }), P('Billed to: Client name, Organisation, Address, GSTIN', { style: 'Small' }), P('From: BFourU, Office address, GSTIN (to be confirmed)', { style: 'Small' }), P(''), table(['#', 'Description', 'HSN/SAC', 'Qty', 'Amount (₹)'], [['1', 'Description of service', '', '1', '0.00'], ['2', 'Description of service', '', '1', '0.00']], [6, 50, 14, 10, 20]), P(''), P('Taxable value: ₹ 0.00    CGST/SGST or IGST: ₹ 0.00    Total due: ₹ 0.00', { align: AlignmentType.RIGHT, bold: true }), P('Payment details', { style: 'Heading2' }), P('Bank name, account name, account number, IFSC, UPI — to be added by the accounts team.', { style: 'Small' }), P('Tax fields must be checked by your accountant against current GST requirements.', { style: 'Small' })]);
}

(async () => {
  const m = await master();
  const s = await socials();
  await words();
  console.log('master:', path.basename(m)); console.log('social:', s.map((f) => path.basename(f)).join(', ')); console.log('docs:', fs.readdirSync(path.join(OUT, 'documents')).join(', '));
})().catch((e) => { console.error(e); process.exit(1); });
