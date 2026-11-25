/** Design tokens (CSS + JSON), colour specification sheet, service glyph icons and pattern tiles. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { C, FONTS, contrast } = require('./brand');

const ROOT = path.resolve(__dirname, '..');
const mk = (p) => (fs.mkdirSync(path.join(ROOT, p), { recursive: true }), path.join(ROOT, p));

/* ---------------- tokens ---------------- */
const tokens = {
  $schema: 'BFourU design tokens v1.0 — source: website src/styles/global.css',
  color: Object.fromEntries(Object.entries(C).map(([k, v]) => [k, { value: v.hex, rgb: v.rgb, cmykApprox: v.cmyk, name: v.name, usage: v.role }])),
  font: {
    display: { value: FONTS.display.family, fallback: FONTS.display.fallback, weights: [400, 600, 700] },
    text: { value: FONTS.text.family, fallback: FONTS.text.fallback, weights: [400, 500, 600, 700] },
    serifAccent: { value: FONTS.serif.family, style: 'italic', fallback: FONTS.serif.fallback, weights: [400] },
  },
  fontSize: {
    displayXL: { value: 'clamp(3.1rem, 1.55rem + 6.9vw, 8rem)', print: '64–120pt' },
    displayL: { value: 'clamp(2.6rem, 1.6rem + 4.4vw, 5.25rem)', print: '48–72pt' },
    h2: { value: 'clamp(2.1rem, 1.45rem + 2.9vw, 3.75rem)', print: '32–44pt' },
    h3: { value: 'clamp(1.35rem, 1.15rem + 0.9vw, 1.9rem)', print: '18–24pt' },
    h4: { value: 'clamp(1.125rem, 1.05rem + 0.35vw, 1.3rem)', print: '14–16pt' },
    lead: { value: 'clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)', print: '13–16pt' },
    body: { value: 'clamp(1rem, 0.98rem + 0.1vw, 1.0625rem)', print: '9.5–11pt' },
    small: { value: '0.875rem', print: '8–9pt' },
    eyebrow: { value: '0.75rem', print: '7–8pt, uppercase, +140 tracking' },
  },
  lineHeight: { display: 0.92, heading: 1.02, body: 1.6, lead: 1.5 },
  letterSpacing: { displayXL: '-0.045em', display: '-0.035em', heading: '-0.02em', body: '0', eyebrow: '0.14em' },
  space: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '24px', 6: '32px', 7: '48px', 8: '64px', 9: '96px', 10: '128px', section: 'clamp(4.5rem, 3rem + 7vw, 10rem)', gutter: 'clamp(1rem, 4vw, 3.5rem)' },
  layout: { maxWidth: '1440px', columns: { desktop: 12, tablet: 6, mobile: 4 }, gap: 'clamp(1rem, 0.6rem + 1.6vw, 2rem)' },
  radius: { sm: '10px', md: '16px', lg: '28px', pill: '999px' },
  shadow: { lift: '0 1px 0 rgba(16,33,28,.04), 0 12px 32px -12px rgba(16,33,28,.22)', panel: '0 30px 80px -30px rgba(16,33,28,.35)' },
  motion: {
    easeStandard: { value: 'cubic-bezier(0.2, 0.7, 0.1, 1)' },
    easeOut: { value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    durationFeedback: { value: '180ms' },
    durationShort: { value: '320ms' },
    durationReveal: { value: '700ms' },
    durationScene: { value: '1100ms' },
    stagger: { value: '60ms' },
    revealDistance: { value: '28px' },
  },
};
const T = mk('05-Design-Tokens');
fs.writeFileSync(path.join(T, 'bfouru-tokens.json'), JSON.stringify(tokens, null, 2));
const css = [
  '/* BFourU design tokens v1.0 — generated from the brand source. Do not edit by hand. */',
  ':root {',
  ...Object.entries(C).map(([k, v]) => `  ${v.token}: ${v.hex}; /* ${v.name} — ${v.role} */`),
  `  --bf-font-display: '${FONTS.display.family}', ${FONTS.display.fallback};`,
  `  --bf-font-text: '${FONTS.text.family}', ${FONTS.text.fallback};`,
  `  --bf-font-serif: '${FONTS.serif.family}', ${FONTS.serif.fallback};`,
  ...Object.entries(tokens.fontSize).map(([k, v]) => `  --bf-fs-${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}: ${v.value};`),
  ...Object.entries(tokens.space).map(([k, v]) => `  --bf-space-${k}: ${v};`),
  ...Object.entries(tokens.radius).map(([k, v]) => `  --bf-radius-${k}: ${v};`),
  `  --bf-shadow-lift: ${tokens.shadow.lift};`,
  `  --bf-shadow-panel: ${tokens.shadow.panel};`,
  `  --bf-ease: ${tokens.motion.easeStandard.value};`,
  `  --bf-ease-out: ${tokens.motion.easeOut.value};`,
  `  --bf-dur-feedback: ${tokens.motion.durationFeedback.value};`,
  `  --bf-dur-short: ${tokens.motion.durationShort.value};`,
  `  --bf-dur-reveal: ${tokens.motion.durationReveal.value};`,
  `  --bf-dur-scene: ${tokens.motion.durationScene.value};`,
  `  --bf-max-width: ${tokens.layout.maxWidth};`,
  `  --bf-gutter: ${tokens.space.gutter};`,
  '}',
  '',
  '@media (prefers-reduced-motion: reduce) {',
  '  :root { --bf-dur-reveal: 0.001ms; --bf-dur-scene: 0.001ms; --bf-dur-short: 0.001ms; }',
  '}',
  '',
].join('\n');
fs.writeFileSync(path.join(T, 'bfouru-tokens.css'), css);

