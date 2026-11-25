/**
 * Print & corporate identity templates. Each sheet is designed at physical size (mm) with 3mm bleed where it
 * prints to the edge. Outputs: print-ready PDF per item + PNG previews (trim area) for the guidelines.
 */
const fs = require('fs');
const path = require('path');
const { launch } = require('./cdp');
const { CONTACT } = require('./brand');

const LOGO = path.resolve(__dirname, '../02-Logo/svg');
const logo = (name, h, extra = '') => fs.readFileSync(path.join(LOGO, `bfouru-${name}.svg`), 'utf8').replace(/<title>.*?<\/title>/, '').replace('<svg ', `<svg style="height:${h};width:auto;${extra}" `);

const PH = { name: 'Name Surname', role: 'Designation', addr: 'Office address line, City – PIN', id: 'BF-0000' };
const contactLines = (sz, col = 'var(--ink)') => `
  <div style="display:grid;gap:${sz * 0.55}pt;font-size:${sz}pt;color:${col}">
    <div><span class="eb" style="font-size:${sz * 0.72}pt;opacity:.7;margin-right:2mm">T</span>${CONTACT.phone}</div>
    <div><span class="eb" style="font-size:${sz * 0.72}pt;opacity:.7;margin-right:2mm">E</span>${CONTACT.email}</div>
    <div><span class="eb" style="font-size:${sz * 0.72}pt;opacity:.7;margin-right:2mm">W</span>${CONTACT.web}</div>
  </div>`;

const sheets = [];
const S = (id, w, h, bg, inner, opts = {}) => sheets.push({ id, w, h, bg, inner, bleed: opts.bleed !== false, group: opts.group || id, file: opts.file || id });

/* ---------- business card 90×55 ---------- */
S('business-card-front', 90, 55, 'var(--ink)', `
  <div style="position:absolute;left:7mm;top:7mm">${logo('horizontal-reversed', '7.5mm')}</div>
  <div style="position:absolute;right:-14mm;bottom:-16mm;opacity:1">${logo('symbol-reversed', '52mm')}</div>
  <div style="position:absolute;left:7mm;bottom:6.5mm;font-size:6.3pt;color:var(--mist);line-height:1.5">One Brand. Multiple Solutions.<br>Complete Support.</div>`, { group: 'business-card', file: 'business-card' });
S('business-card-back', 90, 55, 'var(--white)', `
  <div style="position:absolute;right:7mm;top:7mm">${logo('symbol-full-colour', '7mm')}</div>
  <div style="position:absolute;left:7mm;top:7mm">
    <div class="d" style="font-size:13pt">${PH.name}</div>
    <div style="font-size:7pt;color:var(--muted);margin-top:1.4mm">${PH.role}</div>
  </div>
  <div style="position:absolute;left:7mm;bottom:6.5mm">${contactLines(6.6)}</div>`, { group: 'business-card', file: 'business-card' });

/* ---------- letterhead A4 (office-printable: no bleed elements) ---------- */
S('letterhead', 210, 297, '#FFFFFF', `
  <div style="position:absolute;left:20mm;top:17mm">${logo('horizontal-full-colour', '10mm')}</div>
  <div style="position:absolute;right:20mm;top:16mm;text-align:right;font-size:7.8pt;line-height:1.55;color:var(--ink2)">${CONTACT.phone}<br>${CONTACT.email}<br>${CONTACT.web}</div>
  <div style="position:absolute;left:20mm;right:20mm;top:52mm;font-size:10pt;line-height:1.6;color:var(--ink)">
    <p style="color:var(--muted)">24 November 2026</p><br>
    <p>Recipient name<br>Organisation<br>Address line, City – PIN</p><br>
    <p class="d" style="font-size:14pt;letter-spacing:-0.02em">Subject line set in Bricolage Grotesque</p><br>
    <p>Dear Recipient,</p><br>
    <p>Body text is set in Instrument Sans at 10pt on 16pt leading, left aligned, with a 20mm margin on both sides. Keep paragraphs short and leave a clear line between them. The letterhead is designed for office printers, so nothing prints to the edge of the page.</p><br>
    <p>Sign off with the sender’s name and role. Use Persimmon only for a single highlight, never for body text.</p><br>
    <p>Warm regards,</p><br><br>
    <p class="d" style="font-size:11pt;letter-spacing:-0.02em">${PH.name}</p><p style="color:var(--muted)">${PH.role}, BFourU</p>
  </div>
  <div style="position:absolute;left:20mm;right:20mm;bottom:14mm;border-top:0.25mm solid var(--paper3);padding-top:3mm;display:flex;justify-content:space-between;font-size:7.2pt;color:var(--muted)">
    <span>BFourU · Creative · Digital · Technology</span><span>${PH.addr}</span>
  </div>`, { bleed: false });

