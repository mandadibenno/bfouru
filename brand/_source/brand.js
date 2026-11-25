/**
 * BFourU brand constants — the single source of truth for the brand package.
 * Values come from the website design system (src/styles/global.css) and the healthcare deck.
 */
const C = {
  // core
  ink: { hex: '#10211C', name: 'Forest Ink', role: 'Primary — text, dark surfaces, primary buttons' },
  paper: { hex: '#F3EFE7', name: 'Ivory Paper', role: 'Primary — main background' },
  accent: { hex: '#E4572E', name: 'Persimmon', role: 'Signature accent — the mark’s dot, highlights, large accents' },
  // supporting
  teal: { hex: '#1E6B58', name: 'Care Teal', role: 'Secondary — healthcare accent, success, links on light' },
  sage: { hex: '#D3DFD3', name: 'Sage', role: 'Secondary surface — healthcare and calm sections' },
  marigold: { hex: '#E9B44C', name: 'Marigold', role: 'Tertiary — illustrations, editorial italics on dark' },
  tealDark: { hex: '#0F2B25', name: 'Deep Teal', role: 'Illustration and screen surfaces' },
  // neutrals
  white: { hex: '#FBF8F2', name: 'Warm White', role: 'Cards and documents on paper' },
  paper2: { hex: '#EAE4D8', name: 'Sand', role: 'Raised surfaces and alternating bands' },
  paper3: { hex: '#DED6C6', name: 'Stone', role: 'Borders, chips, dividers' },
  ink2: { hex: '#33433D', name: 'Ink 80', role: 'Secondary text' },
  muted: { hex: '#5A6862', name: 'Ink 60', role: 'Tertiary text, captions (on light only)' },
  onInkMuted: { hex: '#A9B5AF', name: 'Mist', role: 'Secondary text on Forest Ink' },
  accentInk: { hex: '#A63A1B', name: 'Persimmon Deep', role: 'Accent for small text on light backgrounds' },
};

const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
/** Naive device-independent RGB→CMYK. Approximate only — final values must be proofed with the printer. */
function rgbToCmyk([r, g, b]) {
  const R = r / 255, G = g / 255, B = b / 255;
  const k = 1 - Math.max(R, G, B);
  if (k >= 1) return [0, 0, 0, 100];
  const c = (1 - R - k) / (1 - k), m = (1 - G - k) / (1 - k), y = (1 - B - k) / (1 - k);
  return [c, m, y, k].map((v) => Math.round(v * 100));
}
function lum(h) {
  return hexToRgb(h).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
}
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

for (const k of Object.keys(C)) { C[k].rgb = hexToRgb(C[k].hex); C[k].cmyk = rgbToCmyk(C[k].rgb); C[k].token = '--bf-' + k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()); }

const FONTS = {
  display: { family: 'Bricolage Grotesque', fallback: '"Arial Narrow", Arial, "Helvetica Neue", sans-serif', office: 'Arial', license: 'SIL Open Font License 1.1' },
  text: { family: 'Instrument Sans', fallback: '"Segoe UI", Roboto, Arial, sans-serif', office: 'Calibri', license: 'SIL Open Font License 1.1' },
  serif: { family: 'Newsreader', fallback: 'Georgia, "Times New Roman", serif', office: 'Georgia', license: 'SIL Open Font License 1.1' },
};

const CONTACT = { phone: '+91 91829 70829', whatsapp: '+91 91829 70829', email: 'pramod.pramod.949@gmail.com', web: 'www.bfouru.com' };

module.exports = { C, FONTS, CONTACT, contrast, hexToRgb, rgbToCmyk };