/* ---------------- colour spec + contrast matrix ---------------- */
const CL = mk('03-Colour');
const pairs = [['ink', 'paper'], ['ink2', 'paper'], ['muted', 'paper'], ['muted', 'paper2'], ['accentInk', 'paper'], ['accentInk', 'paper2'], ['teal', 'paper'], ['teal', 'sage'], ['ink', 'sage'], ['ink', 'accent'], ['paper', 'ink'], ['onInkMuted', 'ink'], ['accent', 'ink'], ['marigold', 'ink'], ['accent', 'paper'], ['paper', 'accent'], ['paper', 'teal']];
const matrix = pairs.map(([f, b]) => { const r = contrast(C[f].hex, C[b].hex); return { fg: f, bg: b, ratio: +r.toFixed(2), normalText: r >= 4.5 ? 'AA' : 'fail', largeText: r >= 3 ? 'AA' : 'fail' }; });
fs.writeFileSync(path.join(CL, 'contrast-matrix.json'), JSON.stringify(matrix, null, 2));
const row = (k) => { const v = C[k]; return `| ${v.name} | \`${v.hex}\` | ${v.rgb.join(', ')} | ${v.cmyk.join(' / ')} | \`${v.token}\` | ${v.role} |`; };
fs.writeFileSync(path.join(CL, 'BFourU-Colour-Specification.md'), `# BFourU Colour Specification

All colours are defined in sRGB (screen). **CMYK values are mathematical approximations** (uncoated/coated not specified) for briefing only. Before any print run, ask the printer for a **physical proof** and adjust to their press profile (e.g. FOGRA39 coated / FOGRA29 uncoated). For signage and paint, match against a physical swatch book; no Pantone references are given because they must be confirmed visually against a printed guide.

| Name | HEX | RGB | CMYK (approx.) | CSS token | Role |
|---|---|---|---|---|---|
${['ink', 'paper', 'accent'].map(row).join('\n')}
| **Supporting** | | | | | |
${['teal', 'sage', 'marigold', 'tealDark'].map(row).join('\n')}
| **Neutrals & functional** | | | | | |
${['white', 'paper2', 'paper3', 'ink2', 'muted', 'onInkMuted', 'accentInk'].map(row).join('\n')}

## Proportion
Ivory Paper 60% · Forest Ink 25% · Sand/Stone neutrals 8% · Persimmon 5% · Teal/Sage/Marigold 2% (rising to ~15% sage/teal on healthcare material).

## Contrast (WCAG 2.2)
| Foreground on background | Ratio | Normal text | Large text (≥ 24px / 19px bold) |
|---|---|---|---|
${matrix.map((m) => `| ${C[m.fg].name} on ${C[m.bg].name} | ${m.ratio}:1 | ${m.normalText} | ${m.largeText} |`).join('\n')}

**Rules:** Persimmon is never used for body text on light backgrounds (use Persimmon Deep). Ink 60 is not used on Sage for small text. Ivory on Persimmon is for large display type and graphics only.
`);

