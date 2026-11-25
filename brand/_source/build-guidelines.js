/** BFourU Brand Guidelines — generates guidelines/guidelines.html and exports the PDF + page previews. */
const fs = require('fs');
const path = require('path');
const { C, contrast } = require('./brand');
const { launch } = require('./cdp');

const R = (p) => path.resolve(__dirname, p);
const rel = (p) => path.relative(R('guidelines'), R(p)).split(path.sep).join('/');
const svgFile = (p, style = '') => fs.readFileSync(R(p), 'utf8').replace(/<title>.*?<\/title>/, '').replace('<svg ', `<svg style="${style}" `);
const logo = (n, style) => svgFile(`../02-Logo/svg/bfouru-${n}.svg`, style);
const glyph = (n, style, rev) => svgFile(`../06-Icons-and-Graphics/service-glyphs/${n}${rev ? '-reversed' : ''}.svg`, style);
const img = (p, style = '') => `<img src="${rel(p)}" style="${style}">`;
const mock = (n, style) => img(`../../presentation/assets/mocks/${n}.png`, style);
const scene = (n, style) => img(`../../presentation/assets/scenes/${n}.png`, style);
const prev = (n, style) => img(`previews/${n}.png`, style);
const office = (n, style) => img(`previews/office/${n}.png`, style);
const shot = (n, style) => img(`previews/web/${n}`, style);
const glyphs = JSON.parse(fs.readFileSync(R('glyphs.json'), 'utf8'));
const geo = JSON.parse(fs.readFileSync(R('logo-geometry.json'), 'utf8'));

const pages = [];
let section = '';
const P = (cls, html, o = {}) => pages.push({ cls, html, section: o.section ?? section, plain: o.plain });
const secStart = {};
const SEC = (n, name) => { section = `${n} ${name}`; secStart[n] = pages.length + 1; };
const head = (eyebrow, title, lead, w = '62%') => `<div class="eb">${eyebrow}</div><h2 class="d h1" style="margin-top:5mm;max-width:${w}">${title}</h2>${lead ? `<p class="lead" style="margin-top:4mm;max-width:${w}">${lead}</p>` : ''}`;
const divider = (n, name, line, tone = 'ink') => P(`${tone}`, `
  <div style="position:absolute;left:var(--M);top:16mm" class="num">${n}</div>
  <div class="d" style="position:absolute;left:var(--M);bottom:26mm;font-size:72pt;line-height:.86">${name}<span class="dot">.</span></div>
  <p class="lead" style="position:absolute;left:var(--M);bottom:17mm;max-width:150mm">${line}</p>
  <div style="position:absolute;right:-34mm;top:-26mm;opacity:${tone === 'ink' ? 1 : 1}">${logo(tone === 'ink' ? 'symbol-reversed' : 'symbol-mono-ink', 'height:150mm;width:auto;opacity:' + (tone === 'ink' ? '1' : '.08'))}</div>`, { plain: true });

/* ============================================================ 00 FRONT */
P('ink', `
  <div style="position:absolute;left:var(--M);top:16mm">${logo('horizontal-reversed', 'height:9mm;width:auto')}</div>
  <div style="position:absolute;right:var(--M);top:17mm" class="eb">Brand guidelines · Version 1.0 · November 2026</div>
  <div style="position:absolute;right:-44mm;bottom:-56mm">${logo('symbol-reversed', 'height:150mm;width:auto')}</div>
  <div class="d" style="position:absolute;left:var(--M);bottom:40mm;font-size:54pt;line-height:.88">One brand<span class="dot">.</span><br>Multiple solutions<span class="dot">.</span><br>Complete support<span class="dot">.</span></div>
  <p class="lead" style="position:absolute;left:var(--M);bottom:22mm">The official reference for how BFourU looks, sounds and moves.</p>`, { plain: true });

const toc = [['01', 'Brand strategy', '{{p01}}'], ['02', 'Logo', '{{p02}}'], ['03', 'Colour', '{{p03}}'], ['04', 'Typography', '{{p04}}'], ['05', 'Layout, grid & spacing', '{{p05}}'], ['06', 'Visual language', '{{p06}}'], ['07', 'Voice & communication', '{{p07}}'], ['08', 'Motion', '{{p08}}'], ['09', 'Applications', '{{p09}}'], ['10', 'Healthcare & industries', '{{p10}}'], ['11', 'Production & assets', '{{p11}}']];
P('', `<div class="c" style="display:grid;grid-template-columns:1fr 1.25fr;gap:16mm">
  <div><div class="eb">Contents</div><h2 class="d h1" style="margin-top:5mm">Inside this guide<span class="dot">.</span></h2>
  <p class="lead" style="margin-top:5mm">Foundations first — strategy, logo, colour, type and space — then how they combine into real work. Pages are organised by task, so you can jump straight to what you need.</p></div>
  <div>${toc.map(([n, t, p]) => `<div style="display:grid;grid-template-columns:12mm 1fr 12mm;align-items:baseline;padding:3.1mm 0;border-top:0.2mm solid var(--line)"><span class="num">${n}</span><span class="d h3">${t}</span><span class="muted" style="text-align:right">${p}</span></div>`).join('')}</div></div>`);

P('sand', `<div class="c">${head('How to use this guide', 'A system, not a set of rules to memorise<span class="dot">.</span>', 'Everything here is built from a small number of decisions. Learn those, and most design questions answer themselves.')}
  <div class="grid g4" style="margin-top:12mm">
   ${[['For designers', 'Start with the foundations (sections 02–06). Use the templates in /07-Templates rather than rebuilding layouts.'], ['For developers', 'Use /05-Design-Tokens. Colours, type, spacing, radius and motion are named tokens — never hard-code values.'], ['For marketing teams', 'Use the social and presentation templates and the voice guide (section 07). Check healthcare rules before publishing.'], ['For agencies & printers', 'Read sections 02, 03 and 11. Request a physical colour proof before every print run.']].map(([h, t]) => `<div class="rule"><div class="d h3">${h}</div><p style="margin-top:3mm" class="small">${t}</p></div>`).join('')}
  </div>
  <div class="grid g3" style="margin-top:14mm">
   ${[['1', 'Tokens before components', 'Colours, type and spacing are defined once and reused everywhere.'], ['2', 'One master brand', 'Healthcare is a tint of the same system — never a separate identity.'], ['3', 'Restraint is the style', 'Few colours, generous space, one accent. When unsure, remove something.']].map(([n, h, t]) => `<div class="card"><div class="d" style="font-size:22pt;color:var(--accent)">${n}</div><div class="d h4" style="margin-top:2mm">${h}</div><p class="small" style="margin-top:1.5mm">${t}</p></div>`).join('')}
  </div></div>`);

/* ============================================================ 01 STRATEGY */
SEC('01', 'Brand strategy');
divider('01', 'Brand strategy', 'Why BFourU exists, who it serves, and what it promises.');
P('', `<div class="c" style="display:grid;grid-template-columns:1fr 1fr;gap:16mm">
  <div>${head('Purpose', 'We take care of everything around the work only you can do<span class="dot">.</span>', '', '100%')}
    <p style="margin-top:6mm" class="lead">BFourU exists to make it easier for businesses to look, communicate and operate at their best — so owners and teams can focus on their customers, patients and craft.</p>
    <p class="small muted" style="margin-top:4mm">Purpose statement derived from the company brief’s objective: “help businesses build recognizable brands, improve professional communication, strengthen their digital presence and simplify non-clinical business operations.”</p></div>
  <div style="display:grid;gap:8mm;align-content:start">
    <div class="card"><div class="eb">Vision</div><p class="d h3" style="margin-top:3mm">To become a trusted creative and technology partner for businesses, delivering comprehensive and innovative solutions.</p></div>
    <div class="card" style="background:var(--ink);color:var(--paper)"><div class="eb">Mission</div><p class="d h3" style="margin-top:3mm">To empower businesses through professional branding, effective digital systems, meaningful communication and reliable business support.</p></div>
    <p class="small muted">Vision and mission are quoted from the company brief and should not be reworded in external material.</p></div></div>`);

P('sand', `<div class="c" style="display:grid;grid-template-columns:1.05fr 1fr;gap:14mm">
  <div>${head('Positioning', 'One accountable partner — not a patchwork of vendors<span class="dot">.</span>', '', '100%')}
   <div class="card" style="margin-top:7mm"><p style="font-size:11pt;line-height:1.5">For <b>growing businesses and healthcare organisations</b> tired of coordinating separate designers, printers, developers and marketers, <b>BFourU</b> is the <b>creative, digital and technology partner</b> that brings brand, marketing, media, websites, automation, print and physical spaces under one roof — <b>so everything looks, sounds and works like one organisation.</b></p></div>
   <p class="small muted" style="margin-top:4mm">Use this statement internally to brief work. In public, express it through the brand promise rather than quoting it.</p></div>
  <div><div class="eb">Where we sit</div>
   <div style="position:relative;height:120mm;margin-top:5mm;border-left:0.3mm solid var(--ink);border-bottom:0.3mm solid var(--ink)">
    <span class="small muted" style="position:absolute;left:3mm;top:0">Accountable partner</span><span class="small muted" style="position:absolute;left:3mm;bottom:2mm">Transactional supplier</span>
    <span class="small muted" style="position:absolute;right:0;bottom:-6mm">Multi-discipline →</span><span class="small muted" style="position:absolute;left:0;bottom:-6mm">← Single discipline</span>
    ${[['Freelancers & local vendors', 14, 78], ['Specialist digital agencies', 30, 42], ['Software & signage vendors', 64, 70], ['Large network agencies', 72, 30]].map(([t, x, y]) => `<div style="position:absolute;left:${x}%;top:${y}%;font-size:7.4pt;color:var(--ink2)"><span style="display:inline-block;width:3mm;height:3mm;border-radius:50%;border:0.3mm solid var(--ink2);margin-right:2mm;vertical-align:-0.6mm"></span>${t}</div>`).join('')}
    <div style="position:absolute;left:66%;top:8%;display:flex;align-items:center;gap:2mm">${logo('symbol-full-colour', 'height:9mm;width:auto')}<span class="d h4">BFourU — intended position</span></div>
   </div><p class="cap" style="margin-top:9mm">Conceptual map from the competitor research (website /docs/02). It describes an ambition, not a measured market share.</p></div></div>`);

P('', `<div class="c">${head('Audience', 'One master brand, two audiences<span class="dot">.</span>', 'The core identity speaks to any business. Healthcare is a specialist vertical served by the same brand — with a calmer tint and stricter communication rules.')}
  <div class="grid g2" style="margin-top:10mm;gap:10mm">
   <div class="card"><div class="d h3">Businesses</div><p class="small muted" style="margin-top:1mm">Core audience</p><div style="margin-top:4mm">${['Business owners', 'Startups', 'Entrepreneurs', 'Small & medium enterprises', 'Marketing managers', 'Corporate decision-makers', 'Established businesses'].map((t) => `<span class="chip">${t}</span>`).join('')}</div>
    <p class="small" style="margin-top:4mm"><b>They need:</b> a recognisable brand, a consistent online presence, professional materials, and fewer vendors to manage.</p></div>
   <div class="card" style="background:var(--sage)"><div class="d h3">Healthcare</div><p class="small muted" style="margin-top:1mm;color:var(--ink2)">Specialist vertical</p><div style="margin-top:4mm">${['Individual doctors', 'Private clinics', 'Multi-specialty hospitals', 'Maternity hospitals', 'Specialty clinics', 'Diagnostic centres', 'Medical colleges', 'Medical associations', 'Healthcare organisations'].map((t) => `<span class="chip" style="border-color:#B9C9BB">${t}</span>`).join('')}</div>
    <p class="small" style="margin-top:4mm"><b>They need:</b> credible, ethical communication; patient-friendly materials; calmer spaces; less manual follow-up.</p></div></div>
  <p class="small muted" style="margin-top:6mm">Problems we solve (from the brief): inconsistent branding · fragmented service providers · limited time for digital presence · outdated websites and systems · manual enquiries and follow-ups · lack of professional communication materials · repetitive administrative workflows.</p></div>`);

