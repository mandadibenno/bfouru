/** BFourU launch-month social content — builds artboards.html and renders every post to PNG with headless Chrome.
 *  Run from this folder:  node build.cjs   (Node 22+, Google Chrome installed) */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');

const BRAND = path.resolve(__dirname, '../..');
const OUT = path.resolve(__dirname, '..');
const svg = (p, style = '') => fs.readFileSync(path.join(BRAND, p), 'utf8').replace(/<title>.*?<\/title>/s, '').replace(/<\?xml.*?\?>/, '').replace('<svg ', `<svg style="${style}" `);
const logo = (v, h) => svg(`02-Logo/svg/bfouru-${v}.svg`, `height:${h}px;width:auto;display:block`);
const glyph = (g, s, rev) => svg(`06-Icons-and-Graphics/service-glyphs/${g}${rev ? '-reversed' : ''}.svg`, `width:${s}px;height:${s}px;display:block`);
const dot = '<span class="dot">.</span>';
const WEB = 'www.bfouru.com';
const WA = '+91 91829 70829';

/* ---------- shared pieces ---------- */
const foot = (tone, extra = '') => `<div class="foot">${logo(tone === 'ink' ? 'horizontal-reversed' : 'horizontal-full-colour', 46)}<span>${extra || WEB}</span></div>`;
const eb = (t) => `<div class="eb">${t}</div>`;
const corner = (tone, size = 170, r = 96, t = 80) => `<div style="position:absolute;right:${r}px;top:${t}px;opacity:${tone === 'ink' ? 1 : 0.07}">${logo(tone === 'ink' ? 'symbol-reversed' : 'symbol-mono-ink', size)}</div>`;
const ab = [];
const A = (file, w, h, tone, html) => ab.push({ file, w, h, tone, html });

/* ============================ FEED POSTS 1080×1350 ============================ */
const F = (file, tone, html) => A(`posts/${file}`, 1080, 1350, tone, html);

// 01 Intro statement
F('01-hello-we-are-bfouru', 'ink', `${corner('ink')}
  <div class="pad" style="top:96px">${eb('Hello, we’re BFourU')}</div>
  <div class="d" style="position:absolute;left:96px;bottom:330px;font-size:132px;line-height:.9">One brand${dot}<br>Multiple<br>solutions${dot}<br>Complete<br>support${dot}</div>
  <p class="lead" style="position:absolute;left:96px;bottom:200px;width:760px">Brand, digital, technology, spaces and events — from one accountable team.</p>
  ${foot('ink')}`);

// 02 Problem: vendor patchwork
const vendors = ['Designer', 'Printer', 'Web developer', 'Sign-maker', 'Social media person', 'IT support'];
F('02-too-many-vendors', 'paper', `
  <div class="pad" style="top:96px">${eb('Sound familiar?')}</div>
  <div style="position:absolute;left:96px;top:190px;right:96px">${vendors.map((v, i) => `<div class="strike" style="font-size:58px;margin-top:${i ? 14 : 0}px">${v}</div>`).join('')}
   <div class="d" style="font-size:44px;margin-top:26px;color:var(--muted)">…and you in the middle.</div></div>
  <div style="position:absolute;left:96px;right:96px;bottom:190px;border-top:3px solid var(--ink);padding-top:34px;display:flex;justify-content:space-between;align-items:flex-end">
   <div class="d" style="font-size:86px;line-height:.92">One partner<br><span class="serif">instead</span>${dot}</div>${glyph('brand-mark', 150)}</div>
  ${foot('paper')}`);

// 04 Branding & identity
const svc = (file, tone, cluster, g, title, line, items, note = '') => F(file, tone, `
  <div class="pad" style="top:96px;display:flex;justify-content:space-between;align-items:flex-start">${eb(cluster)}${glyph(g, 190, tone === 'ink')}</div>
  <div class="d" style="position:absolute;left:96px;top:330px;width:880px;font-size:96px;line-height:.93">${title}</div>
  <p class="lead" style="position:absolute;left:96px;top:${title.split('<br>').length > 2 ? 650 : 560}px;width:820px">${line}</p>
  <div style="position:absolute;left:96px;right:96px;bottom:190px">${items.map((t) => `<div class="li">${t}</div>`).join('')}${note ? `<p class="note">${note}</p>` : ''}</div>
  ${foot(tone)}`);
