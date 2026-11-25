/**
 * Generates the BFourU logo system as outlined vector artwork.
 * Construction follows the website logo (src/components/Logo.*):
 *   unit S = logo size; mark = 0.92S square; gap = 0.36S; wordmark = Bricolage Grotesque Bold at 0.8S, tracking −0.035em,
 *   wordmark cap-height optically centred on the mark.
 * Outputs SVG (master), transparent PNG (1×/2×/4×), and a JSON of geometry used by the guidelines.
 */
const fs = require('fs');
const path = require('path');
const opentype = require('opentype.js');
const sharp = require('sharp');
const { C } = require('./brand');

const FONT = path.resolve(__dirname, '../../presentation/fonts/BricolageGrotesque-Bold.ttf');
const OUT = path.resolve(__dirname, '../02-Logo');
const _fb = fs.readFileSync(FONT); const font = opentype.parse(_fb.buffer.slice(_fb.byteOffset, _fb.byteOffset + _fb.length));

/* --- mark (40-unit grid, cells 18, gap 4) --- */
function markPaths(x, y, size) {
  const k = size / 40;
  const P = (d) => d.replace(/-?\d+(\.\d+)?/g, (n, _, i, s) => n); // identity, kept for clarity
  const t = (px, py) => `${(x + px * k).toFixed(3)} ${(y + py * k).toFixed(3)}`;
  const r = 18 * k;
  return {
    tl: `M${t(0, 18)}A${r.toFixed(3)} ${r.toFixed(3)} 0 0 1 ${t(18, 0)}L${t(18, 18)}Z`,
    dot: { cx: x + 31 * k, cy: y + 9 * k, r: 9 * k },
    sq: `M${t(0, 22)}H${(x + 18 * k).toFixed(3)}V${(y + 40 * k).toFixed(3)}H${(x).toFixed(3)}Z`,
    br: `M${t(22, 22)}H${(x + 40 * k).toFixed(3)}A${r.toFixed(3)} ${r.toFixed(3)} 0 0 1 ${t(22, 40)}Z`,
    P,
  };
}

/* --- wordmark outlined --- */
const f3 = (v) => { if (!Number.isFinite(v)) throw new Error('non-finite outline coordinate'); return (Math.round(v * 1000) / 1000).toString(); };
function toD(p) { return p.commands.map((c) => c.type === 'M' || c.type === 'L' ? c.type + f3(c.x) + ' ' + f3(c.y) : c.type === 'Q' ? 'Q' + [c.x1, c.y1, c.x, c.y].map(f3).join(' ') : c.type === 'C' ? 'C' + [c.x1, c.y1, c.x2, c.y2, c.x, c.y].map(f3).join(' ') : 'Z').join(''); }
function wordPath(text, x, baseline, size, tracking = -0.035) {
  const scale = size / font.unitsPerEm;
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  let cx = x;
  const parts = [];
  glyphs.forEach((g, i) => {
    const d = toD(g.getPath(cx, baseline, size));
    parts.push(d);
    let adv = g.advanceWidth * scale + tracking * size;
    if (i < glyphs.length - 1) adv += kern(g, glyphs[i + 1]) * scale;
    cx += adv;
  });
  // measure tight bbox
  const p = new opentype.Path();
  let bx = x;
  glyphs.forEach((g, i) => { const gp = g.getPath(bx, baseline, size); p.extend(gp); bx += g.advanceWidth * scale + tracking * size + (i < glyphs.length - 1 ? kern(g, glyphs[i + 1]) * scale : 0); });
  return { d: parts.join(''), bbox: p.getBoundingBox() };
}
const kern = (a, b) => { try { const v = font.getKerningValue(a, b); return Number.isFinite(v) ? v : 0; } catch { return 0; } };
const capH = font.tables.os2.sCapHeight / font.unitsPerEm; // in em