P('ink', `<div class="c" style="display:grid;grid-template-columns:1fr 1fr;gap:16mm">
  <div>${head('Brand promise', 'One brand<span class="dot">.</span> Multiple solutions<span class="dot">.</span> Complete support<span class="dot">.</span>', '', '100%')}<p class="lead" style="margin-top:6mm">Our master line is also our promise. Every piece of work should make at least one part of it visibly true.</p></div>
  <div style="display:grid;gap:6mm;align-content:start">
   ${[['One brand', 'Everything we make for a client follows one brand standard — on screens, signs, print and social.'], ['Multiple solutions', 'Fourteen services across five clusters, chosen to fit the brief — never sold for their own sake.'], ['Complete support', 'One point of contact from first conversation to ongoing support, where agreed.']].map(([h, t]) => `<div class="hair"><div class="d h3">${h}<span class="dot">.</span></div><p style="margin-top:2mm;color:var(--mist)">${t}</p></div>`).join('')}
   <div class="hair"><div class="eb">Healthcare line</div><p class="d h3" style="margin-top:2mm">You care for patients. We take care of <span class="serif" style="color:var(--mari)">the rest</span>.</p><p class="small" style="margin-top:2mm;color:var(--mist)">Used only in healthcare material, never as the master line.</p></div></div></div>`);

P('', `<div class="c">${head('Value proposition', 'Why clients choose one partner<span class="dot">.</span>', 'From the company brief. These are the only claims we make about how we work — never add numbers, awards or results we cannot show.')}
  <div class="grid g3" style="margin-top:10mm;row-gap:9mm">
   ${[['One point of contact', 'One brief and one accountable person for multiple creative and digital needs.'], ['Customised solutions', 'Every engagement is scoped to the client. No one-size packages.'], ['Consistent communication', 'One brand standard applied to every touchpoint.'], ['Technology-enabled workflows', 'Automation, displays and systems that reduce manual work.'], ['Scalable services', 'From a single doctor or startup to multi-location organisations.'], ['Ongoing support', 'Monthly content, maintenance and reporting where agreed.']].map(([h, t], i) => `<div class="rule"><span class="num">0${i + 1}</span><div class="d h3" style="margin-top:2mm">${h}</div><p class="small" style="margin-top:2mm">${t}</p></div>`).join('')}
  </div><p class="small muted" style="margin-top:9mm">Engagements: project-based and subscription-based, subject to availability and agreed scope. Pricing is always a customised quotation.</p></div>`);

P('sand', `<div class="c">${head('Values', 'Four principles that guide every decision<span class="dot">.</span>', '')}
  <div class="grid g4" style="margin-top:12mm">
   ${[['Consistency over noise', 'Every output follows one brand system, so a client looks like one business everywhere.'], ['Clarity over jargon', 'Plain language, clear scopes and quotes people can actually read.'], ['Ethics over shortcuts', 'Especially in healthcare: consent, approvals and honest communication come first.'], ['Ownership over hand-offs', 'One accountable person for the whole brief, not just one piece of it.']].map(([h, t], i) => `<div class="card" style="min-height:92mm;display:flex;flex-direction:column">${glyph(Object.keys(glyphs)[[1, 4, 13, 5][i]], 'width:14mm;height:14mm')}<div class="d" style="font-size:17pt;margin-top:auto;line-height:1">${h}</div><p class="small" style="margin-top:3mm">${t}</p></div>`).join('')}
  </div></div>`);

P('', `<div class="c" style="display:grid;grid-template-columns:.8fr 1.2fr;gap:14mm">
  <div>${head('Personality', 'If BFourU were a person<span class="dot">.</span>', 'A senior creative who is easy to talk to: confident without showing off, precise without being cold.', '100%')}</div>
  <div>${[['Professional', 'not corporate', 72], ['Confident', 'not arrogant', 66], ['Approachable', 'not casual', 58], ['Knowledgeable', 'not technical', 62], ['Creative', 'not gimmicky', 54], ['Human', 'not chummy', 60]].map(([a, b, v]) => `<div style="padding:3.6mm 0;border-top:0.2mm solid var(--line)"><div style="display:flex;justify-content:space-between"><span class="d h3">${a}</span><span class="muted small">${b}</span></div><div style="position:relative;height:1.6mm;background:var(--paper2);border-radius:2mm;margin-top:2.4mm"><span style="position:absolute;left:0;top:0;bottom:0;width:${v}%;background:var(--ink);border-radius:2mm"></span><span style="position:absolute;left:calc(${v}% - 1.6mm);top:-0.8mm;width:3.2mm;height:3.2mm;border-radius:50%;background:var(--accent)"></span></div></div>`).join('')}</div></div>`);

P('', `<div class="c">${head('Differentiation', 'How we are different — and how we say it<span class="dot">.</span>', 'Informed by a study of 17 Indian and international agencies and healthcare vendors (website /docs/02).')}
  <table class="t" style="margin-top:9mm"><tr><th style="width:22%">Compared with</th><th style="width:36%">What they typically offer</th><th>What BFourU does differently</th></tr>
   ${[['Freelancers & local vendors', 'One discipline each; the client coordinates everyone', 'One brief, one standard, one point of contact across every discipline'], ['Specialist digital agencies', 'Social, ads or web — rarely print, signage, screens or IT', 'Digital plus the physical and operational touchpoints: print, signage, OPD screens, automation, IT'], ['Software & signage vendors', 'A product, with content and brand left to the client', 'Systems delivered together with the brand and communication that run on them'], ['Healthcare marketing agencies', 'Growth claims, testimonials, “best doctor” positioning', 'Ethics-first, consent-first, non-clinical — aligned with NMC advertising guidance'], ['Most competitor websites', 'Several competing calls to action, long forms, no WhatsApp', 'One verb (“Start a project”), a short brief, WhatsApp as a first-class channel']].map((r) => `<tr><td class="d h4">${r[0]}</td><td class="muted">${r[1]}</td><td>${r[2]}</td></tr>`).join('')}
  </table></div>`);

/* ============================================================ 02 LOGO */
SEC('02', 'Logo');
divider('02', 'Logo', 'A modular mark and a confident wordmark — one system, many outputs.');
P('ink', `<div style="position:absolute;inset:0;display:grid;place-items:center">${logo('horizontal-reversed', 'height:40mm;width:auto')}</div><div class="foot" style="justify-content:flex-start;gap:6mm"><span>Primary logo · Full colour reversed on Forest Ink</span></div>`, { plain: true });

P('', `<div class="c" style="display:grid;grid-template-columns:1fr 1.2fr;gap:14mm">
  <div>${head('Anatomy', 'Four cells. One is always for you<span class="dot">.</span>', 'The mark is a 2 × 2 modular grid built from a quarter-round, a circle, a square and a quarter-round. The Persimmon circle is the part that is specifically for the client. The four cells also nod to the “Four” in BFourU.', '100%')}
   <ul class="l small" style="margin-top:6mm"><li><b>Grid</b> — 40 × 40 units; cells 18 units; gap 4 units</li><li><b>Wordmark</b> — Bricolage Grotesque Bold, tracking −35, outlined</li><li><b>Proportion</b> — mark 0.92 S · gap 0.36 S · wordmark 0.8 S (S = logo unit)</li><li><b>Alignment</b> — wordmark cap height centred on the mark</li></ul>
   <p class="small muted" style="margin-top:4mm">Never re-type the wordmark. Always use the supplied artwork.</p></div>
  <div class="surface" style="display:grid;place-items:center;background:var(--white)">
   <svg viewBox="-6 -6 52 52" style="width:118mm;height:118mm">
    ${Array.from({ length: 11 }, (_, i) => `<line x1="${i * 4}" y1="0" x2="${i * 4}" y2="40" stroke="#E4DCCD" stroke-width=".12"/><line x1="0" y1="${i * 4}" x2="40" y2="${i * 4}" stroke="#E4DCCD" stroke-width=".12"/>`).join('')}
    <path d="M0 18A18 18 0 0 1 18 0V18Z" fill="${C.ink.hex}"/><circle cx="31" cy="9" r="9" fill="${C.accent.hex}"/><rect y="22" width="18" height="18" fill="${C.ink.hex}"/><path d="M22 22H40A18 18 0 0 1 22 40Z" fill="${C.ink.hex}"/>
    <circle cx="18" cy="18" r="18" fill="none" stroke="${C.accent.hex}" stroke-width=".15" stroke-dasharray=".8 .6"/><circle cx="22" cy="22" r="18" fill="none" stroke="${C.accent.hex}" stroke-width=".15" stroke-dasharray=".8 .6"/>
    <text x="9" y="-1.6" font-size="1.7" text-anchor="middle" fill="${C.muted.hex}" font-family="IS">18</text><text x="20" y="-1.6" font-size="1.7" text-anchor="middle" fill="${C.muted.hex}" font-family="IS">4</text><text x="31" y="-1.6" font-size="1.7" text-anchor="middle" fill="${C.muted.hex}" font-family="IS">18</text>
    <text x="-1.6" y="9.6" font-size="1.7" text-anchor="end" fill="${C.muted.hex}" font-family="IS">18</text><text x="-1.6" y="20.6" font-size="1.7" text-anchor="end" fill="${C.muted.hex}" font-family="IS">4</text>
    <text x="20" y="44.5" font-size="1.7" text-anchor="middle" fill="${C.muted.hex}" font-family="IS">40 units · radius 18</text>
   </svg></div></div>`);

P('', `<div class="c">${head('Logo variations', 'Four arrangements for every format<span class="dot">.</span>', 'Use the horizontal logo by default. Switch only when the space demands it.')}
  <div class="grid g4" style="margin-top:9mm">
   ${[['horizontal', 'Primary · Horizontal', 'Default for headers, documents, slides and most applications.', 'height:13mm'], ['stacked', 'Stacked', 'Square or tall spaces: social profiles, standees, merchandise.', 'height:30mm'], ['symbol', 'Symbol', 'Small sizes and icons: favicon, app, avatar, watermark. Never as decoration on every page.', 'height:24mm'], ['wordmark', 'Wordmark', 'Rare. Only where the symbol is already present nearby or space is very wide and low.', 'height:9mm']].map(([n, h, t, s]) => `<div><div class="surface" style="height:58mm;display:grid;place-items:center;background:var(--white)">${logo(n + '-full-colour', s + ';width:auto')}</div><div class="d h4" style="margin-top:4mm">${h}</div><p class="small" style="margin-top:1.5mm">${t}</p></div>`).join('')}
  </div></div>`);

P('', `<div class="c">${head('Colourways', 'Six approved colour versions<span class="dot">.</span>', '')}
  <div class="grid g3" style="margin-top:7mm;row-gap:6mm">
   ${[['full-colour', 'var(--paper)', 'Full colour', 'Default on Ivory, Warm White, Sand and Sage.'], ['reversed', 'var(--ink)', 'Full colour reversed', 'Default on Forest Ink and dark imagery.'], ['mono-ink', 'var(--white)', 'Monochrome Forest Ink', 'One-colour print, embossing, engraving.'], ['mono-paper', 'var(--teal)', 'Monochrome Ivory', 'On Care Teal or busy dark backgrounds.'], ['black', '#FFFFFF', 'Black', 'Newspaper, fax, single-colour stamps.'], ['white', '#000000', 'White', 'Knock-out on photography or black.']].map(([n, bg, h, t]) => `<div><div style="height:30mm;border-radius:3mm;background:${bg};display:grid;place-items:center;border:0.2mm solid var(--line)">${logo('horizontal-' + n, 'height:9mm;width:auto')}</div><div style="display:flex;justify-content:space-between;margin-top:2.4mm"><span class="d h4">${h}</span><span class="small muted mono">bfouru-horizontal-${n}</span></div><p class="small muted">${t}</p></div>`).join('')}
  </div></div>`);