svc('04-service-branding-identity', 'paper', 'Branding & identity', 'branding-identity', `Your brand,<br>everywhere<br>it <span class="serif">shows up</span>${dot}`, 'An identity people recognise — on a screen, a signboard or a prescription pad.', ['Logo and complete brand identity', 'Visiting cards, letterheads, ID cards', 'Doctor profiles and prescription pads', 'Brand guidelines your whole team can follow']);

// 05 Tip: brand consistency check
F('05-tip-brand-consistency-check', 'sand', `
  <div class="pad" style="top:96px">${eb('Quick check')}</div>
  <div class="d" style="position:absolute;left:96px;top:170px;width:880px;font-size:92px;line-height:.93">Does your brand look the same in all <span class="serif">five</span> places${dot}</div>
  <div style="position:absolute;left:96px;right:96px;top:520px">${['Visiting card', 'Signboard', 'Website', 'WhatsApp Business profile', 'Social media posts'].map((t, i) => `<div class="check"><span class="box"></span><span class="d" style="font-size:52px">${t}</span><span class="n">0${i + 1}</span></div>`).join('')}</div>
  <p class="lead" style="position:absolute;left:96px;bottom:190px;width:860px">Same logo, same colours, same name spelling? If not, people notice — even if they can’t say why.</p>
  ${foot('sand')}`);

// 06 Healthcare promise
F('06-healthcare-you-care-for-patients', 'sage', `
  <div class="pad" style="top:96px">${eb('For doctors, clinics & hospitals')}</div>
  <div class="d" style="position:absolute;left:96px;top:180px;width:900px;font-size:118px;line-height:.9">You care for patients${dot}<br>We take care of <span class="serif" style="color:var(--teal)">the rest</span>${dot}</div>
  <div style="position:absolute;left:96px;right:96px;bottom:200px;display:grid;grid-template-columns:1fr 1fr;column-gap:36px">${[['branding-identity', 'Clinic branding'], ['website-app-development', 'Website & booking'], ['opd-tv-displays', 'OPD TV displays'], ['patient-education', 'Patient education'], ['smart-automation', 'Appointment reminders'], ['interior-branding-signage', 'Signage & wayfinding']].map(([g, t]) => `<div class="gi">${glyph(g, 58)}<span>${t}</span></div>`).join('')}</div>
  ${foot('sage', 'Non-clinical support')}`);

// 07 Websites & apps
svc('07-service-websites-apps', 'paper', 'Websites & apps', 'website-app-development', `Most people<br>meet you on<br>a <span class="serif">phone</span> first${dot}`, 'Fast, accessible websites and apps that make it easy to find you, trust you and book you.', ['Built for phones first', 'Enquire, book or WhatsApp in one tap', 'Clear services, timings and location', 'Easy for your team to update']);

// 08 OPD TV displays
svc('08-healthcare-opd-tv-displays', 'ink', 'OPD TV & digital displays', 'opd-tv-displays', `Turn waiting<br>time into<br><span class="serif" style="color:var(--mari)">useful</span> time${dot}`, 'Calm, on-brand screens for your waiting area.', ['Token and queue information', 'Doctor schedules and clinic timings', 'Health awareness content', 'Branded, scheduled and easy to update'], 'All health content is reviewed and approved by your doctors before it goes on screen.');

// 09 Process
const steps = [['Understand', 'We listen first.'], ['Shape the solution', 'Only what you need, with a clear quotation.'], ['Plan & design', 'On one consistent brand system.'], ['Review & approve', 'Nothing goes live without your sign-off.'], ['Execute & deliver', 'Through one point of contact.'], ['Ongoing support', 'Monthly content and upkeep, where agreed.']];
F('09-how-we-work', 'paper', `
  <div class="pad" style="top:96px">${eb('How we work')}</div>
  <div class="d" style="position:absolute;left:96px;top:170px;font-size:84px;line-height:.93">One brief.<br>Six steps.<br>One team${dot}</div>
  <div class="compact" style="position:absolute;left:96px;right:96px;top:450px">${steps.map(([h, t], i) => `<div class="step"><span class="sn">0${i + 1}</span><span class="d" style="font-size:44px">${h}</span><span class="st">${t}</span></div>`).join('')}</div>
  ${foot('paper')}`);