/* ---------- envelope DL 220×110 ---------- */
S('envelope-dl', 220, 110, '#FFFFFF', `
  <div style="position:absolute;left:14mm;top:12mm">${logo('horizontal-full-colour', '8mm')}</div>
  <div style="position:absolute;left:14mm;top:24mm;font-size:7pt;color:var(--muted);line-height:1.5">${PH.addr}<br>${CONTACT.web}</div>
  <div style="position:absolute;right:-6mm;bottom:-8mm">${logo('symbol-mono-ink', '34mm', 'opacity:.06')}</div>`, { bleed: false });

/* ---------- ID card CR80 54×85.6 portrait ---------- */
S('id-card-front', 54, 85.6, 'var(--white)', `
  <div style="position:absolute;left:-3mm;right:-3mm;top:-3mm;height:35mm;background:var(--ink)"></div>
  <div style="position:absolute;left:6mm;top:6mm">${logo('horizontal-reversed', '5.4mm')}</div>
  <div style="position:absolute;left:50%;top:20mm;width:24mm;height:24mm;margin-left:-12mm;border-radius:50%;background:var(--paper2);border:1mm solid var(--white);display:grid;place-items:center;font-size:5.5pt;color:var(--muted)">PHOTO</div>
  <div style="position:absolute;left:5mm;right:5mm;top:48mm;text-align:center">
    <div class="d" style="font-size:11pt">${PH.name}</div>
    <div style="font-size:6.5pt;color:var(--muted);margin-top:1mm">${PH.role}</div>
  </div>
  <div style="position:absolute;left:6mm;right:6mm;bottom:6mm;display:flex;justify-content:space-between;align-items:flex-end;font-size:5.8pt;color:var(--ink2)">
    <div><span class="eb" style="font-size:4.6pt;color:var(--muted)">ID</span><br>${PH.id}</div>
    <div>${logo('symbol-full-colour', '6mm')}</div>
  </div>`, { group: 'id-card', file: 'id-card' });
S('id-card-back', 54, 85.6, 'var(--ink)', `
  <div style="position:absolute;left:6mm;right:6mm;top:8mm;font-size:6pt;line-height:1.55;color:var(--mist)">If found, please return to BFourU.<br><br>${contactLines(6, 'var(--paper)')}</div>
  <div style="position:absolute;left:-6mm;bottom:-8mm">${logo('symbol-reversed', '34mm')}</div>`, { group: 'id-card', file: 'id-card' });

/* ---------- flyer A4 ---------- */
const clusters = [['01', 'Brand & Creative', 'Branding & identity · Creative design · Photography & media'], ['02', 'Digital & Web', 'Digital marketing · Websites & apps'], ['03', 'Technology & Automation', 'Smart automation · OPD TV & displays · IT support · Clinic software (proposed)'], ['04', 'Spaces & Print', 'Signage & interiors · Printing · Merchandise'], ['05', 'Events & Education', 'Events & conferences · Patient education']];
S('flyer-a4', 210, 297, 'var(--paper)', `
  <div style="position:absolute;left:16mm;top:16mm">${logo('horizontal-full-colour', '9mm')}</div>
  <div style="position:absolute;right:16mm;top:18mm" class="eb"><span style="font-size:6.5pt;color:var(--ink2)">Creative · Digital · Technology</span></div>
  <div class="d" style="position:absolute;left:16mm;top:42mm;font-size:46pt;line-height:.9">One brand<span class="dot">.</span><br>Multiple solutions<span class="dot">.</span><br>Complete support<span class="dot">.</span></div>
  <p style="position:absolute;left:16mm;top:104mm;width:130mm;font-size:11pt;line-height:1.5;color:var(--ink2)">Brand, design, marketing, media, websites, automation, signage, print and events — under one roof, with one accountable point of contact.</p>
  <div style="position:absolute;left:16mm;right:16mm;top:132mm;border-top:0.3mm solid var(--ink)">
    ${clusters.map(([n, h, t]) => `<div style="display:grid;grid-template-columns:12mm 62mm 1fr;align-items:baseline;padding:4.2mm 0;border-bottom:0.25mm solid var(--paper3)"><span class="eb" style="font-size:7pt;color:var(--accent-ink)">${n}</span><span class="d" style="font-size:14pt">${h}</span><span style="font-size:8.6pt;color:var(--ink2);line-height:1.4">${t}</span></div>`).join('')}
  </div>
  <div style="position:absolute;left:-3mm;right:-3mm;bottom:-3mm;height:62mm;background:var(--ink)"></div>
  <div style="position:absolute;left:16mm;bottom:20mm;color:var(--paper)"><div class="d" style="font-size:24pt">Start a project<span class="dot">.</span></div><div style="font-size:9pt;color:var(--mist);margin-top:2mm">WhatsApp, call or email — one service or several.</div></div>
  <div style="position:absolute;right:16mm;bottom:17mm;text-align:right">${contactLines(8.5, 'var(--paper)')}</div>`);