P('sand', `<div class="c" style="display:grid;grid-template-columns:1.1fr 1fr;gap:14mm">
  <div>${head('Clear space & minimum size', 'Give the logo room to breathe<span class="dot">.</span>', 'Clear space is one mark cell (x) on every side — measured from the mark, so it scales with the logo.', '100%')}
   <table class="t" style="margin-top:8mm"><tr><th>Version</th><th>Digital minimum</th><th>Print minimum</th></tr>
    <tr><td class="d h4">Horizontal</td><td>96 px wide</td><td>25 mm wide</td></tr><tr><td class="d h4">Stacked</td><td>64 px wide</td><td>18 mm wide</td></tr><tr><td class="d h4">Symbol</td><td>16 px (favicon) · 24 px in UI</td><td>6 mm wide</td></tr><tr><td class="d h4">Wordmark</td><td>80 px wide</td><td>20 mm wide</td></tr></table>
   <p class="small muted" style="margin-top:4mm">Below the horizontal minimum, switch to the symbol.</p></div>
  <div class="surface" style="background:var(--white);display:grid;place-items:center">
   <div style="position:relative;padding:14mm;outline:0.3mm dashed var(--accent);outline-offset:-0.15mm">
     ${logo('horizontal-full-colour', 'height:24mm;width:auto')}
     ${[['left:0;top:50%;transform:translateY(-50%)', 'x'], ['right:0;top:50%;transform:translateY(-50%)', 'x'], ['top:0;left:50%;transform:translateX(-50%)', 'x'], ['bottom:0;left:50%;transform:translateX(-50%)', 'x']].map(([p, t]) => `<span style="position:absolute;${p};width:14mm;height:14mm;display:grid;place-items:center;font-size:8pt;color:var(--accent-ink);font-weight:700">${t}</span>`).join('')}
   </div><p class="cap" style="position:absolute;bottom:6mm">x = height of one mark cell (18/40 of the mark)</p></div></div>`);

P('', `<div class="c">${head('Placement', 'Corners, not centres<span class="dot">.</span>', 'The logo anchors a composition from the top-left or bottom-left margin. Align it to the same margin as the text it sits with.')}
  <div class="grid g4" style="margin-top:9mm">
   ${[['Top-left · default', 'left:5mm;top:5mm'], ['Bottom-left · covers & posters', 'left:5mm;bottom:5mm'], ['Bottom-right · slides, social footers', 'right:5mm;bottom:5mm'], ['Centred · only on profile icons & covers with nothing else', 'left:50%;top:50%;transform:translate(-50%,-50%)']].map(([t, p], i) => `<div><div style="position:relative;height:52mm;border-radius:2mm;background:${i === 3 ? 'var(--ink)' : 'var(--white)'};border:0.2mm solid var(--line)"><div style="position:absolute;inset:5mm;border:0.2mm dashed var(--paper3)"></div><div style="position:absolute;${p}">${logo(i === 3 ? 'stacked-reversed' : 'horizontal-full-colour', `height:${i === 3 ? 14 : 5}mm;width:auto`)}</div>${i < 3 ? '<div style="position:absolute;left:5mm;right:18mm;top:22mm;height:2.4mm;background:var(--paper3);border-radius:1mm"></div><div style="position:absolute;left:5mm;right:30mm;top:27mm;height:2.4mm;background:var(--paper3);border-radius:1mm"></div>' : ''}</div><p class="small" style="margin-top:3mm">${t}</p></div>`).join('')}
  </div><p class="small muted" style="margin-top:8mm">Margins: 8% of the short edge on social; 0.75 in on slides; 16–20 mm on A4; 7 mm on business cards.</p></div>`);

P('', `<div class="c">${head('Approved backgrounds', 'Contrast first<span class="dot">.</span>', '')}
  <div class="grid g6" style="margin-top:8mm">
   ${[['paper', 'full-colour', 1], ['white', 'full-colour', 1], ['paper2', 'full-colour', 1], ['sage', 'full-colour', 1], ['ink', 'reversed', 1], ['teal', 'mono-paper', 1], ['accent', 'mono-ink', 1], ['marigold', 'mono-ink', 1], ['tealDark', 'reversed', 1], ['paper', 'mono-ink', 1], ['accent', 'full-colour', 0], ['teal', 'full-colour', 0]].map(([bg, v, ok]) => `<div><div style="height:30mm;border-radius:2mm;background:${C[bg].hex};display:grid;place-items:center;border:0.2mm solid var(--line)">${logo('horizontal-' + v, 'height:6mm;width:auto')}</div><div style="margin-top:2mm;display:flex;gap:2mm;align-items:center"><span class="tag ${ok ? 'do' : 'dont'}">${ok ? 'Yes' : 'No'}</span><span class="small muted">${C[bg].name}</span></div></div>`).join('')}
  </div><p class="small muted" style="margin-top:6mm">On photography, place the logo over a calm, even area; use the white or reversed version and never add a box or glow behind it.</p></div>`);

const wrong = [['Stretched', 'transform:scaleX(1.5)'], ['Rotated', 'transform:rotate(-12deg)'], ['Recoloured', 'filter:hue-rotate(140deg)'], ['Outlined / effects', 'filter:drop-shadow(0 0 1.5mm #E4572E) drop-shadow(1mm 1mm 0 #10211C)'], ['Low contrast', 'opacity:.18'], ['Cropped', 'clip-path:inset(0 35% 0 0)'], ['Rearranged', ''], ['Re-typed wordmark', '']];
P('', `<div class="c">${head('Incorrect use', 'Never alter the artwork<span class="dot">.</span>', '')}
  <div class="grid g4" style="margin-top:8mm;row-gap:7mm">
   ${wrong.map(([t, s], i) => `<div><div style="height:34mm;border-radius:2mm;background:var(--white);display:grid;place-items:center;position:relative;overflow:hidden;border:0.2mm solid var(--line)">${i === 6 ? `<div style="display:flex;align-items:center;gap:2mm"><span class="d" style="font-size:16pt">BFourU</span>${logo('symbol-full-colour', 'height:8mm;width:auto')}</div>` : i === 7 ? `<div style="display:flex;align-items:center;gap:2mm">${logo('symbol-full-colour', 'height:8mm;width:auto')}<span style="font-family:Georgia;font-size:15pt">BFourU</span></div>` : logo('horizontal-full-colour', `height:8mm;width:auto;${s}`)}<svg viewBox="0 0 10 10" style="position:absolute;right:2.5mm;top:2.5mm;width:5mm;height:5mm"><circle cx="5" cy="5" r="5" fill="#E4572E"/><path d="M3 3l4 4M7 3l-4 4" stroke="#fff" stroke-width="1.2"/></svg></div><p class="small" style="margin-top:2mm">${t}</p></div>`).join('')}
  </div></div>`);

P('sand', `<div class="c" style="display:grid;grid-template-columns:1fr 1.3fr;gap:14mm">
  <div>${head('Favicon & profile icons', 'The symbol, framed<span class="dot">.</span>', 'App and favicon icons sit on a Forest Ink rounded square. Social avatars place the symbol inside the circular crop with 27% margin.', '100%')}
   <ul class="l small" style="margin-top:6mm"><li>favicon.svg, favicon.ico (16/32/48), icon-180/192/512.png</li><li>avatar-ink, avatar-paper, avatar-sage — 1080 × 1080</li><li>Location: /02-Logo/favicon-and-app-icons and /social-profile-icons</li></ul></div>
  <div style="display:flex;gap:8mm;align-items:center;justify-content:center">
   <div style="text-align:center">${img('../02-Logo/favicon-and-app-icons/icon-512.png', 'width:34mm;border-radius:7mm')}<p class="cap">App icon</p></div>
   <div style="text-align:center">${img('../02-Logo/favicon-and-app-icons/icon-32.png', 'width:8mm;image-rendering:pixelated;margin:0 auto')}<p class="cap">Favicon 32 px</p></div>
   ${['avatar-ink', 'avatar-paper', 'avatar-persimmon-dot-on-sage'].map((a) => `<div style="text-align:center">${img(`../02-Logo/social-profile-icons/${a}-1080.png`, 'width:34mm;border-radius:50%')}<p class="cap">${a.replace('-persimmon-dot-on-sage', '-sage')}</p></div>`).join('')}
  </div></div>`);

/* ============================================================ 03 COLOUR */
SEC('03', 'Colour');
divider('03', 'Colour', 'Ivory paper, forest ink, one confident persimmon accent.');
P('', `<div style="position:absolute;inset:0;display:grid;grid-template-columns:2.4fr 1.6fr 1.25fr">
   ${[['paper', 'var(--ink)'], ['ink', 'var(--paper)'], ['accent', 'var(--ink)']].map(([k, fg]) => `<div style="background:${C[k].hex};color:${fg};position:relative"><div style="position:absolute;left:12mm;bottom:14mm"><div class="d" style="font-size:22pt">${C[k].name}</div><div class="mono" style="margin-top:2mm;opacity:.8">${C[k].hex}<br>RGB ${C[k].rgb.join(' ')}<br>CMYK≈ ${C[k].cmyk.join(' ')}</div><div class="small" style="margin-top:1mm;opacity:.8;max-width:58mm">${C[k].role}</div></div></div>`).join('')}
  </div><div style="position:absolute;left:12mm;top:12mm" class="eb">Core palette</div>`, { plain: true });

const swRow = (keys) => keys.map((k) => `<div><div style="height:30mm;border-radius:2mm;background:${C[k].hex};border:0.2mm solid var(--line)"></div><div class="d h4" style="margin-top:2.4mm">${C[k].name}</div><div class="mono muted" style="margin-top:1mm;line-height:1.5">${C[k].hex}<br>RGB ${C[k].rgb.join(' ')}<br>CMYK≈ ${C[k].cmyk.join(' ')}<br>${C[k].token}</div></div>`).join('');
P('', `<div class="c">${head('Full palette', 'Supporting colours and neutrals<span class="dot">.</span>', '', '70%')}
  <div class="eb" style="margin-top:7mm">Supporting</div><div class="grid g4" style="margin-top:3mm">${swRow(['teal', 'sage', 'marigold', 'tealDark'])}</div>
  <div class="eb" style="margin-top:6mm">Neutrals & functional</div><div class="grid" style="grid-template-columns:repeat(7,1fr);margin-top:3mm">${swRow(['white', 'paper2', 'paper3', 'ink2', 'muted', 'onInkMuted', 'accentInk'])}</div></div>`);

P('sand', `<div class="c" style="display:grid;grid-template-columns:1fr 1fr;gap:14mm">
  <div>${head('Proportion', 'Mostly paper, some ink, a spark of persimmon<span class="dot">.</span>', '', '100%')}
   <div style="display:flex;height:22mm;border-radius:2mm;overflow:hidden;margin-top:8mm">${[['paper', 60], ['ink', 25], ['paper3', 8], ['accent', 5], ['teal', 2]].map(([k, v]) => `<div style="flex:${v};background:${C[k].hex}"></div>`).join('')}</div>
   <div style="display:flex;justify-content:space-between;margin-top:2mm" class="small muted"><span>Ivory 60%</span><span>Ink 25%</span><span>Neutrals 8%</span><span>Persimmon 5%</span><span>Teal 2%</span></div>
   <p class="small" style="margin-top:6mm">Healthcare material shifts the balance: Sage and Care Teal may rise to ~15%, Persimmon stays ≤ 5%.</p>
   <div class="eb" style="margin-top:8mm">Rules</div>
   <ul class="l small" style="margin-top:2mm"><li>Persimmon is a highlight — dots, a single word, an icon cell, an active state. Never a large background behind small text.</li><li>Use Persimmon Deep (#A63A1B) for small accent text on light backgrounds.</li><li>No gradients except image-based paper grain. No neon, no blue.</li></ul></div>
  <div><div class="eb">Approved combinations</div><div class="grid g2" style="margin-top:4mm;gap:4mm">
   ${[['paper', 'ink', 'accent'], ['ink', 'paper', 'accent'], ['sage', 'ink', 'teal'], ['paper2', 'ink', 'accentInk'], ['tealDark', 'paper', 'mari'], ['white', 'ink', 'teal']].map(([bg, fg, ac]) => `<div style="background:${C[bg].hex};color:${C[fg].hex};border-radius:2mm;padding:5mm;height:34mm;display:flex;flex-direction:column;justify-content:space-between;border:0.2mm solid var(--line)"><span class="d" style="font-size:15pt">Aa<span style="color:${(C[ac] || C.marigold).hex}">.</span></span><span class="small">${C[bg].name} / ${C[fg].name}</span></div>`).join('')}</div></div></div>`);

