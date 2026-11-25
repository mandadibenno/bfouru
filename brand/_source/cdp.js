/** Minimal headless-Chrome (CDP) helper used to render PDFs and PNG previews from HTML sources. */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

async function launch() {
  const port = 9100 + Math.floor(Math.random() * 600);
  const proc = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-'))}`, '--no-first-run', '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank']);
  proc.stdout.on('data', () => {}); proc.stderr.on('data', () => {});
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let ws;
  for (let i = 0; i < 80 && !ws; i++) { try { const p = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch {} await sleep(250); }
  if (!ws) throw new Error('Chrome did not start');
  if (ws.readyState !== 1) await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pend = new Map();
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Page.enable'); await send('Runtime.enable');
  const api = {
    send, sleep,
    async open(file, w = 1600, h = 1000, scale = 1) {
      await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: scale, mobile: false });
      await send('Page.navigate', { url: file.startsWith('http') ? file : pathToFileURL(path.resolve(file)).href });
      await sleep(1500);
      await api.eval('document.fonts.ready.then(() => true)');
    },
    async eval(expr) { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400)); return r.result.result.value; },
    async pdf(out, opts) { const r = await send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, ...opts }); fs.writeFileSync(out, Buffer.from(r.result.data, 'base64')); },
    async png(out, clip, opts = {}) { const r = await send('Page.captureScreenshot', { format: out.endsWith('.jpg') ? 'jpeg' : 'png', quality: out.endsWith('.jpg') ? 88 : undefined, captureBeyondViewport: true, clip: { ...clip, scale: clip.scale || 1 }, ...opts }); fs.writeFileSync(out, Buffer.from(r.result.data, 'base64')); },
    async transparent() { await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } }); },
    close() { try { ws.close(); } catch {} proc.kill(); },
  };
  return api;
}
module.exports = { launch };