// 10 Smart automation
F('10-service-smart-automation', 'ink', `
  <div class="pad" style="top:96px">${eb('Smart automation')}</div>
  <div style="position:absolute;left:96px;top:190px">${['Appointment reminders', 'Booking confirmations', 'Enquiry replies', 'Follow-ups'].map((t) => `<div class="d" style="font-size:66px;line-height:1.12;color:var(--mist)">${t}<span style="color:var(--mist)">…</span></div>`).join('')}</div>
  <div class="d" style="position:absolute;left:96px;top:600px;width:880px;font-size:118px;line-height:.9">Let them<br>run <span class="serif" style="color:var(--mari)">themselves</span>${dot}</div>
  <p class="lead" style="position:absolute;left:96px;bottom:200px;width:760px">WhatsApp and SMS automations that take repetitive follow-up off your team — set up around how you already work.</p>
  ${foot('ink')}`);

// 11 Healthcare ethics checklist
F('11-healthcare-before-you-post', 'sage', `
  <div class="pad" style="top:96px">${eb('For doctors & clinics')}</div>
  <div class="d" style="position:absolute;left:96px;top:170px;width:880px;font-size:88px;line-height:.93">Before your clinic posts online, <span class="serif" style="color:var(--teal)">check five things</span>${dot}</div>
  <div style="position:absolute;left:96px;right:96px;top:500px">${['Clinical content is approved by the treating doctor', 'Written consent for any patient photo, video or story', 'No “best”, “No. 1” or guaranteed results', 'No paid, bought or requested reviews', 'Facts people need: services, timings, how to book'].map((t, i) => `<div class="step" style="grid-template-columns:72px 1fr"><span class="sn" style="color:var(--teal)">0${i + 1}</span><span style="font-size:36px;line-height:1.25;font-weight:600">${t}</span></div>`).join('')}</div>
  <p class="note" style="position:absolute;left:96px;bottom:178px;width:880px">General guidance, not legal advice. Follow the current NMC guidance for your practice.</p>
  ${foot('sage')}`);

// 12 CTA
F('12-start-a-project', 'ink', `${corner('ink')}
  <div class="pad" style="top:96px">${eb('Let’s talk')}</div>
  <div class="d" style="position:absolute;left:96px;top:440px;width:900px;font-size:112px;line-height:.9">Tell us what you have today${dot}<br><span class="serif" style="color:var(--mari)">We’ll suggest what’s next.</span></div>
  <div style="position:absolute;left:96px;bottom:200px;display:flex;gap:20px">
   <span class="btn">Start a project →</span><span class="btn ghost"><i></i>WhatsApp ${WA}</span></div>
  ${foot('ink')}`);

/* ============================ CAROUSEL (post 03) ============================ */
const clusters = [
  ['01', 'Brand & Creative', 'How do we look and sound?', [['branding-identity', 'Branding & identity'], ['creative-design', 'Creative design'], ['photography-media', 'Photography & media']]],
  ['02', 'Digital & Web', 'How do people find us online?', [['digital-marketing', 'Digital marketing'], ['website-app-development', 'Websites & apps']]],
  ['03', 'Technology & Automation', 'How do our operations run?', [['smart-automation', 'Smart automation'], ['clinic-management-software', 'Clinic management software'], ['opd-tv-displays', 'OPD TV & displays'], ['it-technical-solutions', 'IT & technical solutions']]],
  ['04', 'Spaces & Print', 'How do we show up physically?', [['interior-branding-signage', 'Interior branding & signage'], ['printing-production', 'Printing & production'], ['customized-merchandise', 'Customised merchandise']]],
  ['05', 'Events & Education', 'How do we communicate at key moments?', [['events-conferences', 'Events & conferences'], ['patient-education', 'Patient education']]],
];
const C = (file, tone, html) => A(`carousel-03-what-we-do/${file}`, 1080, 1350, tone, html);
C('slide-01-cover', 'ink', `${corner('ink')}
  <div class="pad" style="top:96px">${eb('What we do')}</div>
  <div class="d" style="position:absolute;left:96px;top:420px;font-size:150px;line-height:.88">14 services${dot}<br>5 areas${dot}<br><span class="serif" style="color:var(--mari)">One team</span>${dot}</div>
  <div class="swipe">Swipe →</div>${foot('ink')}`);
clusters.forEach(([n, name, q, items], i) => C(`slide-0${i + 2}-${name.toLowerCase().replace(/[^a-z]+/g, '-')}`, i % 2 ? 'sand' : 'paper', `
  <div class="pad" style="top:96px;display:flex;justify-content:space-between"><span class="big-n">${n}</span><span class="pg">${i + 2} / 7</span></div>
  <div class="d" style="position:absolute;left:96px;top:300px;width:900px;font-size:104px;line-height:.92">${name}${dot}</div>
  <p class="serif" style="position:absolute;left:96px;top:${name.length > 16 ? 540 : 440}px;width:880px;font-size:52px;color:var(--ink2)">“${q}”</p>
  <div style="position:absolute;left:96px;right:96px;bottom:190px">${items.map(([g, t]) => `<div class="gi big">${glyph(g, 84)}<span>${t}</span></div>`).join('')}</div>
  ${foot(i % 2 ? 'sand' : 'paper')}`));