/* ---------- poster A3 ---------- */
S('poster-a3', 297, 420, 'var(--ink)', `
  <div style="position:absolute;right:-40mm;top:-30mm">${logo('symbol-reversed', '210mm')}</div>
  <div style="position:absolute;left:20mm;top:20mm">${logo('horizontal-reversed', '12mm')}</div>
  <div class="d" style="position:absolute;left:20mm;top:205mm;font-size:84pt;line-height:.88;color:var(--paper)">Everything<br>your brand<br>needs<span class="dot">.</span></div>
  <div class="d" style="position:absolute;left:20mm;top:325mm;font-size:30pt;color:var(--mari)"><span class="serif" style="font-size:34pt">One</span> partner.</div>
  <div style="position:absolute;left:20mm;right:20mm;bottom:20mm;border-top:0.3mm solid #3A4A44;padding-top:6mm;display:flex;justify-content:space-between;color:var(--mist);font-size:10pt"><span>One Brand. Multiple Solutions. Complete Support.</span><span>${CONTACT.phone} · ${CONTACT.web}</span></div>`);

/* ---------- roll-up standee 800×2000 (bottom 150mm hidden in base) ---------- */
S('standee-800x2000', 800, 2000, 'var(--paper)', `
  <div style="position:absolute;left:70mm;top:90mm">${logo('horizontal-full-colour', '60mm')}</div>
  <div class="d" style="position:absolute;left:70mm;top:260mm;font-size:290pt;line-height:.88">One brand<span class="dot">.</span><br>Multiple<br>solutions<span class="dot">.</span><br>Complete<br>support<span class="dot">.</span></div>
  <div style="position:absolute;left:70mm;right:70mm;top:1010mm;border-top:1.2mm solid var(--ink)">
    ${clusters.map(([n, h, t]) => `<div style="padding:20mm 0;border-bottom:0.8mm solid var(--paper3)"><div class="eb" style="font-size:34pt;color:var(--accent-ink)">${n}</div><div class="d" style="font-size:88pt;margin-top:6mm">${h}</div><div style="font-size:38pt;color:var(--ink2);margin-top:6mm;line-height:1.3">${t}</div></div>`).join('')}
  </div>
  <div style="position:absolute;left:-3mm;right:-3mm;bottom:-3mm;height:300mm;background:var(--ink)"></div>
  <div style="position:absolute;left:70mm;bottom:175mm;color:var(--paper);font-size:44pt"><span class="eb" style="font-size:28pt;color:var(--mist)">Talk to us</span><br>${CONTACT.phone}<br>${CONTACT.web}</div>`);

/* ---------- office signage: reception wall 2400×900 and door sign 300×100 ---------- */
S('signage-reception-wall', 2400, 900, 'var(--ink)', `
  <div style="position:absolute;left:300mm;top:50%;transform:translateY(-50%)">${logo('horizontal-reversed', '300mm')}</div>
  <div style="position:absolute;right:220mm;bottom:150mm;font-size:64pt;color:var(--mist)">One Brand. Multiple Solutions. Complete Support.</div>`, { bleed: false });
S('signage-door-300x100', 300, 100, 'var(--white)', `
  <div style="position:absolute;left:18mm;top:50%;transform:translateY(-50%)">${logo('symbol-full-colour', '30mm')}</div>
  <div style="position:absolute;left:62mm;top:50%;transform:translateY(-50%)"><div class="eb" style="font-size:11pt;color:var(--muted)">Room 02</div><div class="d" style="font-size:40pt;margin-top:2mm">Studio</div></div>`, { bleed: false });