/* --- compositions (all in a 1000-unit-tall-ish coordinate space) --- */
function horizontal() {
  const S = 100; // logo unit
  const mark = 0.92 * S, gap = 0.36 * S, fs_ = 0.8 * S;
  const markY = 0;
  const baseline = markY + mark / 2 + (capH * fs_) / 2; // cap height centred on mark
  const w = wordPath('BFourU', mark + gap, baseline, fs_);
  const minY = Math.min(0, w.bbox.y1), maxY = Math.max(mark, w.bbox.y2);
  return { mark: { x: 0, y: markY, size: mark }, word: w, width: w.bbox.x2, top: minY, bottom: maxY, unit: S, capHeight: capH * fs_ };
}
function stacked() {
  const fs_ = 80, cap = capH * fs_;
  const mark = cap * 2.6, gap = cap * 0.75;
  const probe = wordPath('BFourU', 0, 0, fs_);
  const ww = probe.bbox.x2 - probe.bbox.x1;
  const width = Math.max(ww, mark);
  const baseline = mark + gap + cap;
  const w = wordPath('BFourU', (width - ww) / 2 - probe.bbox.x1, baseline, fs_);
  return { mark: { x: (width - mark) / 2, y: 0, size: mark }, word: w, width, top: 0, bottom: Math.max(baseline, w.bbox.y2), capHeight: cap };
}
function symbol() { return { mark: { x: 0, y: 0, size: 100 }, word: null, width: 100, top: 0, bottom: 100 }; }
function wordmark() { const w = wordPath('BFourU', 0, 80 * capH, 80); return { mark: null, word: w, width: w.bbox.x2, top: Math.min(0, w.bbox.y1), bottom: w.bbox.y2 }; }

const COLOURWAYS = {
  'full-colour': { base: C.ink.hex, dot: C.accent.hex, bg: null, label: 'Full colour — on light backgrounds' },
  'reversed': { base: C.paper.hex, dot: C.accent.hex, bg: C.ink.hex, label: 'Full colour reversed — on dark backgrounds' },
  'mono-ink': { base: C.ink.hex, dot: C.ink.hex, bg: null, label: 'Monochrome Forest Ink' },
  'mono-paper': { base: C.paper.hex, dot: C.paper.hex, bg: C.ink.hex, label: 'Monochrome Ivory — on dark' },
  'black': { base: '#000000', dot: '#000000', bg: null, label: 'Black — single-colour print, stamps, fax' },
  'white': { base: '#FFFFFF', dot: '#FFFFFF', bg: '#000000', label: 'White — knock-out on photography or dark print' },
};

