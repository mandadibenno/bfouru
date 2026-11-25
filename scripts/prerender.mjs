/**
 * Static prerender: renders every route to real HTML (content + per-page <head>)
 * so search engines, link previews and slow connections get a complete page
 * before JavaScript loads. The client then hydrates.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// Preload the two above-the-fold fonts (Latin subsets) so headlines render in the brand face immediately.
const assets = fs.readdirSync(path.join(dist, 'assets'));
const preloads = [/^bricolage-grotesque-latin-opsz-normal-.*\.woff2$/, /^instrument-sans-latin-wght-normal-.*\.woff2$/]
  .map((re) => assets.find((a) => re.test(a)))
  .filter(Boolean)
  .map((a) => `<link rel="preload" href="/assets/${a}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');
template = template.replace('<!--app-head-->', `${preloads}\n    <!--app-head-->`);
const { render, routes } = await import(pathToFileURL(serverEntry).href);

const siteUrl = (process.env.VITE_SITE_URL || 'https://www.bfouru.com').replace(/\/$/, '');
const indexable = [];

for (const url of routes) {
  const { html, head, noindex } = render(url);
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);

  let file;
  if (url === '/404') file = path.join(dist, '404.html');
  else if (url === '/') file = path.join(dist, 'index.html');
  else file = path.join(dist, url.replace(/^\//, ''), 'index.html');

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
  // Also write /route.html so hosts that resolve "/route" → "route.html" (and `vite preview`) serve the right page.
  if (url !== '/' && url !== '/404') fs.writeFileSync(path.join(dist, `${url.replace(/^\//, '')}.html`), page);
  if (!noindex) indexable.push(url);
  console.log(`  prerendered ${url.padEnd(44)} → ${path.relative(root, file)}`);
}

// sitemap.xml + robots.txt
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (u) =>
      `  <url><loc>${siteUrl}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><priority>${
        u === '/' ? '1.0' : u.split('/').length > 2 ? '0.7' : '0.8'
      }</priority></url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
console.log(`\n✓ ${routes.length} pages prerendered, sitemap.xml and robots.txt written.`);
