/** Render Office files → PDF (LibreOffice) → PNG pages (pdf.js in headless Chrome). Usage: node render-office.js file1 file2 ... */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');
const { launch } = require('./cdp');

(async () => {
  const files = process.argv.slice(2).map((f) => path.resolve(f));
  const pdfDir = path.join(__dirname, 'office-pdf'); const pngDir = path.join(__dirname, 'previews', 'office');
  fs.mkdirSync(pdfDir, { recursive: true }); fs.mkdirSync(pngDir, { recursive: true });
  for (const f of files) execFileSync('C:/Program Files/LibreOffice/program/soffice.exe', ['--headless', '--convert-to', 'pdf', '--outdir', pdfDir, f], { stdio: 'ignore' });
  const html = path.join(__dirname, 'office-pdf', '_r.html');
  fs.writeFileSync(html, `<!doctype html><script type="module">import * as pdfjs from '${pathToFileURL(path.resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.mjs')).href}';
pdfjs.GlobalWorkerOptions.workerSrc = '${pathToFileURL(path.resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.mjs')).href}';
window.render = async (url, long) => { const doc = await pdfjs.getDocument({ url }).promise; const out = [];
 for (let i = 1; i <= doc.numPages; i++) { const p = await doc.getPage(i); const v = p.getViewport({ scale: 1 }); const vp = p.getViewport({ scale: long / Math.max(v.width, v.height) }); const c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height; await p.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise; out.push(c.toDataURL('image/png')); } return out; };</script>`);
  const b = await launch();
  try {
    await b.open(html);
    for (const f of files) {
      const pdf = path.join(pdfDir, path.basename(f).replace(/\.(pptx|docx)$/, '.pdf'));
      const pages = await b.eval(`window.render('${pathToFileURL(pdf).href}', 1600)`);
      pages.forEach((d, i) => fs.writeFileSync(path.join(pngDir, `${path.basename(f).replace(/\.(pptx|docx)$/, '')}-${String(i + 1).padStart(2, '0')}.png`), Buffer.from(d.split(',')[1], 'base64')));
      console.log(path.basename(f), pages.length, 'pages');
    }
  } finally { b.close(); }
})();