/* ---------------- glyph icons ---------------- */
const G = mk('06-Icons-and-Graphics/service-glyphs');
const cell = (t, x, y, fill) => {
  const T = `translate(${x} ${y})`;
  return {
    sq: `<rect transform="${T}" width="18" height="18" fill="${fill}"/>`, ci: `<circle transform="${T}" cx="9" cy="9" r="9" fill="${fill}"/>`, dot: `<circle transform="${T}" cx="9" cy="9" r="4.5" fill="${fill}"/>`,
    ring: `<circle transform="${T}" cx="9" cy="9" r="7" fill="none" stroke="${fill}" stroke-width="4"/>`,
    tl: `<path transform="${T}" d="M0 18A18 18 0 0 1 18 0V18Z" fill="${fill}"/>`, tr: `<path transform="${T}" d="M0 0A18 18 0 0 1 18 18H0Z" fill="${fill}"/>`,
    br: `<path transform="${T}" d="M18 0A18 18 0 0 1 0 18V0Z" fill="${fill}"/>`, bl: `<path transform="${T}" d="M18 18A18 18 0 0 1 0 0H18Z" fill="${fill}"/>`,
    ph: `<rect transform="${T}" y="4.5" width="18" height="9" rx="4.5" fill="${fill}"/>`, pv: `<rect transform="${T}" x="4.5" width="9" height="18" rx="4.5" fill="${fill}"/>`, em: '',
  }[t];
};
const glyphs = {
  'brand-mark': [['tl', 'ci', 'sq', 'br'], 1], 'branding-identity': [['tl', 'ci', 'sq', 'br'], 1], 'creative-design': [['ci', 'tr', 'bl', 'sq'], 0], 'photography-media': [['ring', 'sq', 'sq', 'ci'], 0],
  'digital-marketing': [['sq', 'tr', 'dot', 'ci'], 3], 'website-app-development': [['ph', 'dot', 'sq', 'sq'], 1], 'smart-automation': [['ci', 'em', 'ring', 'ci'], 0],
  'clinic-management-software': [['sq', 'ph', 'ph', 'sq'], 3], 'opd-tv-displays': [['sq', 'sq', 'ph', 'dot'], 3], 'it-technical-solutions': [['ring', 'ring', 'ring', 'ci'], 3],
  'interior-branding-signage': [['tr', 'sq', 'sq', 'bl'], 0], 'printing-production': [['sq', 'sq', 'sq', 'tl'], 3], 'customized-merchandise': [['br', 'bl', 'tr', 'tl'], 2],
  'events-conferences': [['pv', 'ci', 'pv', 'pv'], 1], 'patient-education': [['dot', 'ring', 'sq', 'tl'], 1],
};
const pos = [[0, 0], [22, 0], [0, 22], [22, 22]];
const glyphSvg = (cells, acc, base, accent) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${cells.map((c, i) => cell(c, pos[i][0], pos[i][1], i === acc ? accent : base)).join('')}</svg>\n`;
(async () => {
  for (const [n, [cells, acc]] of Object.entries(glyphs)) {
    fs.writeFileSync(path.join(G, `${n}.svg`), glyphSvg(cells, acc, C.ink.hex, C.accent.hex));
    fs.writeFileSync(path.join(G, `${n}-reversed.svg`), glyphSvg(cells, acc, C.paper.hex, C.accent.hex));
    await sharp(Buffer.from(glyphSvg(cells, acc, C.ink.hex, C.accent.hex)), { density: 600 }).resize(512).png().toFile(path.join(G, `${n}-512.png`));
  }
  fs.writeFileSync(path.join(ROOT, '_source/glyphs.json'), JSON.stringify(glyphs));

  /* primitives + pattern */
  const P = mk('06-Icons-and-Graphics/primitives-and-patterns');
  for (const t of ['sq', 'ci', 'ring', 'tl', 'tr', 'br', 'bl', 'ph', 'pv', 'dot']) fs.writeFileSync(path.join(P, `primitive-${t}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">${cell(t, 0, 0, C.ink.hex)}</svg>\n`);
  const tile = (bg, fg, acc) => {
    const seq = Object.values(glyphs).map((g) => g);
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><rect width="320" height="320" fill="${bg}"/>`;
    let i = 0;
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { const [cells, a] = seq[(i++ * 5) % seq.length]; s += `<g transform="translate(${x * 80 + 20} ${y * 80 + 20})">${cells.map((c, k) => cell(c, pos[k][0], pos[k][1], k === a && (x + y) % 3 === 0 ? acc : fg)).join('')}</g>`; }
    return s + '</svg>\n';
  };
  fs.writeFileSync(path.join(P, 'pattern-glyph-grid-paper.svg'), tile(C.paper.hex, C.paper3.hex, C.accent.hex));
  fs.writeFileSync(path.join(P, 'pattern-glyph-grid-ink.svg'), tile(C.ink.hex, '#1E302A', C.accent.hex));
  fs.writeFileSync(path.join(P, 'pattern-glyph-grid-sage.svg'), tile(C.sage.hex, '#C2D1C3', C.teal.hex));
  fs.writeFileSync(path.join(P, 'paper-grain.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .9 0"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity=".05"/></svg>\n`);
  console.log('tokens, colour spec, glyphs:', Object.keys(glyphs).length);
})();