const pairs = JSON.parse(fs.readFileSync(R('../03-Colour/contrast-matrix.json'), 'utf8'));
P('', `<div class="c" style="display:grid;grid-template-columns:.8fr 1.2fr;gap:14mm">
  <div>${head('Accessibility', 'Readable by everyone<span class="dot">.</span>', 'Body text must reach WCAG AA 4.5:1; large display text (≥ 24 px, or 19 px bold) 3:1. These pairs are checked.', '100%')}
   <p class="small" style="margin-top:6mm"><b>Also:</b> never rely on colour alone to carry meaning; keep focus outlines visible (Persimmon, 2.5 px); minimum body size 16 px on web, 9.5 pt in print, 14 pt on slides.</p></div>
  <table class="t"><tr><th>Foreground / background</th><th>Sample</th><th>Ratio</th><th>Text</th><th>Large</th></tr>
   ${pairs.map((m) => `<tr><td>${C[m.fg].name} on ${C[m.bg].name}</td><td><span style="display:inline-block;padding:0.6mm 2.4mm;border-radius:1mm;background:${C[m.bg].hex};color:${C[m.fg].hex};font-weight:600">Aa</span></td><td>${m.ratio}:1</td><td><span class="tag ${m.normalText === 'AA' ? 'do' : 'dont'}">${m.normalText === 'AA' ? 'AA' : 'No'}</span></td><td><span class="tag ${m.largeText === 'AA' ? 'do' : 'dont'}">${m.largeText === 'AA' ? 'AA' : 'No'}</span></td></tr>`).join('')}
  </table></div>`);

P('', `<div class="c">${head('Colour in use', 'Light, dark and healthcare<span class="dot">.</span>', 'The same palette builds three moods. Mix them across a document for rhythm — dark for openings and statements, light for detail, sage for healthcare.')}
  <div class="grid g3" style="margin-top:8mm">
   ${[['ink', 'paper', 'Statement', 'Openings, closings, big ideas.'], ['paper', 'ink', 'Detail', 'Content, lists, forms, documents.'], ['sage', 'ink', 'Healthcare', 'Patient-facing and healthcare sections.']].map(([bg, fg, h, t]) => `<div style="background:${C[bg].hex};color:${C[fg].hex};border-radius:3mm;height:92mm;padding:7mm;display:flex;flex-direction:column;border:0.2mm solid var(--line)"><span class="eb" style="color:inherit;opacity:.75">${h}</span><span class="d" style="font-size:24pt;margin-top:auto;line-height:.95">One brand<span style="color:${bg === 'sage' ? C.teal.hex : C.accent.hex}">.</span></span><span class="small" style="margin-top:3mm;opacity:.8">${t}</span></div>`).join('')}
  </div><p class="small muted" style="margin-top:6mm">Print: CMYK values are approximations from sRGB. Always ask the printer for a hard proof on the actual stock; uncoated paper will dull Persimmon and darken Ink.</p></div>`);

/* ============================================================ 04 TYPE */
SEC('04', 'Typography');
divider('04', 'Typography', 'Crafted headlines, quiet text, one editorial accent.');
P('', `<div class="c" style="display:grid;grid-template-columns:1.6fr 1fr;gap:12mm">
  <div><div class="eb">Display · Bricolage Grotesque</div><div class="d" style="font-size:118pt;line-height:.85;margin-top:6mm">Aa Gg<br>Rr 47</div></div>
  <div style="align-self:end"><p class="lead">Bricolage Grotesque gives headlines a hand-crafted character — slightly idiosyncratic details that read as designed, not default.</p>
   <ul class="l small" style="margin-top:6mm"><li><b>Use</b> headlines, display numbers, logo, short labels in documents</li><li><b>Weights</b> Bold (700) for headings; Regular (400) rarely, for very large text</li><li><b>Tracking</b> −45 at display sizes, −20 at small headings</li><li><b>Leading</b> 0.88–1.02</li><li><b>Licence</b> SIL Open Font License 1.1</li></ul>
   <p class="mono muted" style="margin-top:4mm">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz 0123456789 &amp; ₹ ? !</p></div></div>`);

P('sand', `<div class="c" style="display:grid;grid-template-columns:1fr 1fr;gap:14mm">
  <div><div class="eb">Text · Instrument Sans</div><div style="font-family:IS;font-size:64pt;line-height:.95;margin-top:6mm;letter-spacing:-0.02em">Aa Gg</div>
   <p style="margin-top:6mm;font-size:11pt;line-height:1.55;max-width:120mm">Instrument Sans is crisp and neutral, and stays legible on small Android screens and in dense documents. It carries everything that is read rather than seen.</p>
   <ul class="l small" style="margin-top:5mm"><li><b>Weights</b> Regular 400, SemiBold 600, Bold 700</li><li><b>Leading</b> 1.5–1.65 for body; 1.2 for labels</li><li><b>Licence</b> SIL Open Font License 1.1</li></ul></div>
  <div><div class="eb">Accent · Newsreader Italic</div><div class="serif" style="font-size:64pt;line-height:.95;margin-top:6mm">the rest</div>
   <p style="margin-top:6mm;font-size:11pt;line-height:1.55">An editorial italic used for <span class="serif" style="font-size:13pt">one to three words</span> per page or slide — never for sentences, body text or UI.</p>
   <div class="card" style="margin-top:6mm"><span class="d" style="font-size:22pt">You care for patients. We take care of <span class="serif" style="color:var(--teal)">the rest</span>.</span></div></div></div>`);

const scale = [['Display XL', 'BG', '8rem / 64–120pt', '0.90', '−45', 'Hero lines, covers', '52pt'], ['Display L', 'BG', '5.25rem / 48–72pt', '0.94', '−40', 'Section openers, statements', '38pt'], ['H2', 'BG', '3.75rem / 32–44pt', '1.00', '−35', 'Page and slide titles', '26pt'], ['H3', 'BG', '1.9rem / 18–24pt', '1.12', '−20', 'Sub-sections, card titles', '17pt'], ['H4', 'BG', '1.3rem / 14–16pt', '1.20', '−12', 'Labels, list titles', '12.5pt'], ['Lead', 'IS', '1.375rem / 13–16pt', '1.50', '0', 'Intros, summaries', '12pt'], ['Body', 'IS', '1.0625rem / 9.5–11pt', '1.60', '0', 'Paragraphs', '9.5pt'], ['Small', 'IS', '0.875rem / 8–9pt', '1.45', '0', 'Captions, notes', '7.5pt'], ['Eyebrow', 'IS', '0.75rem / 7–8pt caps', '1.20', '+140', 'Section labels', '7pt']];
P('', `<div class="c">${head('Type scale', 'A clear hierarchy, sized for every medium<span class="dot">.</span>', '')}
  <table class="t" style="margin-top:6mm"><tr><th style="width:44%">Style</th><th>Web / print size</th><th>Leading</th><th>Tracking</th><th>Use</th></tr>
   ${scale.map(([n, f, s, l, t, u, show]) => `<tr><td><span style="font-family:${f};${f === 'BG' ? 'font-weight:700;letter-spacing:-0.03em;' : ''}font-size:${show};${n === 'Eyebrow' ? 'text-transform:uppercase;letter-spacing:.16em;font-weight:700;' : ''}line-height:1">${n}</span></td><td class="mono">${s}</td><td class="mono">${l}</td><td class="mono">${t}</td><td class="small">${u}</td></tr>`).join('')}
  </table><p class="small muted" style="margin-top:3mm">Web sizes are fluid (clamp) — see /05-Design-Tokens. Slides: titles 34–44 pt, body 14–18 pt, captions ≥ 10 pt.</p></div>`);

P('', `<div class="c">${head('Typography in use', 'Small habits that make the brand<span class="dot">.</span>', '')}
  <div class="grid g2" style="margin-top:8mm;gap:10mm">
   <div><span class="tag do">Do</span><div class="card" style="margin-top:3mm;height:52mm"><div class="eb">Section label</div><div class="d" style="font-size:26pt;margin-top:3mm">One partner, <span class="serif">not ten vendors</span><span class="dot">.</span></div><p class="small" style="margin-top:3mm">Sentence case. A Persimmon full stop on statements. One italic phrase. Left aligned.</p></div></div>
   <div><span class="tag dont">Don’t</span><div class="card" style="margin-top:3mm;height:52mm;text-align:center"><div style="font-family:Georgia;font-size:22pt;font-style:italic;color:var(--accent);text-transform:uppercase;letter-spacing:.1em">ONE PARTNER, NOT TEN VENDORS!!</div><p class="small" style="margin-top:4mm;font-family:Impact,Arial;font-size:11pt">All caps, centred, serif for the whole line, Persimmon body text, exclamation marks.</p></div></div>
  </div>
  <div class="grid g4" style="margin-top:8mm">${[['Sentence case', 'For every title and button. No Title Case.'], ['The full stop', 'Statements end with a Persimmon full stop. Content titles on slides do not end with a stop.'], ['Left aligned', 'Centre only very short lines on covers or profile icons.'], ['Measure', '45–75 characters per line for body text.']].map(([h, t]) => `<div class="rule"><div class="d h4">${h}</div><p class="small" style="margin-top:2mm">${t}</p></div>`).join('')}</div></div>`);

P('sand', `<div class="c">${head('Typography by platform', 'Same voice, different rooms<span class="dot">.</span>', '')}
  <table class="t" style="margin-top:7mm"><tr><th>Platform</th><th>Headings</th><th>Body</th><th>Notes</th></tr>
   ${[['Website', 'Bricolage Grotesque (web font, self-hosted)', 'Instrument Sans 16–17 px', 'Fluid scale from tokens; never below 16 px body'], ['Presentations', 'Bricolage Grotesque Bold 34–60 pt', 'Instrument Sans 14–18 pt', 'Install fonts; embed fonts when sharing the file'], ['Social media', 'Bricolage Grotesque Bold, ≥ 6% of canvas width', 'Instrument Sans ≥ 2.4% of width', 'Max ~12 words per frame'], ['Marketing & print', 'Bricolage Grotesque Bold 18–120 pt', 'Instrument Sans 9.5–11 pt', 'Embed fonts in PDFs'], ['Business documents (Word)', 'Bricolage Grotesque Bold 12–28 pt', 'Instrument Sans 10 pt / 15 pt', 'Fallback: Arial / Calibri if fonts unavailable'], ['Email & Google Workspace', 'Arial Bold (fallback)', 'Arial 10–11 pt', 'Brand fonts are not available in most email clients']].map((r) => `<tr><td class="d h4">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td class="muted">${r[3]}</td></tr>`).join('')}
  </table></div>`);

P('', `<div class="c" style="display:grid;grid-template-columns:1fr 1fr;gap:14mm">
  <div>${head('Fallbacks & licensing', 'Free to use, free to share<span class="dot">.</span>', '', '100%')}
   <p style="margin-top:6mm">All three typefaces are licensed under the <b>SIL Open Font License 1.1</b>: free for commercial use, embedding in PDFs and documents, and redistribution with the brand package. They may not be sold on their own. Licence texts are in /04-Typography/licences.</p></div>
  <table class="t"><tr><th>Typeface</th><th>Fallback stack (web)</th><th>Office fallback</th></tr>
   <tr><td class="d h4">Bricolage Grotesque</td><td class="mono">"Arial Narrow", Arial, sans-serif</td><td>Arial Bold</td></tr>
   <tr><td class="d h4">Instrument Sans</td><td class="mono">"Segoe UI", Roboto, Arial, sans-serif</td><td>Calibri / Arial</td></tr>
   <tr><td class="d h4">Newsreader Italic</td><td class="mono">Georgia, "Times New Roman", serif</td><td>Georgia Italic</td></tr></table></div>`);

