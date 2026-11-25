/** Contact sheet: node sheet.cjs out.jpg tileHeight img1.png img2.png ... (headless Chrome) */
const fs = require('fs'); const path = require('path'); const os = require('os');
const { spawn } = require('child_process'); const { pathToFileURL } = require('url');
const [out, tileH, ...files] = process.argv.slice(2);
(async () => {
  const html = path.join(os.tmpdir(), `sheet-${Date.now()}.html`);
  fs.writeFileSync(html, `<body style="margin:0;padding:16px;background:#777;display:flex;flex-wrap:wrap;gap:16px;width:2400px">${files.map((f) => `<img src="${pathToFileURL(path.resolve(f)).href}" style="height:${tileH}px">`).join('')}</body>`);
  const port = 9800 + Math.floor(Math.random() * 100);
  const proc = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-'))}`, '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank']);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); let ws;
  for (let i = 0; i < 80 && !ws; i++) { try { const p = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch {} await sleep(250); }
  if (ws.readyState !== 1) await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pend = new Map(); ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); pend.get(m.id)?.(m); });
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Emulation.setDeviceMetricsOverride', { width: 2432, height: 800, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: pathToFileURL(html).href }); await sleep(2000);
  const h = (await send('Runtime.evaluate', { expression: 'document.body.scrollHeight', returnByValue: true })).result.result.value;
  const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85, captureBeyondViewport: true, clip: { x: 0, y: 0, width: 2432, height: h, scale: 1 } });
  fs.writeFileSync(out, Buffer.from(r.result.data, 'base64')); ws.close(); proc.kill(); fs.rmSync(html);
})();