/* ---------- presentation folder outer spread 450×310 (two 220 panels + 10 spine) ---------- */
S('presentation-folder-outer', 450, 310, 'var(--paper)', `
  <div style="position:absolute;left:230mm;right:-3mm;top:-3mm;bottom:-3mm;background:var(--ink)"></div>
  <div style="position:absolute;left:250mm;top:150mm">${logo("horizontal-reversed", "14mm")}</div>
  <div style="position:absolute;right:-45mm;top:-45mm">${logo('symbol-reversed', '150mm')}</div>
  <div class="d" style="position:absolute;left:250mm;top:215mm;font-size:30pt;line-height:.95;color:var(--paper)">One brand<span class="dot">.</span><br>Multiple solutions<span class="dot">.</span><br>Complete support<span class="dot">.</span></div>
  <div style="position:absolute;left:20mm;bottom:22mm">${logo('symbol-full-colour', '14mm')}<div style="margin-top:6mm">${contactLines(8.5)}</div></div>
  <div style="position:absolute;left:220mm;top:0;bottom:0;width:10mm;border-left:0.2mm dashed rgba(16,33,28,.25);border-right:0.2mm dashed rgba(16,33,28,.25)"></div>`);

/* ---------- corporate brochure A4, 4 pages ---------- */
S('brochure-p1', 210, 297, 'var(--ink)', `
  <div style="position:absolute;left:18mm;top:18mm">${logo('horizontal-reversed', '10mm')}</div>
  <div style="position:absolute;right:-55mm;top:-25mm">${logo('symbol-reversed', '165mm')}</div>
  <div class="d" style="position:absolute;left:18mm;bottom:40mm;font-size:48pt;line-height:.9;color:var(--paper)">Built around you<span class="dot">.</span><br>Delivered as one<span class="dot">.</span></div>
  <div style="position:absolute;left:18mm;bottom:22mm;font-size:9pt;color:var(--mist)">Company profile · Creative, digital and technology services</div>`, { group: 'brochure', file: 'corporate-brochure-a4' });
S('brochure-p2', 210, 297, 'var(--paper)', `
  <div class="eb" style="position:absolute;left:18mm;top:20mm;font-size:7pt;color:var(--ink2)"><span class="dot">●</span> About BFourU</div>
  <div class="d" style="position:absolute;left:18mm;top:32mm;width:170mm;font-size:30pt;line-height:1">One partner for your brand, your digital presence and the systems behind them<span class="dot">.</span></div>
  <p style="position:absolute;left:18mm;top:90mm;width:150mm;font-size:10.5pt;line-height:1.6;color:var(--ink2)">BFourU brings creative, digital and technology solutions under one platform. We help businesses build recognisable brands, communicate professionally, strengthen their digital presence and simplify everyday operations — with one accountable point of contact.</p>
  <div style="position:absolute;left:18mm;right:18mm;top:140mm;display:grid;grid-template-columns:1fr 1fr;gap:10mm">
    <div style="border-top:0.3mm solid var(--ink);padding-top:4mm"><div class="eb" style="font-size:6.5pt;color:var(--accent-ink)">Vision</div><p class="d" style="font-size:13pt;line-height:1.2;margin-top:3mm;letter-spacing:-0.02em">To become a trusted creative and technology partner for businesses, delivering comprehensive and innovative solutions.</p></div>
    <div style="border-top:0.3mm solid var(--ink);padding-top:4mm"><div class="eb" style="font-size:6.5pt;color:var(--accent-ink)">Mission</div><p class="d" style="font-size:13pt;line-height:1.2;margin-top:3mm;letter-spacing:-0.02em">To empower businesses through professional branding, effective digital systems, meaningful communication and reliable business support.</p></div>
  </div>
  <div style="position:absolute;left:18mm;right:18mm;bottom:22mm;display:grid;grid-template-columns:repeat(3,1fr);gap:8mm;font-size:8.5pt;color:var(--ink2);line-height:1.45">
    <div><b class="d" style="font-size:12pt;color:var(--ink)">One brief</b><br>Explain your business once — every discipline works from it.</div>
    <div><b class="d" style="font-size:12pt;color:var(--ink)">One standard</b><br>The same brand on screens, signs, print and social.</div>
    <div><b class="d" style="font-size:12pt;color:var(--ink)">One contact</b><br>A single accountable person across every service.</div>
  </div>`, { group: 'brochure', file: 'corporate-brochure-a4' });