function svg(comp, cw, pad = 0) {
  const vb = `${(-pad).toFixed(2)} ${(comp.top - pad).toFixed(2)} ${(comp.width + pad * 2).toFixed(2)} ${(comp.bottom - comp.top + pad * 2).toFixed(2)}`;
  const parts = [];
  if (comp.mark) {
    const m = markPaths(comp.mark.x, comp.mark.y, comp.mark.size);
    parts.push(`<path fill="${cw.base}" d="${m.tl}${m.sq}${m.br}"/>`, `<circle fill="${cw.dot}" cx="${m.dot.cx.toFixed(3)}" cy="${m.dot.cy.toFixed(3)}" r="${m.dot.r.toFixed(3)}"/>`);
  }
  if (comp.word) parts.push(`<path fill="${cw.base}" d="${comp.word.d}"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="BFourU">\n<title>BFourU</title>\n${parts.join('\n')}\n</svg>\n`;
}

async function main() {
  const layouts = { horizontal: horizontal(), stacked: stacked(), symbol: symbol(), wordmark: wordmark() };
  for (const d of ['svg', 'png']) fs.mkdirSync(path.join(OUT, d), { recursive: true });
  const index = [];
  for (const [ln, comp] of Object.entries(layouts)) {
    for (const [cn, cw] of Object.entries(COLOURWAYS)) {
      const name = `bfouru-${ln}-${cn}`;
      const s = svg(comp, cw);
      fs.writeFileSync(path.join(OUT, 'svg', name + '.svg'), s);
      const h = comp.bottom - comp.top;
      for (const W of [600, 1200, 2400]) {
        const width = ln === 'symbol' ? Math.round(W / 2) : W;
        await sharp(Buffer.from(s), { density: 300 }).resize({ width }).png().toFile(path.join(OUT, 'png', `${name}-${width}w.png`));
      }
      index.push({ name, layout: ln, colourway: cn, aspect: +(comp.width / h).toFixed(4) });
    }
  }
  fs.writeFileSync(path.join(__dirname, 'logo-geometry.json'), JSON.stringify({ capHeightEm: capH, layouts: Object.fromEntries(Object.entries(layouts).map(([k, v]) => [k, { width: v.width, top: v.top, bottom: v.bottom, mark: v.mark, capHeight: v.capHeight }])), index }, null, 2));

  /* favicon + app icons + social avatars */
  const icon = (size, bg, radius, markColour, dot, scale = 0.62) => {
    const m = size * scale, o = (size - m) / 2, mk = markPaths(o, o, m);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/><path fill="${markColour}" d="${mk.tl}${mk.sq}${mk.br}"/><circle fill="${dot}" cx="${mk.dot.cx}" cy="${mk.dot.cy}" r="${mk.dot.r}"/></svg>`;
  };
  const fav = path.join(OUT, 'favicon-and-app-icons');
  fs.mkdirSync(fav, { recursive: true });
  const favSvg = icon(48, C.ink.hex, 11, C.paper.hex, C.accent.hex, 0.72);
  fs.writeFileSync(path.join(fav, 'favicon.svg'), favSvg);
  const pngs = [];
  for (const sz of [16, 32, 48, 180, 192, 512]) {
    const f = path.join(fav, `icon-${sz}.png`);
    await sharp(Buffer.from(icon(sz * 4, C.ink.hex, sz <= 48 ? sz * 4 * 0.23 : sz * 4 * 0.22, C.paper.hex, C.accent.hex, sz <= 48 ? 0.72 : 0.6)), { density: 300 }).resize(sz).png().toFile(f);
    if (sz <= 48) pngs.push(fs.readFileSync(f));
  }
  // .ico with embedded PNGs (16/32/48)
  const hdr = Buffer.alloc(6 + 16 * pngs.length); hdr.writeUInt16LE(0, 0); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(pngs.length, 4);
  let off = hdr.length; [16, 32, 48].forEach((sz, i) => { const e = 6 + i * 16; hdr.writeUInt8(sz, e); hdr.writeUInt8(sz, e + 1); hdr.writeUInt16LE(1, e + 4); hdr.writeUInt16LE(32, e + 6); hdr.writeUInt32LE(pngs[i].length, e + 8); hdr.writeUInt32LE(off, e + 12); off += pngs[i].length; });
  fs.writeFileSync(path.join(fav, 'favicon.ico'), Buffer.concat([hdr, ...pngs]));

  const soc = path.join(OUT, 'social-profile-icons');
  fs.mkdirSync(soc, { recursive: true });
  // circle-safe avatars: mark sits inside the circular crop with margin
  const avatars = { 'avatar-ink': [C.ink.hex, C.paper.hex], 'avatar-paper': [C.paper.hex, C.ink.hex], 'avatar-persimmon-dot-on-sage': [C.sage.hex, C.ink.hex] };
  for (const [n, [bg, fg]] of Object.entries(avatars)) {
    const s = icon(1080, bg, 0, fg, C.accent.hex, 0.46);
    fs.writeFileSync(path.join(soc, n + '.svg'), s);
    await sharp(Buffer.from(s)).resize(1080).png().toFile(path.join(soc, n + '-1080.png'));
  }
  console.log('logos:', index.length, 'svg;', fs.readdirSync(path.join(OUT, 'png')).length, 'png');
}
main().catch((e) => { console.error(e); process.exit(1); });
