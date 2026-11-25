/**
 * Generates a branded 1200×630 social-share image (Open Graph) for every indexable page into public/og/.
 * Run after `npm run build` (it reads the prerendered pages in dist/), then rebuild so the images are copied:
 *   npm run build && node scripts/og-images.mjs && npm run build
 * Requires Google Chrome (local only — the generated PNGs are committed, so CI doesn't need Chrome).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const outDir = path.join(root, 'public', 'og');
const brand = path.join(root, 'brand');
const font = (pkg, f) => pathToFileURL(path.join(root, 'node_modules/@fontsource-variable', pkg, 'files', f)).href;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const urls = [...fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>[^<]*?(\/[^<]*)<\/loc>/g)].map((m) => new URL(m[0].replace(/<\/?loc>/g, '')).pathname);
const text = (html, re) =>
  (html.match(re)?.[1] ?? '')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/\.(?=[A-Z])/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
const svg = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8').replace(/<\?xml.*?\?>/, '').replace(/<title>.*?<\/title>/s, '') : '');
const glyphFor = (p, tone) => {
  const slug = p.startsWith('/services/') ? p.split('/')[2] : null;
  if (slug) return svg(path.join(brand, '06-Icons-and-Graphics/service-glyphs', `${slug}${tone === 'ink' ? '-reversed' : ''}.svg`));
  return svg(path.join(brand, `02-Logo/svg/bfouru-symbol-${tone === 'ink' ? 'reversed' : 'full-colour'}.svg`));
};
const sections = { '/services': 'Services', '/healthcare': 'Healthcare', '/approach': 'How we work', '/contact': 'Contact', '/insights': 'Insights', '/privacy': 'Privacy' };

const cards = urls.map((p) => {
  const file = p === '/' ? 'index.html' : `${p.slice(1)}/index.html`;
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  const h1 = text(html, /<h1[^>]*>([\s\S]*?)<\/h1>/);
  const healthcare = /healthcare|patient|opd|clinic|nmc/.test(p);
  const section = p === '/' ? 'Creative · Digital · Technology' : p.startsWith('/services/') ? 'Services' : p.startsWith('/insights/') ? 'Insights' : sections[p] ?? 'BFourU';
  const tone = p === '/' || p === '/contact' ? 'ink' : healthcare ? 'sage' : 'paper';
  return { p, name: p === '/' ? 'home' : p.slice(1).replace(/\//g, '-'), h1: h1.replace(/\.$/, ''), section, tone, glyph: glyphFor(p, tone) };
});

const logo = (tone) => svg(path.join(brand, `02-Logo/svg/bfouru-horizontal-${tone === 'ink' ? 'reversed' : 'full-colour'}.svg`));
const page = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:BG;src:url(${font('bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2')});font-weight:200 800}
@font-face{font-family:IS;src:url(${font('instrument-sans', 'instrument-sans-latin-wght-normal.woff2')});font-weight:400 700}
*{margin:0;box-sizing:border-box}body{background:#777}
.c{width:1200px;height:630px;position:relative;overflow:hidden;font-family:IS,Arial,sans-serif;color:#10211C;background:#F3EFE7}
.c.ink{background:#10211C;color:#F3EFE7}.c.sage{background:#D3DFD3}
.eb{position:absolute;left:72px;top:64px;font-size:20px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;display:flex;align-items:center;gap:12px;color:#33433D}
.ink .eb{color:#A9B5AF}.eb:before{content:'';width:10px;height:10px;border-radius:50%;background:#E4572E}.sage .eb:before{background:#1E6B58}
.h{position:absolute;left:72px;top:130px;width:760px;font-family:BG,Arial,sans-serif;font-weight:700;letter-spacing:-.035em;line-height:.98}
.h i{font-style:normal;color:#E4572E}
.g{position:absolute;right:72px;top:150px;width:250px;height:250px}.g svg{width:100%;height:100%}
.f{position:absolute;left:72px;right:72px;bottom:56px;display:flex;justify-content:space-between;align-items:center;font-size:20px;font-weight:600;color:#5A6862}.ink .f{color:#A9B5AF}
.f svg{height:40px;width:auto}
</style>${cards.map((c, i) => `<div class="c ${c.tone}" id="c${i}"><div class="eb">${c.section}</div><div class="h" style="font-size:${c.h1.length > 70 ? 54 : c.h1.length > 44 ? 64 : 78}px">${c.h1}<i>.</i></div><div class="g">${c.glyph}</div><div class="f">${logo(c.tone)}<span>bfouru.com</span></div></div>`).join('')}`;

const tmp = path.join(os.tmpdir(), `og-${Date.now()}.html`);
fs.writeFileSync(tmp, page);
fs.mkdirSync(outDir, { recursive: true });

const port = 9400 + Math.floor(Math.random() * 400);
const proc = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-'))}`, '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank']);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
for (let i = 0; i < 80 && !ws; i++) {
  try {
    const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === 'page');
    if (t) ws = new WebSocket(t.webSocketDebuggerUrl);
  } catch {}
  await sleep(250);
}
if (ws.readyState !== 1) await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pend = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); pend.get(m.id)?.(m); });
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
try {
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: pathToFileURL(tmp).href });
  await sleep(2000);
  await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(()=>1)', awaitPromise: true });
  for (let i = 0; i < cards.length; i++) {
    const y = (await send('Runtime.evaluate', { expression: `document.getElementById('c${i}').getBoundingClientRect().top + scrollY`, returnByValue: true })).result.result.value;
    const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y, width: 1200, height: 630, scale: 1 } });
    fs.writeFileSync(path.join(outDir, `${cards[i].name}.png`), Buffer.from(r.result.data, 'base64'));
  }
  console.log(`✓ ${cards.length} Open Graph images written to public/og/`);
} finally {
  ws.close();
  proc.kill();
  fs.rmSync(tmp, { force: true });
}