S('brochure-p3', 210, 297, 'var(--paper)', `
  <div class="eb" style="position:absolute;left:18mm;top:20mm;font-size:7pt;color:var(--ink2)"><span class="dot">●</span> What we do</div>
  <div class="d" style="position:absolute;left:18mm;top:32mm;font-size:30pt">Fourteen services. Five clusters<span class="dot">.</span></div>
  <div style="position:absolute;left:18mm;right:18mm;top:62mm;border-top:0.3mm solid var(--ink)">
    ${clusters.map(([n, h, t]) => `<div style="padding:7mm 0;border-bottom:0.25mm solid var(--paper3);display:grid;grid-template-columns:14mm 1fr"><span class="eb" style="font-size:7pt;color:var(--accent-ink);padding-top:1.5mm">${n}</span><div><div class="d" style="font-size:16pt">${h}</div><div style="font-size:9pt;color:var(--ink2);margin-top:1.6mm">${t}</div></div></div>`).join('')}
  </div>
  <div style="position:absolute;left:18mm;right:18mm;bottom:20mm;font-size:8pt;color:var(--muted)">Engagements are project-based or by subscription, quoted to your scope.</div>`, { group: 'brochure', file: 'corporate-brochure-a4' });
S('brochure-p4', 210, 297, 'var(--ink)', `
  <div class="d" style="position:absolute;left:18mm;top:40mm;font-size:40pt;line-height:.92;color:var(--paper)">Let’s start with a <span class="serif" style="color:var(--mari)">conversation</span><span class="dot">.</span></div>
  <div style="position:absolute;left:18mm;top:110mm">${contactLines(11, 'var(--paper)')}</div>
  <div style="position:absolute;left:18mm;bottom:20mm">${logo('horizontal-reversed', '10mm')}</div>
  <div style="position:absolute;right:-30mm;bottom:-30mm">${logo('symbol-reversed', '120mm')}</div>`, { group: 'brochure', file: 'corporate-brochure-a4' });

/* ---------- build ---------- */
async function main() {
  const out = path.resolve(__dirname, '../07-Templates/print-ready');
  const prev = path.resolve(__dirname, 'previews');
  fs.mkdirSync(out, { recursive: true }); fs.mkdirSync(prev, { recursive: true });
  const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="print.css"><style id="pagecss"></style></head><body>
${sheets.map((s) => `<section class="sheet" id="${s.id}" data-group="${s.group}" style="width:${s.w + (s.bleed ? 6 : 0)}mm;height:${s.h + (s.bleed ? 6 : 0)}mm;background:${s.bg};--b:${s.bleed ? 3 : 0}mm"><div class="trim">${s.inner}</div></section>`).join('\n')}
</body></html>`;
  fs.writeFileSync(path.join(__dirname, 'print/templates.html'), html);
  const b = await launch();
  try {
    await b.open(path.join(__dirname, 'print/templates.html'), 1800, 1200, 1);
    // PDFs: one file per group (multi-page where a group has several sheets)
    const groups = [...new Set(sheets.map((s) => s.group))];
    for (const g of groups) {
      const ss = sheets.filter((s) => s.group === g);
      const s0 = ss[0];
      const W = s0.w + (s0.bleed ? 6 : 0), H = s0.h + (s0.bleed ? 6 : 0);
      await b.eval(`(() => { document.getElementById('pagecss').textContent = '@page { size: ${W}mm ${H}mm; margin: 0 } @media print { html, body { background: none !important; padding: 0 !important; display: block !important } .sheet { display: none !important } .sheet[data-group="${g}"] { display: block !important; break-after: page } }'; return true })()`);
      await b.pdf(path.join(out, `${s0.file}${s0.bleed ? '-3mm-bleed' : ''}.pdf`));
    }
    await b.eval(`(() => { document.getElementById('pagecss').textContent = ''; return true })()`);
    // PNG previews of the trim area, ~2000px on the long edge
    for (const s of sheets) {
      const r = await b.eval(`(() => { const e = document.querySelector('#${s.id} .trim').getBoundingClientRect(); return { x: e.left + scrollX, y: e.top + scrollY, width: e.width, height: e.height }; })()`);
      const scale = Math.min(4, 2000 / Math.max(r.width, r.height));
      await b.png(path.join(prev, `${s.id}.png`), { ...r, scale });
    }
  } finally { b.close(); }
  console.log('print templates:', fs.readdirSync(out).join(', '));
}
main().catch((e) => { console.error(e); process.exit(1); });