C('slide-07-cta', 'ink', `
  <div class="pad" style="top:96px;display:flex;justify-content:space-between">${eb('One point of contact')}<span class="pg" style="color:var(--mist)">7 / 7</span></div>
  <div class="d" style="position:absolute;left:96px;top:420px;width:900px;font-size:118px;line-height:.9">Pick one service — or all of them${dot}</div>
  <p class="lead" style="position:absolute;left:96px;top:820px;width:820px">Every engagement is scoped to you, with a customised quotation.</p>
  <div style="position:absolute;left:96px;bottom:200px;display:flex;gap:20px"><span class="btn">Start a project →</span><span class="btn ghost"><i></i>WhatsApp us</span></div>
  ${foot('ink')}`);

/* ============================ STORIES 1080×1920 ============================ */
const S = (file, tone, html) => A(`stories/${file}`, 1080, 1920, tone, html);
const sticker = (t, top) => `<div class="sticker" style="top:${top}px">${t}</div>`;
S('story-01-poll-vendors', 'paper', `
  <div class="pad" style="top:270px">${eb('Quick question')}</div>
  <div class="d" style="position:absolute;left:96px;top:360px;width:900px;font-size:112px;line-height:.92">How many vendors does it take to run <span class="serif">your</span> brand${dot}</div>
  ${sticker('Place Instagram POLL sticker here<br><b>1–2 · 3–5 · 6+</b>', 1000)}
  <div class="sfoot">${logo('horizontal-full-colour', 50)}</div>`);
S('story-02-new-here', 'ink', `${corner('ink', 170, 96, 250)}
  <div class="pad" style="top:270px">${eb('New here?')}</div>
  <div class="d" style="position:absolute;left:96px;top:360px;width:900px;font-size:124px;line-height:.9">We’re BFourU${dot}</div>
  <p class="lead" style="position:absolute;left:96px;top:560px;width:840px;font-size:46px">One partner for brand, digital, technology, spaces and events.</p>
  ${sticker('Place LINK sticker here<br><b>' + WEB + '</b>', 1180)}
  <div class="sfoot">${logo('horizontal-reversed', 50)}</div>`);
S('story-03-healthcare', 'sage', `
  <div class="pad" style="top:270px">${eb('Healthcare')}</div>
  <div class="d" style="position:absolute;left:96px;top:380px;width:900px;font-size:128px;line-height:.9">You care for patients${dot}<br>We take care of <span class="serif" style="color:var(--teal)">the rest</span>${dot}</div>
  <p class="lead" style="position:absolute;left:96px;top:1080px;width:820px;font-size:42px">Branding, websites, OPD displays, patient education and reminders — non-clinical support for doctors, clinics and hospitals.</p>
  <div class="sfoot">${logo('horizontal-full-colour', 50)}</div>`);
S('story-04-whatsapp-us', 'ink', `${corner('ink', 170, 96, 250)}
  <div class="pad" style="top:270px">${eb('Let’s talk')}</div>
  <div class="d" style="position:absolute;left:96px;top:700px;width:900px;font-size:120px;line-height:.9">Tell us what you have today${dot}</div>
  <p class="serif" style="position:absolute;left:96px;top:1000px;font-size:64px;color:var(--mari)">We’ll suggest what’s next.</p>
  ${sticker('Place LINK sticker here<br><b>WhatsApp ' + WA + '</b>', 1200)}
  <div class="sfoot">${logo('horizontal-reversed', 50)}</div>`);

/* ============================ REEL COVERS 1080×1920 ============================ */
S('reel-cover-01-one-brief', 'ink', `${corner('ink', 170, 96, 250)}
  <div class="pad" style="top:300px">${eb('Reel')}</div>
  <div class="d" style="position:absolute;left:96px;top:620px;width:900px;font-size:170px;line-height:.86">One brief beats ten vendors${dot}</div>
  <div class="sfoot">${logo('horizontal-reversed', 50)}</div>`);