/* ============================================================ 05 LAYOUT */
SEC('05', 'Layout, grid & spacing');
divider('05', 'Layout & spacing', 'Generous space, hard alignment, one focal point per composition.', 'sage');
const cols = (n, color) => Array.from({ length: n }, () => `<div style="background:${color};height:100%"></div>`).join('');
P('', `<div class="c">${head('Grids', 'Every format, one logic<span class="dot">.</span>', '')}
  <div class="grid g3" style="margin-top:8mm">
   <div><div style="height:62mm;border-radius:2mm;background:var(--white);padding:4mm 6mm;border:0.2mm solid var(--line)"><div style="display:grid;grid-template-columns:repeat(12,1fr);gap:1.4mm;height:100%">${cols(12, 'rgba(228,87,46,.12)')}</div></div><div class="d h4" style="margin-top:3mm">Web · 12 columns</div><p class="small">Max width 1440 px; gutter clamp(16–56 px); gap 16–32 px. 6 columns on tablet, 4 on mobile.</p></div>
   <div><div style="height:62mm;border-radius:2mm;background:var(--white);padding:4mm 5mm;border:0.2mm solid var(--line)"><div style="display:grid;grid-template-columns:repeat(12,1fr);gap:1.2mm;height:100%">${cols(12, 'rgba(30,107,88,.12)')}</div></div><div class="d h4" style="margin-top:3mm">Slides · 16:9</div><p class="small">13.33 × 7.5 in; 0.75 in margins; titles at y = 1.05 in; footer logo at y = 6.98 in.</p></div>
   <div><div style="height:62mm;width:44mm;border-radius:1mm;background:var(--white);padding:4mm;border:0.2mm solid var(--line)"><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1mm;height:100%">${cols(6, 'rgba(16,33,28,.08)')}</div></div><div class="d h4" style="margin-top:3mm">Print · A4</div><p class="small">16–20 mm margins; 6 or 12 columns; 5 mm gutter; 3 mm bleed; 5 mm safe area inside trim.</p></div>
  </div></div>`);

P('sand', `<div class="c" style="display:grid;grid-template-columns:1fr 1fr;gap:14mm">
  <div>${head('Spacing scale', 'Multiples of four<span class="dot">.</span>', 'Use the scale for every gap, padding and margin. Larger steps separate ideas; smaller steps group them.', '100%')}
   <p class="small" style="margin-top:6mm">Section rhythm on the web: clamp(72–160 px) top and bottom. Between a title and its content: 24–48 px. Between related items: 8–16 px.</p></div>
  <div>${[4, 8, 12, 16, 24, 32, 48, 64, 96, 128].map((v, i) => `<div style="display:grid;grid-template-columns:16mm 22mm 1fr;align-items:center;padding:1.6mm 0;border-top:0.2mm solid var(--line)"><span class="mono">space-${i + 1}</span><span class="mono muted">${v}px</span><span style="display:block;height:3mm;width:${v * 0.42}mm;background:${i === 4 ? C.accent.hex : C.ink.hex};border-radius:0.5mm"></span></div>`).join('')}</div></div>`);

const mini = (good) => good
  ? `<div style="position:relative;height:66mm;background:var(--paper);border-radius:2mm;border:0.2mm solid var(--line)"><div style="position:absolute;left:8mm;top:8mm">${logo('horizontal-full-colour', 'height:4mm;width:auto')}</div><div class="d" style="position:absolute;left:8mm;top:20mm;font-size:17pt;line-height:.95">One brand<span class="dot">.</span><br>Multiple solutions<span class="dot">.</span></div><p style="position:absolute;left:8mm;top:42mm;width:58mm;font-size:6.8pt;color:var(--ink2)">Brand, digital and technology under one roof.</p><span style="position:absolute;left:8mm;bottom:7mm;background:var(--ink);color:var(--paper);font-size:6.4pt;font-weight:600;padding:1.6mm 3.6mm;border-radius:9mm">Start a project</span><div style="position:absolute;right:8mm;top:20mm">${glyph('branding-identity', 'width:26mm;height:26mm')}</div></div>`
  : `<div style="position:relative;height:66mm;background:linear-gradient(135deg,#3b6fd8,#e4572e);border-radius:2mm;text-align:center;padding:3mm"><div style="display:flex;justify-content:center">${logo('horizontal-white', 'height:6mm;width:auto')}</div><div style="font-family:Georgia;color:#fff;font-size:14pt;margin-top:2mm;text-transform:uppercase">ONE BRAND MULTIPLE SOLUTIONS</div><p style="font-size:6.5pt;color:#fff;margin-top:1mm">Brand, digital and technology under one roof. Websites, apps, marketing, print, signage, events and more!!!</p><div style="display:flex;gap:1mm;justify-content:center;margin-top:2mm"><span style="background:#ff0;padding:1mm 2mm;font-size:6pt">CALL NOW</span><span style="background:#0f0;padding:1mm 2mm;font-size:6pt">WHATSAPP</span><span style="background:#fff;padding:1mm 2mm;font-size:6pt">ENQUIRE</span></div><div style="position:absolute;right:3mm;bottom:3mm;transform:rotate(-12deg)">${glyph('branding-identity', 'width:12mm;height:12mm')}</div></div>`;
P('', `<div class="c">${head('Composition', 'Good and poor balance<span class="dot">.</span>', '')}
  <div class="grid g2" style="margin-top:7mm;gap:10mm">
   <div><span class="tag do">Good</span><div style="margin-top:3mm">${mini(true)}</div><ul class="l small" style="margin-top:3mm"><li>One left edge shared by logo, headline, text and button</li><li>One focal point; one call to action; generous margins</li><li>Brand colours only; the accent used once</li></ul></div>
   <div><span class="tag dont">Poor</span><div style="margin-top:3mm">${mini(false)}</div><ul class="l small" style="margin-top:3mm"><li>Centred, cramped, no hierarchy; three competing CTAs</li><li>Off-brand gradient, serif caps, rotated icon</li><li>Logo too small to respect clear space</li></ul></div>
  </div></div>`);

P('', `<div class="c">${head('Proportion & negative space', 'Let one thing be big<span class="dot">.</span>', '')}
  <div class="grid g3" style="margin-top:8mm">
   ${[['Text + visual', '55 : 45', 'Copy on the left, visual on the right — the website and deck default.', '<div style="display:grid;grid-template-columns:55fr 45fr;gap:2mm;height:100%"><div style="display:grid;align-content:center;gap:1.4mm"><span style="height:3mm;width:80%;background:var(--ink);border-radius:1mm"></span><span style="height:3mm;width:60%;background:var(--ink);border-radius:1mm"></span><span style="height:1.6mm;width:90%;background:var(--paper3);border-radius:1mm"></span></div><div style="background:var(--paper2);border-radius:1.4mm"></div></div>'], ['Statement', '≥ 40% empty', 'One line of display type and a lot of space. Used for openers and closers.', '<div style="display:grid;align-content:end;height:100%"><span style="height:5mm;width:75%;background:var(--paper);border-radius:1mm"></span><span style="height:5mm;width:50%;background:var(--paper);border-radius:1mm;margin-top:1.4mm"></span></div>'], ['Showcase', '70 : 30', 'A large mock-up or image, one caption. Used for work and service examples.', '<div style="display:grid;grid-template-rows:70fr 30fr;gap:2mm;height:100%"><div style="background:var(--paper2);border-radius:1.4mm"></div><div><span style="display:block;height:2.4mm;width:50%;background:var(--ink);border-radius:1mm"></span></div></div>']].map(([h, r, t, art], i) => `<div><div style="height:58mm;border-radius:2mm;padding:6mm;background:${i === 1 ? 'var(--ink)' : 'var(--white)'};border:0.2mm solid var(--line)">${art}</div><div style="display:flex;justify-content:space-between;margin-top:3mm"><span class="d h4">${h}</span><span class="mono muted">${r}</span></div><p class="small" style="margin-top:1mm">${t}</p></div>`).join('')}
  </div><div class="grid g3" style="margin-top:8mm">${[['Responsive', 'Design at 360 px first; scale up. Stack columns below 900 px; keep 16 px side gutters; no horizontal scroll.'], ['Print', 'Respect 3 mm bleed and 5 mm safe area; 300 ppi images at final size; outline nothing — embed fonts.'], ['Alignment', 'Align to edges, not to centres. Share left edges across logo, title, body and buttons.']].map(([h, t]) => `<div class="rule"><div class="d h4">${h}</div><p class="small" style="margin-top:2mm">${t}</p></div>`).join('')}</div></div>`);

/* ============================================================ 06 VISUAL LANGUAGE */
SEC('06', 'Visual language');
divider('06', 'Visual language', 'A modular kit of shapes, crafted mock-ups and calm depth.');
const prims = ['sq', 'ci', 'ring', 'tl', 'tr', 'br', 'bl', 'ph', 'pv', 'dot'];
P('', `<div class="c">${head('Graphic elements', 'The mark is a kit of parts<span class="dot">.</span>', 'Ten primitives on an 18-unit cell build every glyph, pattern and supergraphic. Combine them on the 2 × 2 grid; never invent new shapes.')}
  <div class="grid" style="grid-template-columns:repeat(10,1fr);margin-top:8mm">${prims.map((p) => `<div style="text-align:center"><div class="surface" style="height:22mm;display:grid;place-items:center;background:var(--white)">${svgFile(`../06-Icons-and-Graphics/primitives-and-patterns/primitive-${p}.svg`, 'width:9mm;height:9mm')}</div><span class="mono muted">${p}</span></div>`).join('')}</div>
  <div class="grid g3" style="margin-top:8mm">${[['Supergraphic', 'The symbol, cropped off a corner at 150–250% of the page height. One per layout.', `<div style="position:relative;height:40mm;background:var(--ink);border-radius:2mm;overflow:hidden"><div style="position:absolute;right:-14mm;top:-12mm">${logo('symbol-reversed', 'height:58mm;width:auto')}</div></div>`], ['Pattern', 'Glyph grid tiles for backgrounds, packaging and merch. Low contrast only.', img('../06-Icons-and-Graphics/primitives-and-patterns/pattern-glyph-grid-paper.svg', 'height:40mm;width:100%;object-fit:cover;border-radius:2mm')], ['The Persimmon dot', 'Ends statements, marks eyebrows, highlights one cell. Small and singular.', `<div style="height:40mm;border-radius:2mm;background:var(--white);display:grid;place-items:center;border:0.2mm solid var(--line)"><span class="d" style="font-size:26pt">Complete support<span class="dot">.</span></span></div>`]].map(([h, t, art]) => `<div>${art}<div class="d h4" style="margin-top:3mm">${h}</div><p class="small">${t}</p></div>`).join('')}</div></div>`);

P('sand', `<div class="c" style="display:grid;grid-template-columns:.75fr 1.25fr;gap:12mm">
  <div>${head('Iconography', 'Service glyphs, not clip art<span class="dot">.</span>', 'Each of the 14 services has its own 2 × 2 glyph built from the primitives, with one accent cell.', '100%')}
   <ul class="l small" style="margin-top:6mm"><li>Solid fills only; no outlines except the “ring” primitive</li><li>Minimum 16 px / 5 mm; pair with a label below 24 px</li><li>Forest Ink with Persimmon (or Teal on healthcare)</li><li>For UI icons (arrow, phone, mail), use 1.8 px rounded strokes from the website set</li></ul></div>
  <div class="grid g5" style="row-gap:5mm">${Object.keys(glyphs).filter((g) => g !== 'brand-mark').map((g) => `<div style="text-align:center"><div style="height:26mm;border-radius:2mm;background:var(--paper);display:grid;place-items:center">${glyph(g, 'width:12mm;height:12mm')}</div><div class="small" style="margin-top:1.6mm;font-size:6.6pt">${g.replace(/-/g, ' ')}</div></div>`).join('')}</div></div>`);

P('', `<div class="c" style="display:grid;grid-template-columns:.85fr 1.15fr;gap:12mm">
  <div>${head('Illustration & mock-ups', 'Show the work, honestly<span class="dot">.</span>', 'Deliverables are shown as crafted, code-built objects — flat colour, rounded corners, one soft shadow, fictional names. Always caption concepts as concepts.', '100%')}
   <ul class="l small" style="margin-top:6mm"><li>Brand palette only; Marigold and Deep Teal allowed inside mock-ups</li><li>Slight rotation (−4° to +4°) when objects are layered</li><li>Fictional client: “Aarogya” — never imply real client work</li></ul></div>
  <div class="surface" style="position:relative">
   <div style="position:absolute;left:4mm;top:6mm;width:62%">${mock('opd-tv-displays', 'width:100%')}</div>
   <div style="position:absolute;right:2mm;top:24mm;width:34%">${mock('smart-automation', 'width:100%')}</div>
   <div style="position:absolute;left:26%;bottom:0;width:34%">${mock('patient-education', 'width:100%')}</div>
   <div style="position:absolute;left:2mm;bottom:4mm;width:30%">${mock('branding-identity', 'width:100%')}</div></div></div>`);

P('ink', `<div class="c" style="display:grid;grid-template-columns:1fr 1fr;gap:14mm">
  <div>${head('Photography direction', 'Real people, real places, natural light<span class="dot">.</span>', 'BFourU has no photography library yet. When commissioning, follow this direction.', '100%')}
   <ul class="l small" style="margin-top:6mm;color:var(--paper)"><li><b>Subjects</b> real teams, clients and spaces — doctors in their own clinics, founders at work</li><li><b>Light</b> natural daylight, soft and warm; avoid flash and blue clinical light</li><li><b>Colour</b> warm neutrals that sit with Ivory; slight warm grade; no heavy filters</li><li><b>Composition</b> leave clean space for type; eye-level; candid over posed</li><li><b>Consent</b> written consent for every identifiable person; never patients without explicit consent</li></ul></div>
  <div style="display:grid;gap:6mm;align-content:start">
   <div class="hair"><span class="tag do">Yes</span><p class="small" style="margin-top:2mm;color:var(--mist)">Doctor at her own desk by a window · a reception team mid-conversation · hands arranging printed material · an empty, well-lit waiting room</p></div>
   <div class="hair"><span class="tag dont">No</span><p class="small" style="margin-top:2mm;color:var(--mist)">Stock handshakes, stethoscope-on-laptop clichés, smiling models in scrubs, AI-generated people, blue-tinted “tech” overlays, before/after patient images</p></div>
   <div class="hair"><div class="d h4">Image treatment</div><p class="small" style="margin-top:2mm;color:var(--mist)">Rounded corners (radius 16–28 px) on the web; square crops in print; no duotones, no colour washes over faces.</p></div></div></div>`);

P('', `<div class="c">${head('Depth, texture & 3D', 'Calm depth, never decoration<span class="dot">.</span>', '')}
  <div class="grid g4" style="margin-top:8mm">
   ${[['Shadows', 'One soft, warm shadow: 0 12 32 −12 rgba(16,33,28,.22). Panels: 0 30 80 −30 at .35. Never black or hard.', '<div style="height:36mm;display:grid;place-items:center"><div style="width:60%;height:60%;border-radius:2mm;background:var(--white);box-shadow:0 3mm 8mm -3mm rgba(16,33,28,.3)"></div></div>'], ['Paper grain', 'A 5% multiply noise across web pages for a printed, warm feel. Optional in print.', `<div style="height:36mm;border-radius:2mm;background:var(--paper) url(${rel('../06-Icons-and-Graphics/primitives-and-patterns/paper-grain.svg')})"></div>`], ['Gradients', 'Not part of the identity. Only image-based grain or a soft radial vignette inside mock-ups.', '<div style="height:36mm;border-radius:2mm;background:var(--paper2);display:grid;place-items:center" class="small muted">no gradients</div>'], ['3D', 'Not used on the website or deck. If ever needed: matte materials in brand colours, the mark’s primitives as objects, slow ≤15° rotation.', '<div style="height:36mm;border-radius:2mm;background:var(--paper2);display:grid;place-items:center"><div style="width:16mm;height:16mm;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f08a66,#E4572E 55%,#a63a1b)"></div></div>']].map(([h, t, art]) => `<div>${art}<div class="d h4" style="margin-top:3mm">${h}</div><p class="small" style="margin-top:1mm">${t}</p></div>`).join('')}
  </div></div>`);

const bars = [42, 55, 48, 66, 72, 80];
P('sand', `<div class="c" style="display:grid;grid-template-columns:.8fr 1.2fr;gap:12mm">
  <div>${head('Data visualisation', 'Quiet charts, one highlight<span class="dot">.</span>', '', '100%')}
   <ul class="l small" style="margin-top:6mm"><li>Series order: Forest Ink, Care Teal, Stone, Marigold. Persimmon only for the one value that matters.</li><li>Label directly; avoid legends where possible</li><li>No 3D charts, no pies with more than 4 slices</li><li>Axis text Instrument Sans 7–9 pt, Ink 60; light hairline grid</li><li>Never publish numbers that are not sourced or measured</li></ul></div>
  <div class="card" style="display:grid;grid-template-columns:1.2fr 1fr;gap:8mm;align-items:end">
   <div><div class="d h4">Illustrative — monthly reach</div><div style="display:flex;gap:3mm;align-items:flex-end;height:60mm;margin-top:5mm;border-bottom:0.3mm solid var(--ink)">${bars.map((b, i) => `<div style="flex:1;height:${b}%;background:${i === 5 ? C.accent.hex : C.paper3.hex};border-radius:1mm 1mm 0 0"></div>`).join('')}</div><div style="display:flex;justify-content:space-between" class="small muted">${['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map((m) => `<span>${m}</span>`).join('')}</div></div>
   <div><div class="d h4">Illustrative — share</div><div style="width:44mm;height:44mm;border-radius:50%;margin-top:5mm;background:conic-gradient(${C.ink.hex} 0 45%, ${C.teal.hex} 45% 75%, ${C.paper3.hex} 75% 100%);display:grid;place-items:center"><div style="width:26mm;height:26mm;border-radius:50%;background:var(--white)"></div></div></div>
   <p class="cap" style="grid-column:1/-1">Example data only.</p></div></div>`);

/* ============================================================ 07 VOICE */
SEC('07', 'Voice & communication');
divider('07', 'Voice', 'Plain, specific, warm and honest — like a senior consultant who listens.', 'sage');
P('', `<div class="c">${head('Tone of voice', 'Four principles<span class="dot">.</span>', '')}
  <div class="grid g4" style="margin-top:8mm">${[['Plain', 'Short sentences, everyday words. If a client wouldn’t say it, we don’t write it.', 'We automate the reminders.', 'We leverage omnichannel automation synergies.'], ['Specific', 'Name the deliverable, the audience, the outcome.', 'Prescription pads, signage and a website with booking.', 'End-to-end 360° solutions.'], ['Warm', 'Speak to “you”. Be kind and direct.', 'Tell us what you have today. We’ll suggest what’s next.', 'Kindly revert at the earliest.'], ['Honest', 'No superlatives, no guarantees, no invented numbers.', 'We report honestly every month.', 'India’s No. 1 agency. 10X your patients!']].map(([h, t, y, n]) => `<div class="rule"><div class="d h3">${h}</div><p class="small" style="margin-top:2mm">${t}</p><div style="margin-top:4mm"><span class="tag do">Say</span><p class="small" style="margin-top:1.4mm">“${y}”</p></div><div style="margin-top:3mm"><span class="tag dont">Avoid</span><p class="small muted" style="margin-top:1.4mm">“${n}”</p></div></div>`).join('')}</div>
  <p class="small muted" style="margin-top:8mm">Writing style: Indian English spelling (organisation, colour, customised) · sentence case · numerals for 10+ · ₹ for prices · em dashes sparingly · one exclamation mark per year.</p></div>`);

P('sand', `<div class="c">${head('Writing by channel', 'The same voice, tuned to the room<span class="dot">.</span>', '')}
  <table class="t" style="margin-top:7mm"><tr><th style="width:17%">Channel</th><th style="width:40%">Guidance</th><th>Example</th></tr>
   ${[['Website', 'Lead with the customer’s problem, then the service. One CTA per section.', '“Most growing businesses are held together by a patchwork of vendors.”'], ['Social media', 'One idea per post; ≤ 12 words on the image; caption adds detail and a single CTA.', '“One brief beats ten vendors. Here’s why →”'], ['Advertising', 'Benefit + proof we can show + one action. No urgency we can’t justify.', '“Your brand, website and signage — from one team. WhatsApp us.”'], ['Proposals', 'Mirror the client’s words; recommend fewer services rather than more; be clear on scope.', '“You told us bookings mostly happen by phone. We recommend…”'], ['Client communication', 'Reply in the client’s channel; summarise decisions; name the next step and owner.', '“Approved: logo option B. Next: stationery drafts by Friday — Priya.”'], ['Calls to action', 'Start a project · WhatsApp us · Call · Build your brief · See our approach', 'Never: “Click here”, “Submit”, “Join waitlist”, “Hurry!”']].map((r) => `<tr><td class="d h4">${r[0]}</td><td>${r[1]}</td><td class="muted">${r[2]}</td></tr>`).join('')}
  </table></div>`);

P('sage', `<div class="c" style="display:grid;grid-template-columns:.9fr 1.1fr;gap:12mm">
  <div>${head('Healthcare communication', 'Ethical by default<span class="dot">.</span>', 'BFourU’s healthcare work follows NMC’s Guidelines on Ethical Advertising and Public Communication (October 2026), the DPDP Act 2023 / Rules 2025, and the company brief.', '100%')}
   <p class="small" style="margin-top:6mm">These describe our working principles, not legal advice. When in doubt, ask the doctor or the client’s legal adviser — and leave it out.</p></div>
  <div class="grid g2" style="gap:6mm;align-content:start">
   <div class="card"><span class="tag do">Always</span><ul class="l small" style="margin-top:3mm"><li>Clinical content approved by the treating doctor</li><li>Written consent for patient images, recordings and data</li><li>Factual profiles, services and timings</li><li>Plain, calm, multilingual where useful</li><li>“Concept” captions on illustrative work</li></ul></div>
   <div class="card"><span class="tag dont">Never</span><ul class="l small" style="margin-top:3mm"><li>“Best”, “No. 1”, “leading” or similar</li><li>Guarantees of cure, results or patient numbers</li><li>Patient testimonials used for promotion</li><li>Bought or solicited reviews, likes, followers</li><li>Chatbots giving medical advice or diagnoses</li></ul></div>
   <div class="card" style="grid-column:1/-1;background:var(--white)"><div class="d h4">Example</div><p class="small" style="margin-top:2mm"><b>Yes:</b> “Our paediatric OPD is open Monday to Saturday. Book online or WhatsApp us for a reminder.”<br><b>No:</b> “Best child specialist in the city — guaranteed recovery! See what our happy parents say.”</p></div></div></div>`);

P('', `<div class="c">${head('Words we use', 'A small, consistent vocabulary<span class="dot">.</span>', '')}
  <div class="grid g2" style="margin-top:8mm;gap:12mm">
   <div><span class="tag do">Prefer</span><div style="margin-top:4mm">${['partner', 'brief', 'one point of contact', 'customised quotation', 'project or subscription', 'non-clinical support', 'concept', 'approved by your doctor', 'start a project', 'patients (not leads)', 'clients', 'consistent'].map((w) => `<span class="chip">${w}</span>`).join('')}</div></div>
   <div><span class="tag dont">Avoid</span><div style="margin-top:4mm">${['synergy', '360°', 'cutting-edge', 'world-class', 'revolutionary', 'guaranteed', 'No. 1 / best', 'leverage', 'disrupt', 'hurry / limited slots', 'growth hacks', 'AI-powered (as a selling point)'].map((w) => `<span class="chip" style="text-decoration:line-through;color:var(--muted)">${w}</span>`).join('')}</div></div>
  </div><div class="card" style="margin-top:9mm;display:grid;grid-template-columns:auto 1fr;gap:6mm;align-items:center">${logo('symbol-full-colour', 'height:12mm;width:auto')}<p class="lead" style="color:var(--ink)">Spell the name <b>BFourU</b> — capital B, F and U. Never “Bfouru”, “BFOURU” (except in all-caps labels, where possible avoid the name) or “B4U”.</p></div></div>`);