S('reel-cover-02-meet-bfouru', 'paper', `
  <div style="position:absolute;left:0;right:0;top:620px;display:grid;place-items:center">${logo('stacked-full-colour', 330)}</div>
  <div class="d" style="position:absolute;left:0;right:0;top:1130px;text-align:center;font-size:76px;line-height:1">One brand${dot} Multiple solutions${dot}<br>Complete support${dot}</div>`);

/* ============================ LINKEDIN 1200×627 ============================ */
const L = (file, tone, html) => A(`linkedin/${file}`, 1200, 627, tone, html);
L('linkedin-01-introducing-bfouru', 'ink', `${corner('ink')}
  <div style="position:absolute;left:72px;top:64px">${eb('Introducing BFourU')}</div>
  <div class="d" style="position:absolute;left:72px;top:150px;font-size:84px;line-height:.9">One brand${dot}<br>Multiple solutions${dot}<br>Complete support${dot}</div>
  <div style="position:absolute;left:72px;bottom:56px">${logo('horizontal-reversed', 40)}</div>`);
L('linkedin-02-healthcare', 'sage', `
  <div style="position:absolute;left:72px;top:64px">${eb('For healthcare organisations')}</div>
  <div class="d" style="position:absolute;left:72px;top:150px;width:780px;font-size:76px;line-height:.92">You care for patients${dot} We take care of <span class="serif" style="color:var(--teal)">the rest</span>${dot}</div>
  <div style="position:absolute;right:72px;top:150px">${glyph('patient-education', 220)}</div>
  <div style="position:absolute;left:72px;bottom:56px">${logo('horizontal-full-colour', 40)}</div>`);
L('linkedin-03-one-partner', 'paper', `
  <div style="position:absolute;left:72px;top:64px">${eb('Why one partner')}</div>
  <div class="d" style="position:absolute;left:72px;top:150px;width:700px;font-size:80px;line-height:.92">One brief, one standard, one point of contact${dot}</div>
  <div style="position:absolute;right:72px;top:120px">${glyph('brand-mark', 300)}</div>
  <div style="position:absolute;left:72px;bottom:56px">${logo('horizontal-full-colour', 40)}</div>`);