/* ============================================================ 08 MOTION */
SEC('08', 'Motion');
const curve = (x1, y1, x2, y2, label) => `<div><svg viewBox="-6 -6 112 112" style="width:100%;height:46mm;background:var(--white);border-radius:2mm"><path d="M0 100 L100 100 M0 100 L0 0" stroke="#D8CFBE" stroke-width=".8"/><path d="M0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0" fill="none" stroke="${C.accent.hex}" stroke-width="2.4"/><circle cx="${x1 * 100}" cy="${100 - y1 * 100}" r="2" fill="${C.ink.hex}"/><circle cx="${x2 * 100}" cy="${100 - y2 * 100}" r="2" fill="${C.ink.hex}"/><path d="M0 100 L${x1 * 100} ${100 - y1 * 100} M100 0 L${x2 * 100} ${100 - y2 * 100}" stroke="${C.ink.hex}" stroke-width=".6" stroke-dasharray="2 2"/></svg><div class="d h4" style="margin-top:2mm">${label}</div><p class="mono muted">cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})</p></div>`;
divider('08', 'Motion', 'Smooth, calm and purposeful — motion explains, it never decorates.');
P('', `<div class="c" style="display:grid;grid-template-columns:1fr 1.15fr;gap:12mm">
  <div>${head('Principles & timing', 'Quick feedback, calm reveals<span class="dot">.</span>', '', '100%')}
   <div class="grid g2" style="margin-top:6mm;gap:4mm">${[['Purposeful', 'Every movement explains a change or guides attention.'], ['Calm', 'Ease-out, no bounce, no spin, no flashing.'], ['Continuous', 'Objects move to their new place rather than disappearing (Morph).'], ['Respectful', 'Honour reduced-motion settings; nothing auto-plays with sound.']].map(([h, t]) => `<div class="rule"><div class="d h4">${h}</div><p class="small" style="margin-top:1.6mm">${t}</p></div>`).join('')}</div>
   <table class="t" style="margin-top:6mm"><tr><th>Token</th><th>Duration</th><th>Use</th></tr>${[['feedback', '180 ms', 'hover, press, toggles'], ['short', '320 ms', 'colour changes, menus'], ['reveal', '700–900 ms', 'scroll reveals, panels'], ['scene', '1100–1250 ms', 'headline lines, Morph'], ['stagger', '60–110 ms', 'between sequenced items']].map((r) => `<tr><td class="mono">${r[0]}</td><td class="mono">${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table></div>
  <div class="grid g2" style="align-content:start;gap:6mm">${curve(0.2, 0.7, 0.1, 1, 'Standard — UI and reveals')}${curve(0.16, 1, 0.3, 1, 'Out — entrances and Morph-like moves')}
   <div class="card" style="grid-column:1/-1"><div class="d h4">Reduced motion</div><p class="small" style="margin-top:1.6mm">When the user prefers reduced motion: no reveals, no marquee, no parallax; content appears instantly; state changes still use a 0–120 ms opacity change.</p></div></div></div>`);

P('sand', `<div class="c">${head('Motion in use', 'One behaviour per element<span class="dot">.</span>', '')}
  <div class="grid g3" style="margin-top:7mm;row-gap:7mm">${[['Logo animation', 'The four cells rotate in from −90° and scale 40→100%, staggered 70 ms; the Persimmon circle lands last. Total ≤ 1.2 s. The wordmark fades in after.', 'brand-mark'], ['Typography reveals', 'Headline lines rise from 105% inside a mask, 1100 ms, stagger 110 ms. Body copy fades up 14 px after 350 ms.', 'creative-design'], ['Page transitions', 'Fade + 10 px rise, 600 ms, only on in-app navigation — never on first load.', 'website-app-development'], ['Scroll animations', 'Reveal once at 8% visibility: 28 px rise + fade, 700–900 ms. No scroll-jacking, no parallax on text.', 'digital-marketing'], ['Hover interactions', 'Buttons: Persimmon fills from below (420 ms) and the arrow swaps. Links: underline draws left→right (380 ms). Cards lift 3 px.', 'smart-automation'], ['Presentations', 'Morph between slides (1.25 s) with shared “!!” object names; on-click reveals using Fade, Float In, Wipe and Zoom only.', 'events-conferences'], ['Social motion', '6–10 s loops; each line holds ≥ 1.5 s; logo end-card 1.5 s; captions burned in; keep text in the centre 80% safe area.', 'photography-media'], ['3D motion', 'Not part of the current identity. If used: one slow rotation ≤ 15°, matte brand colours, never behind text.', 'printing-production'], ['Avoid', 'Bounce, elastic, spin, flash, typewriter effects, confetti, auto-playing sound, motion longer than 1.5 s for UI.', 'it-technical-solutions']].map(([h, t, g]) => `<div class="card"><div style="display:flex;gap:3mm;align-items:center">${glyph(g, 'width:8mm;height:8mm')}<span class="d h4">${h}</span></div><p class="small" style="margin-top:2.4mm">${t}</p></div>`).join('')}</div></div>`);

/* ============================================================ 09 APPLICATIONS */
SEC('09', 'Applications');
divider('09', 'Applications', 'How the system comes together — digital, print and spaces.');
P('sand', `<div class="c">${head('Stationery', 'Business card, letterhead, envelope<span class="dot">.</span>', '', '60%')}
  <div style="position:absolute;left:0;right:0;top:38mm;bottom:0">
   <div class="shadow" style="position:absolute;left:0;top:4mm;width:96mm;transform:rotate(-2deg)">${prev('letterhead', 'width:100%')}</div>
   <div class="shadow" style="position:absolute;left:108mm;top:0;width:68mm;transform:rotate(3deg)">${prev('business-card-front', 'width:100%')}</div>
   <div class="shadow" style="position:absolute;left:118mm;top:50mm;width:68mm;transform:rotate(-4deg)">${prev('business-card-back', 'width:100%')}</div>
   <div class="shadow" style="position:absolute;left:192mm;top:20mm;width:72mm">${prev('envelope-dl', 'width:100%')}</div>
   <div style="position:absolute;left:192mm;top:66mm;width:72mm" class="small"><b>Business card</b> 90 × 55 mm, 3 mm bleed, 350–400 gsm uncoated.<br><b>Letterhead</b> A4, office-printable (no bleed), 100–120 gsm.<br><b>Envelope</b> DL 220 × 110 mm.<br><span class="muted">Files: /07-Templates/print-ready</span></div></div></div>`);

P('', `<div class="c">${head('Identity & folders', 'ID cards and presentation folder<span class="dot">.</span>', '', '60%')}
  <div style="position:absolute;left:0;right:0;top:38mm;bottom:0">
   <div class="shadow" style="position:absolute;left:0;top:2mm;width:40mm">${prev('id-card-front', 'width:100%')}</div>
   <div class="shadow" style="position:absolute;left:46mm;top:10mm;width:40mm">${prev('id-card-back', 'width:100%')}</div>
   <div class="shadow" style="position:absolute;left:100mm;top:0;width:165mm">${prev('presentation-folder-outer', 'width:100%')}</div>
   <p class="small" style="position:absolute;left:0;top:80mm;width:90mm"><b>ID card</b> CR80 54 × 85.6 mm, portrait, with photo area and ID number.<br><b>Folder</b> outer spread shown flat; place on the printer’s dieline (pocket, spine) before production.</p></div></div>`);

P('sand', `<div class="c">${head('Business documents', 'Proposal, quotation, invoice<span class="dot">.</span>', 'Editable Word templates with styles: Title, Heading 1–2, Eyebrow, Small. Fields are placeholders — tax and payment details must be confirmed by your accountant.', '70%')}
  <div class="grid g4" style="margin-top:8mm">${['BFourU-Proposal-01', 'BFourU-Quotation-01', 'BFourU-Invoice-01', 'BFourU-Letterhead-01'].map((f) => `<div class="shadow">${office(f, 'width:100%;border-radius:1mm')}</div>`).join('')}</div></div>`);

P('', `<div class="c">${head('Marketing print', 'Brochure, flyer, poster, standee<span class="dot">.</span>', '', '60%')}
  <div style="display:flex;gap:6mm;align-items:flex-end;margin-top:8mm;height:118mm">
   <div class="shadow" style="height:100%">${prev('brochure-p1', 'height:100%')}</div>
   <div class="shadow" style="height:100%">${prev('brochure-p2', 'height:100%')}</div>
   <div class="shadow" style="height:100%">${prev('flyer-a4', 'height:100%')}</div>
   <div class="shadow" style="height:100%">${prev('poster-a3', 'height:100%')}</div>
   <div class="shadow" style="height:100%">${prev('standee-800x2000', 'height:100%')}</div></div>
  <p class="small muted" style="margin-top:4mm">Corporate brochure A4 (4 pp) · Flyer A4 · Poster A3 · Roll-up standee 800 × 2000 mm (keep content above the bottom 150 mm, which sits in the base).</p></div>`);

P('ink', `<div class="c">${head('Office signage', 'The brand you walk into<span class="dot">.</span>', '', '60%')}
  <div class="shadow" style="margin-top:8mm;width:180mm">${prev('signage-reception-wall', 'width:100%;border-radius:1mm')}</div>
  <div class="shadow" style="position:absolute;right:0;top:46mm;width:80mm">${prev('signage-door-300x100', 'width:100%;border-radius:1mm')}</div>
  <p class="small" style="position:absolute;right:0;top:80mm;width:80mm;color:var(--mist)">Reception wall 2400 × 900 mm (reversed logo, dimensional letters or print). Door and department signs 300 × 100 mm on Warm White acrylic. Use the symbol at entrances; full logo at reception.</p></div>`);

P('', `<div class="c" style="display:grid;grid-template-columns:1.3fr 1fr;gap:12mm">
  <div>${head('Website', 'The reference implementation<span class="dot">.</span>', '', '100%')}<div class="shadow" style="margin-top:6mm">${shot('home-1440.jpg', 'width:100%;border-radius:2mm')}</div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:5mm;align-content:start;margin-top:6mm">
   <div class="shadow">${shot('home-390.jpg', 'width:100%;border-radius:3mm')}</div>
   <div><ul class="l small"><li>Built from the tokens in /05-Design-Tokens</li><li>Mobile first: 16 px gutters, thumb-zone actions, no horizontal scroll</li><li>One CTA verb; WhatsApp as a primary channel</li><li>Prerendered, self-hosted fonts, no trackers</li><li>Favicon and social images from /02-Logo</li></ul></div></div></div>`);

P('sand', `<div class="c">${head('Social media', 'Instagram, LinkedIn, Facebook<span class="dot">.</span>', 'Editable PowerPoint templates at each platform size. Swap text and glyphs; keep the margins, logo position and one-idea-per-frame rule.', '70%')}
  <div style="display:flex;gap:5mm;align-items:flex-end;margin-top:7mm;height:96mm">
   ${['BFourU-Social-Square-1080-01', 'BFourU-Social-Square-1080-03', 'BFourU-Social-Portrait-1080x1350-02', 'BFourU-Social-Story-1080x1920-01'].map((f) => `<div class="shadow" style="height:${f.includes('Story') ? 100 : f.includes('Portrait') ? 82 : 66}%">${office(f, 'height:100%;border-radius:1.5mm')}</div>`).join('')}
   <div class="shadow" style="height:46%">${office('BFourU-Social-Landscape-1200x627-02', 'height:100%;border-radius:1.5mm')}</div></div>
  <p class="small muted" style="margin-top:4mm">Sizes: 1080 × 1080 feed · 1080 × 1350 portrait · 1080 × 1920 stories and reel covers (keep text out of the top/bottom 250 px) · 1200 × 627 LinkedIn / Facebook / ads.</p></div>`);

P('', `<div class="c" style="display:grid;grid-template-columns:1.25fr 1fr;gap:12mm">
  <div>${head('Presentations', 'PowerPoint master template<span class="dot">.</span>', 'Eight layouts with placeholders: Cover, Section Divider, Title and Content, Two Columns, Image Right, Statement, Healthcare (Sage), Closing.', '100%')}
   <div class="grid g2" style="margin-top:6mm;gap:4mm">${['01', '02', '03', '06'].map((n) => `<div class="shadow">${office('BFourU-Presentation-Master-' + n, 'width:100%;border-radius:1mm')}</div>`).join('')}</div></div>
  <div style="align-self:end"><ul class="l small"><li>One message per slide; titles in sentence case</li><li>Alternate dark statements and light detail slides</li><li>Morph transitions, on-click reveals (section 08)</li><li>Install the fonts, then <b>File › Options › Save › Embed fonts</b> before sharing</li><li>The healthcare deck is the reference example of this system</li></ul></div></div>`);

P('sand', `<div class="c" style="display:grid;grid-template-columns:1fr 1fr;gap:12mm">
  <div>${head('Email & digital documents', 'Signature, proposals, digital brochure<span class="dot">.</span>', '', '100%')}
   <ul class="l small" style="margin-top:6mm"><li><b>Email signature</b> HTML template in /07-Templates/email — Arial fallback, 1× logo PNG hosted on the website, no images-only signatures</li><li><b>Online proposals</b> export the Word proposal to PDF (fonts embedded); file name: BFourU-Proposal-Client-YYYY-MM</li><li><b>Digital brochure</b> the corporate brochure PDF is screen-ready; for WhatsApp, share the 2-page summary or the flyer</li><li><b>Video</b> logo end-card on Forest Ink, 1.5 s; captions in Instrument Sans SemiBold on a 60% Ink bar</li></ul></div>
  <div class="card" style="align-self:center;background:var(--white)">
   <div style="font-family:Arial;font-size:9pt;line-height:1.5;color:var(--ink)"><b style="font-size:10.5pt">Name Surname</b><br><span style="color:var(--muted)">Designation · BFourU</span><div style="margin:3mm 0">${logo('horizontal-full-colour', 'height:6mm;width:auto')}</div><span style="color:var(--ink2)">T +91 91829 70829 · WhatsApp +91 91829 70829<br>E pramod.pramod.949@gmail.com · W www.bfouru.com</span><div style="margin-top:3mm;color:var(--muted);font-size:7.5pt">One Brand. Multiple Solutions. Complete Support.</div></div></div></div>`);

/* ============================================================ 10 HEALTHCARE & INDUSTRIES */
SEC('10', 'Healthcare & industries');
divider('10', 'Healthcare & industries', 'One master brand that adapts — never a separate identity.', 'sage');
P('', `<div class="c" style="display:grid;grid-template-columns:.9fr 1.1fr;gap:12mm">
  <div>${head('The healthcare tint', 'Same brand, calmer tone<span class="dot">.</span>', 'Healthcare material uses the same logo, type and layouts. Only the emphasis shifts.', '100%')}
   <table class="t" style="margin-top:6mm"><tr><th></th><th>Master</th><th>Healthcare</th></tr><tr><td class="d h4">Surface</td><td>Ivory / Ink</td><td>Sage / Ivory / Ink</td></tr><tr><td class="d h4">Accent</td><td>Persimmon</td><td>Care Teal (+ Persimmon dot)</td></tr><tr><td class="d h4">Line</td><td>One brand. Multiple solutions…</td><td>You care for patients…</td></tr><tr><td class="d h4">Glyph</td><td>Persimmon cell</td><td>Teal cell allowed</td></tr><tr><td class="d h4">Copy</td><td>Voice guide</td><td>+ healthcare rules (p. 48)</td></tr></table></div>
  <div class="surface" style="background:var(--sage);position:relative">${scene('reception', 'position:absolute;left:4%;top:6%;width:92%')}<p class="cap" style="position:absolute;left:6mm;bottom:4mm">Concept — fictional clinic “Aarogya”, not client work</p></div></div>`);

P('sand', `<div class="c">${head('Healthcare applications', 'Deck, brochure, proposal, social, campaign<span class="dot">.</span>', 'BFourU’s own healthcare material — shown to explain the system, not as client projects.', '75%')}
  <div class="grid g3" style="margin-top:7mm;row-gap:6mm">
   ${[['Business presentation', img('../../presentation/output/slide-previews/slide-07.jpg', 'width:100%;border-radius:1.5mm')], ['Service brochure spread', img('../../presentation/output/slide-previews/slide-15.jpg', 'width:100%;border-radius:1.5mm')], ['Proposal for doctors & hospitals', office('BFourU-Proposal-01', 'width:60%;margin:0 auto;border-radius:1mm')], ['Healthcare social post', office('BFourU-Social-Square-1080-03', 'width:58%;margin:0 auto;border-radius:1.5mm')], ['Campaign key visual', scene('social', 'width:100%')], ['Digital marketing service material', img('../../presentation/output/slide-previews/slide-12.jpg', 'width:100%;border-radius:1.5mm')]].map(([h, art]) => `<div><div class="shadow" style="height:46mm;display:grid;place-items:center;overflow:hidden">${art}</div><div class="d h4" style="margin-top:2.4mm">${h}</div></div>`).join('')}
  </div></div>`);

P('', `<div class="c">${head('Other industries', 'Flexible enough for any sector<span class="dot">.</span>', 'The master brand stays constant. Each sector changes only the subject matter, the glyph and — sparingly — the supporting colour.', '75%')}
  <div class="grid g4" style="margin-top:8mm">
   ${[['Startups', 'brand launch', 'branding-identity', 'paper', 'Launch with a brand that looks established.'], ['Retail & D2C', 'merchandise & packaging', 'customized-merchandise', 'paper2', 'Packaging, merch and social that match.'], ['Education & events', 'conferences', 'events-conferences', 'ink', 'One event brand, from invite to certificate.'], ['Corporate & SMEs', 'always-on presence', 'digital-marketing', 'white', 'Monthly content without hiring in-house.']].map(([h, s, g, bg, t]) => `<div><div style="height:84mm;border-radius:2mm;padding:6mm;background:${C[bg].hex};color:${bg === 'ink' ? C.paper.hex : C.ink.hex};display:flex;flex-direction:column;border:0.2mm solid var(--line)">${glyph(g, 'width:14mm;height:14mm', bg === 'ink')}<span class="eb" style="margin-top:auto;color:inherit;opacity:.7">${s}</span><span class="d" style="font-size:17pt;margin-top:2mm;line-height:1">${t}</span><div style="margin-top:5mm">${logo(bg === 'ink' ? 'horizontal-reversed' : 'horizontal-full-colour', 'height:4mm;width:auto')}</div></div><div class="d h4" style="margin-top:3mm">${h}</div></div>`).join('')}
  </div><p class="small muted" style="margin-top:6mm">Examples show BFourU’s own communication for each sector. Do not create sub-brands or new logos per industry.</p></div>`);

/* ============================================================ 11 PRODUCTION */
SEC('11', 'Production & assets');
P('sand', `<div class="c">${head('Print production', 'Getting it right on paper<span class="dot">.</span>', '')}
  <div class="grid g3" style="margin-top:8mm">${[['Bleed & safe area', '3 mm bleed on all edge-to-edge items; keep text 5 mm inside trim (7 mm on business cards). Letterhead and envelope are designed without bleed for office printing.'], ['Colour', 'Supplied PDFs are RGB with embedded fonts. Ask the printer to convert to their CMYK profile and supply a hard proof. Approve Persimmon and Forest Ink on the actual stock.'], ['Resolution & files', 'Images 300 ppi at final size (150 ppi for large-format viewed from > 2 m). Logos always vector (SVG/PDF). Never place PNG logos in print.'], ['Paper', 'Uncoated warm white or natural stocks suit the brand. Business cards 350–400 gsm; brochures 170 gsm text, 300 gsm cover.'], ['Finishes', 'Optional: blind emboss of the symbol, Persimmon edge paint on cards. Avoid gloss lamination and foil.'], ['Large format', 'Standees and signage are supplied at 1:1 vector size. Confirm the hardware’s visible area and base height with the vendor.']].map(([h, t]) => `<div class="rule"><div class="d h3">${h}</div><p class="small" style="margin-top:2.4mm">${t}</p></div>`).join('')}</div></div>`);

const tree = [['01-Brand-Guidelines', 'This PDF + editable HTML source'], ['02-Logo', 'SVG masters, PNG (600/1200/2400 w), PDF, favicon, social icons'], ['03-Colour', 'Colour specification, contrast matrix, swatch values'], ['04-Typography', 'TTF font files, OFL licences, type guide'], ['05-Design-Tokens', 'bfouru-tokens.css, bfouru-tokens.json'], ['06-Icons-and-Graphics', 'Service glyphs, primitives, patterns, paper grain'], ['07-Templates', 'PowerPoint master, social, Word documents, print-ready PDFs, email signature'], ['08-Mockups', 'Application renders for presentations and pitches'], ['09-Motion', 'Motion guidelines and CSS motion tokens'], ['10-Licensing', 'Font and asset licensing notes']];
P('', `<div class="c" style="display:grid;grid-template-columns:.8fr 1.2fr;gap:12mm">
  <div>${head('Asset package', 'Where everything lives<span class="dot">.</span>', 'Folders are named by task so designers, developers, marketing teams and agencies can find what they need without asking.', '100%')}
   <p class="small" style="margin-top:6mm"><b>Licensing.</b> Fonts: SIL Open Font License 1.1 (commercial use and redistribution permitted). Logo, glyphs, patterns, templates and mock-ups: © BFourU, for BFourU and its approved partners only. No third-party stock imagery is included.</p></div>
  <div>${tree.map(([f, d]) => `<div style="display:grid;grid-template-columns:58mm 1fr;padding:2.6mm 0;border-top:0.2mm solid var(--line)"><span class="mono" style="font-size:8pt">/${f}</span><span class="small">${d}</span></div>`).join('')}</div></div>`);

P('ink', `
  <div style="position:absolute;left:var(--M);top:16mm">${logo('horizontal-reversed', 'height:9mm;width:auto')}</div>
  <div class="d" style="position:absolute;left:var(--M);top:62mm;font-size:46pt;line-height:.92">When in doubt,<br><span class="serif" style="color:var(--mari)">leave space</span><span class="dot">.</span></div>
  <div style="position:absolute;left:var(--M);bottom:22mm;color:var(--mist);font-size:9pt;line-height:1.7">Brand questions and approvals<br><span style="color:var(--paper)">+91 91829 70829 · pramod.pramod.949@gmail.com</span><br>Version 1.0 · November 2026 · Review annually</div>
  <div style="position:absolute;right:-30mm;bottom:-34mm">${logo('symbol-reversed', 'height:150mm;width:auto')}</div>`, { plain: true });

/* ============================================================ render */
const total = pages.length;
const html = `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><title>BFourU Brand Guidelines</title><link rel="stylesheet" href="guide.css"></head><body>
${pages.map((p, i) => `<section class="page ${p.cls}" data-n="${i + 1}">${p.html}${p.plain ? '' : `<div class="run"><span><b>BFourU</b> Brand guidelines</span><span>${p.section}</span></div><div class="foot"><span>One Brand. Multiple Solutions. Complete Support.</span><span>${String(i + 1).padStart(2, '0')} / ${total}</span></div>`}</section>`).join('\n')}
</body></html>`;
fs.writeFileSync(R('guidelines/guidelines.html'), html.replace(/\{\{p(\d\d)\}\}/g, (_, n) => secStart[n]));

(async () => {
  const b = await launch();
  try {
    // website screenshots for the Website page (requires the site preview on :4173)
    fs.mkdirSync(R('previews/web'), { recursive: true });
    if (!fs.existsSync(R('previews/web/home-1440.jpg'))) {
      await b.open('http://localhost:4173/', 1440, 900, 1); await b.sleep(3000); await b.png(R('previews/web/home-1440.jpg'), { x: 0, y: 0, width: 1440, height: 900 });
      await b.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }); await b.send('Page.reload'); await b.sleep(2500);
      await b.png(R('previews/web/home-390.jpg'), { x: 0, y: 0, width: 390, height: 844 });
    }
    await b.open(R('guidelines/guidelines.html'), 1123, 794, 1);
    await b.sleep(1500);
    const outDir = R('../01-Brand-Guidelines'); fs.mkdirSync(outDir, { recursive: true });
    await b.pdf(path.join(outDir, 'BFourU-Brand-Guidelines-v1.0.pdf'));
    // page previews for QA
    fs.rmSync(R('previews/guide'), { recursive: true, force: true }); fs.mkdirSync(R('previews/guide'), { recursive: true });
    const rects = await b.eval(`[...document.querySelectorAll('.page')].map(p => { const r = p.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height }; })`);
    for (let i = 0; i < rects.length; i++) await b.png(R(`previews/guide/p${String(i + 1).padStart(2, '0')}.jpg`), { ...rects[i], scale: 1.4 });
    console.log('pages:', total);
  } finally { b.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