/* ============================ HTML ============================ */
const fonts = pathToFileURL(path.join(BRAND, '04-Typography/fonts')).href;
const css = `
@font-face{font-family:BG;src:url(${fonts}/BricolageGrotesque-Bold.ttf);font-weight:700}
@font-face{font-family:IS;src:url(${fonts}/InstrumentSans-Regular.ttf);font-weight:400}
@font-face{font-family:IS;src:url(${fonts}/InstrumentSans-SemiBold.ttf);font-weight:600}
@font-face{font-family:IS;src:url(${fonts}/InstrumentSans-Bold.ttf);font-weight:700}
@font-face{font-family:NR;src:url(${fonts}/Newsreader-Italic.ttf);font-style:italic}
:root{--ink:#10211C;--ink2:#33433D;--muted:#5A6862;--mist:#A9B5AF;--line:#D8CFBE;--paper:#F3EFE7;--paper2:#EAE4D8;--paper3:#DED6C6;--white:#FBF8F2;--accent:#E4572E;--accent-ink:#A63A1B;--teal:#1E6B58;--sage:#D3DFD3;--mari:#E9B44C}
*{margin:0;padding:0;box-sizing:border-box}
body{background:#777;font-family:IS,Arial,sans-serif;color:var(--ink);display:flex;flex-wrap:wrap;gap:40px;padding:40px}
.ab{position:relative;overflow:hidden;flex:none}
.ab.ink{background:var(--ink);color:var(--paper)}.ab.paper{background:var(--paper)}.ab.sand{background:var(--paper2)}.ab.sage{background:var(--sage)}
.d{font-family:BG,Arial,sans-serif;font-weight:700;letter-spacing:-0.04em}
.serif{font-family:NR,Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-0.02em}
.dot{color:var(--accent)}
.pad{position:absolute;left:96px;right:96px}
.eb{font-size:24px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;display:inline-flex;align-items:center;gap:14px;color:var(--ink2)}
.eb::before{content:'';width:12px;height:12px;border-radius:50%;background:var(--accent)}
.ink .eb{color:var(--mist)}.sage .eb::before{background:var(--teal)}
.lead{font-size:36px;line-height:1.38;color:var(--ink2)}.ink .lead{color:var(--mist)}
.note{font-size:26px;line-height:1.4;color:var(--muted);margin-top:22px}.ink .note{color:var(--mist)}
.foot{position:absolute;left:96px;right:96px;bottom:88px;display:flex;justify-content:space-between;align-items:center;font-size:26px;font-weight:600;color:var(--muted)}.ink .foot{color:var(--mist)}
.li{font-size:34px;font-weight:600;padding:20px 0;border-top:2px solid var(--line);display:flex;gap:18px;align-items:center}.li::before{content:'';width:12px;height:12px;border-radius:50%;background:var(--accent);flex:none}
.ink .li{border-color:#2E3D38}
.strike{font-family:BG;font-weight:700;letter-spacing:-0.035em;color:var(--muted);position:relative;width:max-content;line-height:1.05}
.strike::after{content:'';position:absolute;left:-6px;right:-6px;top:54%;height:6px;background:var(--accent);border-radius:3px}
.check{display:grid;grid-template-columns:70px 1fr 60px;align-items:center;padding:22px 0;border-top:2px solid var(--line)}
.box{width:44px;height:44px;border:4px solid var(--ink);border-radius:10px}.n{font-size:24px;font-weight:700;color:var(--accent-ink);text-align:right}
.gi{display:flex;gap:22px;align-items:center;font-size:34px;font-weight:600;padding:18px 0;border-top:2px solid rgba(16,33,28,.14)}
.gi.big{font-size:42px;padding:22px 0}
.step{display:grid;grid-template-columns:90px 1fr;column-gap:0;padding:18px 0;border-top:2px solid var(--line);align-items:baseline}
.sn{font-size:26px;font-weight:700;color:var(--accent-ink);letter-spacing:.06em}.st{grid-column:2;font-size:28px;color:var(--muted);margin-top:4px}
.compact .step{padding:13px 0}.compact .st{font-size:26px;margin-top:0}
.sage .step{border-color:rgba(16,33,28,.16)}
.btn{background:var(--paper);color:var(--ink);font-weight:700;font-size:34px;padding:26px 40px;border-radius:99px;display:inline-flex;align-items:center;gap:14px}
.btn.ghost{background:none;color:var(--paper);border:3px solid #3A4A44}.btn i{width:14px;height:14px;border-radius:50%;background:#25D366;display:inline-block}
.big-n{font-family:BG;font-weight:700;font-size:150px;letter-spacing:-0.05em;color:var(--accent);line-height:.8}
.pg{font-size:26px;font-weight:700;color:var(--muted);letter-spacing:.1em}
.swipe{position:absolute;right:96px;bottom:200px;font-size:28px;font-weight:700;color:var(--mist);letter-spacing:.06em}
.sticker{position:absolute;left:96px;right:96px;height:220px;border:4px dashed rgba(127,127,127,.6);border-radius:32px;display:grid;place-items:center;text-align:center;font-size:30px;line-height:1.5;color:var(--muted)}
.ink .sticker{color:var(--mist)}
.sfoot{position:absolute;left:96px;bottom:300px}
body.export .sticker{display:none}
`;
const page = (exp) => `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><title>BFourU social content</title><style>${css}</style></head><body class="${exp ? 'export' : ''}">
${ab.map((a, i) => `<section class="ab ${a.tone}" id="a${i}" style="width:${a.w}px;height:${a.h}px">${a.html}</section>`).join('\n')}
</body></html>`;
fs.writeFileSync(path.join(__dirname, 'artboards.html'), page(false));

/* ============================ render ============================ */
(async () => {
  const port = 9300 + Math.floor(Math.random() * 500);
  const proc = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-'))}`, '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank']);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let ws;
  for (let i = 0; i < 80 && !ws; i++) { try { const p = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch {} await sleep(250); }
  if (ws.readyState !== 1) await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pend = new Map();
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  try {
    const exportHtml = path.join(__dirname, '_export.html'); fs.writeFileSync(exportHtml, page(true));
    await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 1000, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: pathToFileURL(exportHtml).href }); await sleep(2500);
    await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(()=>1)', awaitPromise: true });
    const rects = (await send('Runtime.evaluate', { expression: `[...document.querySelectorAll('.ab')].map(e=>{const r=e.getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}})`, returnByValue: true })).result.result.value;
    for (let i = 0; i < ab.length; i++) {
      const out = path.join(OUT, ab[i].file + '.png'); fs.mkdirSync(path.dirname(out), { recursive: true });
      const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { ...rects[i], scale: 1 } });
      fs.writeFileSync(out, Buffer.from(r.result.data, 'base64'));
    }
    fs.rmSync(exportHtml);
    console.log('rendered', ab.length);
  } finally { ws.close(); proc.kill(); }
})().catch((e) => { console.error(e); process.exit(1); });
