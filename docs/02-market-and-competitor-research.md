# 02 · Market & Competitor Research

Research conducted November 2026. Seventeen competitor/benchmark sites were studied. Content structure was read with a fetch tool. Visual design tokens (fonts, type scale, colour usage, presence of WhatsApp/phone links, forms, page length) were extracted by running a script against the live pages in a browser. Where a fetch failed, it is stated.

---

## 1. Market context that shapes the website

### Indian buyers are mobile-first, and WhatsApp-first
- StatCounter's India figures put mobile at roughly **67–84 % of web traffic** in 2026, depending on the metric ([StatCounter: India mobile vs desktop](https://gs.statcounter.com/platform-market-share/mobile-desktop/india), [StatCounter: India platform share](https://gs.statcounter.com/platform-market-share/website/india)).
- **Implication:** the site must be designed for a thumb on a mid-range Android phone first. Primary actions must sit in thumb reach. WhatsApp must be a first-class channel, not a floating afterthought.

### Healthcare marketing in India is now tightly regulated
- The NMC *Registered Medical Practitioner (Professional Conduct) Regulations, 2023* include social-media rules covering solicitation of patients, buying likes/followers and patient "success stories" ([Medical Dialogues](https://medicaldialogues.in/health-news/nmc/no-likes-follows-paid-ratings-here-is-what-nmc-new-ethics-guidelines-spell-out-to-doctors-for-use-of-social-media-93457)).
- NMC's *Guidelines on Ethical Advertising and Public Communication* extend this to influencers, AI-generated promotion and digital marketing. They state that doctors should not request or share patient testimonials for promotion, and they apply to hospitals and institutions too ([Medical Dialogues](https://medicaldialogues.in/health-news/nmc/nmc-issues-ethical-advertising-public-communication-guidelines-for-doctors-hospitals-details-180731), [The South First](https://thesouthfirst.com/health/doctors-on-instagram-nmc-says-no-to-patient-testimonials-paid-ads-ai-promotions-and-guaranteed-claims/)).
- **Implication:** several competitors still sell "more patients", testimonial marketing and growth hacks. BFourU's brief already insists on compliant campaigns, consent and doctor-approved content. That is a **genuine differentiator**, and the site makes it visible ("Care commitments").

### Data protection is about to become a clinic-level obligation
- The **DPDP Rules, 2025** were notified in November 2025 with an ~18-month phased compliance window. Clinics, hospitals and labs that process digital health data are data fiduciaries that need informed consent ([PIB](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf), [KPMG India](https://kpmg.com/in/en/insights/2025/12/the-privacy-prescription-impact-of-dpdp-act-and-rules-in-healthcare-and-life-sciences-sector.html), [India Briefing](https://www.india-briefing.com/news/dpdp-rules-2025-india-data-protection-law-compliance-40769.html)).
- **Implication:** BFourU's "digital registration & consent forms", "secure data backup" and automation services are timely. The website itself must model good practice: a clear purpose notice on the enquiry form, no third-party font/CDN calls, and no tracking by default.

### What B2B buyers want from a service website
- NN/g finds that price is a top information need, that hidden pricing erodes trust, and that sample prices or explanations of what drives cost reassure people doing early research ([NN/g: Show Price](https://www.nngroup.com/articles/show-price/), [NN/g: B2B trust](https://www.nngroup.com/articles/b2b-trust-from-b2c/)).
- **Implication:** BFourU quotes per project. We can't invent prices, but we *can* explain **how a quote is shaped** (scope, deliverables, locations, project vs subscription) and what the customer gets in a quote. That turns "contact us for pricing" from a wall into a transparent next step.

---

## 2. Competitor set (17)

| # | Site | Group | Why it's relevant |
|---|---|---|---|
| 1 | BrandLoom (brandloom.com) | Indian healthcare & branding agency | Direct competitor for doctor/clinic branding + digital |
| 2 | DigiScrub (digiscrub.com) | Indian healthcare digital agency | Direct competitor, healthcare-only |
| 3 | Schbang (schbang.com) | Indian full-service creative/tech | Category leader for "creative + media + tech" |
| 4 | WATConsult (watconsult.com) | Indian full-service digital | Integrated agency, structured services |
| 5 | Social Beat (socialbeat.in) | Indian performance + creative | Sector navigation, lead-gen forms |
| 6 | Drlogy (drlogy.com) | Indian clinic software + listings | Overlaps with clinic software + automation |
| 7 | Practo for Providers (practo.com/providers) | Indian clinic/hospital software | Benchmark for trust and privacy messaging |
| 8 | DocPulse (docpulse.com) | Indian HMS/clinic software | Persona-led product marketing, queue displays |
| 9 | Pickcel (pickcel.com) | Indian digital signage SaaS | Direct overlap with OPD TV / displays |
| 10 | Lopez Design (thisislopez.com) | Indian brand consultancy | Premium Indian branding benchmark |
| 11 | Codesign (codesign.in) | Indian brand design studio | Premium editorial benchmark |
| 12 | Cardinal Digital Marketing (cardinaldigitalmarketing.com) | US healthcare marketing | Premium healthcare positioning |
| 13 | Healthcare Success (healthcaresuccess.com) | US healthcare marketing | Long-standing, conversion-heavy |
| 14 | Klick Health (klick.com) | Global health agency | Best-in-class health brand voice |
| 15 | DEPT (dept.global) | Global full-service digital | Scale, proof, solution-led navigation |
| 16 | Pentagram (pentagram.com) | Global design consultancy | Gold standard for discipline/sector filtering |
| 17 | Noomo (noomoagency.com) | Awwwards SOTD agency (2026) | Contemporary award-level interaction design |

Failed or partial: Kinnect (kinnect.in, TLS certificate error) and Meditwitt (DNS failure) were dropped. Cardinal blocked the fetcher but loaded in a real browser.

---

## 3. Site-by-site findings

### Indian healthcare marketing agencies

**BrandLoom**: *"The BEST Branding & Digital Marketing Agency in India"*
- **Structure:** hero → press logos → ROI promise → testimonial + review badges → awards → client wall → 14-service grid → 3 pillars → case studies → FAQ → form. Three-level mega menu.
- **Proof:** heavy stack of press logos, awards, Clutch/Trustpilot ratings, client wall and metric case studies.
- **Conversion:** "JOIN WAITLIST" is the primary CTA (ambiguous for an agency), alongside "Let's Talk", "Get ROI Plan" and a callback modal. The form has 6 required fields.
- **Tech/visual:** WordPress, carousel plugin, preloader.
- ✅ Layered proof; a page per service (SEO).
- ❌ Superlative, keyword-stuffed headlines erode trust. Competing CTAs. Unsupported "filling up fast" urgency. Choice overload.

**DigiScrub**: *"Digital Marketing That Grows"*, healthcare-only
- **Structure:** hero → "Trusted by 500+ doctors" → doctor testimonials → success stories → 3 pillars → services → 4-step process → 11 specialties → blog → partner logos → FAQ → SEO copy → form.
- **Visual:** Sofia Pro / Poppins; slate + lime green (`#85BB25`) on pale blue. H1 64 px, weight 400. Page is ~13,400 px tall. Phone link present, **no WhatsApp**.
- ✅ Specialty tags make relevance instant. Compliance-aware blog. Simple 4-step process.
- ❌ Counters render as "0+" and identical "128,7K" figures repeat across cards (looks templated). Four different CTAs. The nav link label doesn't match its destination.

### Indian full-service agencies

**Schbang**: *"Your Creative, Media & Technology Transformation Partner"*
- **Visual:** Sora everywhere. Black/white with a single orange accent (`rgb(255,100,40)`). H1 ~45 px bold. Lenis smooth-scroll, Next.js.
- ✅ Distinct voice ("It's time to create a Schbang"). Work-first proof (case studies with view counts). Five clearly named solutions.
- ❌ No lead capture on the homepage. The Solutions dropdown has no overview page. Repeated logo and partner walls add noise.

**WATConsult**: *"We marry impactful creatives with effective media and technology"*
- ✅ A clear three-pillar service grouping (≈15 services); the budget band on the form qualifies leads.
- ❌ **One form mixes client enquiries and job applications**, and "Career Opportunities" is the first option. Dated signals (© 2024, a creditors notice in the header). WordPress.

**Social Beat**: *"Improve ROI of your lead generation campaigns"*
- ✅ Quantified proof (media managed, team size). Sector pages. Form qualifies budget and city.
- ❌ The primary CTA links to `#`. A ~10-field form. A dense nav (10 services + 7 sectors).

### Indian health-tech / display products

**Drlogy**: patient directory first, B2B software second.
- ✅ Short demo form (name, mobile, email). Free/premium plans are visible.
- ❌ The consumer directory dilutes the B2B path. No product visuals. A giant mega-menu with typos. No WhatsApp, even though it sells WhatsApp features.

**Practo for Providers**: *"Software solutions for doctors, clinics, hospitals"*
- ✅ Audience split (doctors / clinics / hospitals) right at the top. **Specific privacy commitments** (ISO 27001, encryption, "practices cannot see each other's data"). ABDM compliance is prominent.
- ❌ No conversion form. No product visuals. Inconsistent metrics (60K vs 70K clinics).

**DocPulse**: *"Run your clinic, not your paperwork"*
- ✅ **Persona-led pain → solution blocks.** Trust badges above the fold. The demo CTA is repeated.
- ❌ Product screenshots are placeholders. Persona images look AI-generated. An imprecise security claim ("SHA-256 encryption").

**Pickcel** (healthcare signage page)
- **Visual:** Geist; ink + blue (`#1B4ABD`) + red accent. H1 48 px/700. ~13,000 px page. No phone link, no WhatsApp.
- ✅ **Use-case-led with a mock screen for each use case** (queue displays, wayfinding, health education). Named hospital case studies. Security comparison table.
- ❌ Unsourced uplift claims. Healthcare is one of six industries, which dilutes the page. No regional channel (WhatsApp/phone).

### Indian premium design studios

**Lopez Design**: black canvas, Fira Sans, red accent. Work-led. "Offerings" rather than "services". Very little conversion path beyond "Get in touch".

**Codesign**: light grey (`#F2F2F2`) canvas, Sentinel serif + Whitney/Helvetica. Project titles written as **editorial headlines** ("Owning the Everyday", "Confidence in Action"). Proves that an Indian studio can feel world-class through **typography and restraint** rather than effects.

### International healthcare marketing

**Cardinal Digital Marketing**: *"Performance marketing that drives outcomes."*
- **Visual:** Neue Haas Grotesk Display + Inter. Near-black (`#0C0A12`) with signal red (`#E10600`). Tight, confident grid. One form.
- Notable H2: **"Ditch the myth that one agency can do it all."** This is the exact objection BFourU's positioning has to overcome (see the UX strategy).
- ✅ Premium typography. FAQ. Case studies. A single clear CTA ("Contact us").
- ❌ US-centric and performance-only. No phone or WhatsApp.

**Healthcare Success**: *"Partner with a leading healthcare marketing agency that delivers results"*
- **Visual:** Roboto, corporate blues (`#004987`, `#009FE3`). H1 only 32 px. Feels dated.
- ✅ Phone is everywhere. Named testimonials. Audience-based navigation (15 audiences).
- ❌ Mega menu with ~35 links. Conflicting stats on the page. "Our Work" shows names without visuals.

**Klick Health**: *"There's something different here."*
- **Visual:** custom "klickBoldFont" display at **~115 px**, Publica Sans body, white/black with electric blue (`#0341FC`). Page is ~33,000 px.
- ✅ The most distinctive brand voice in the set. People and culture build trust.
- ❌ Contact only in the footer. No primary CTA above the fold. Case studies without results.

### International agencies / design benchmarks

**DEPT**: *"The Growth Invention Company."*
- ✅ Strong third-party proof (Gartner, Webby, B Corp). Solution-led entry points.
- ❌ Jargon-heavy. Anonymised case tiles without results. A complex mega menu.

**Pentagram**: *"We design everything for everyone."*
- ✅ **Two-axis browsing by discipline × sector.** This is directly applicable to BFourU (service × audience). Editorial essays add depth.
- ❌ Almost no conversion path on the homepage.

**Noomo** (Awwwards SOTD, June 2026): *"Where your story meets creative technology"*
- **Visual:** NeueMachina display (62 px) + Source Sans. Pale periwinkle canvas (`#C9D2E7`) with deep violet-black. WebGL canvas.
- ✅ Distinctive, immersive. Clear service list (enterprise websites, AI integrations, campaigns).
- ❌ **A full-screen preloader** blocks content on first load, which is costly on Indian mobile networks.

---

## 4. Patterns across the set

| Observation | Count / evidence | What BFourU does differently |
|---|---|---|
| **No WhatsApp link on the page** | 0 of the 10 pages checked by script had a `wa.me`/WhatsApp link | WhatsApp is a primary CTA with **context-prefilled messages** from every service page |
| Many competing CTAs ("Get free proposal", "Request demo", "Join waitlist", "Let's talk"…) | BrandLoom, DigiScrub, Social Beat | **One verb everywhere:** "Start a project". WhatsApp and call are secondary |
| Long, mixed-purpose forms (6–10+ fields; careers mixed in) | WATConsult, Social Beat, BrandLoom | **Brief Builder**: pick services → 3 fields. Separate from careers |
| 14 equal service cards / giant mega menus | BrandLoom, Healthcare Success, Drlogy | **5 clusters → 14 services**, filterable by audience |
| Healthcare brands look clinical (white + blue/green, Poppins/Roboto) | DigiScrub, Healthcare Success, DocPulse, Pickcel | Warm, editorial, premium. Healthcare is a *mode* of the same brand, not a separate look |
| Premium studios look premium but don't convert | Pentagram, Klick, Lopez | Premium craft **plus** a conversion path at every scroll depth |
| Proof by unverifiable numbers ("500+ doctors", "No.1") | DigiScrub, Drlogy, BrandLoom | No invented numbers. **Proof by clarity**: process, commitments, visible deliverables. Real proof slots ready for later |
| Ethics treated as a blog topic, not a promise | DigiScrub (blog), others silent | **"Care commitments"** as a visible section on the healthcare page and home |
| Use-case visuals beat feature lists | Pickcel's mock screens | Every service shows a **designed mock deliverable** (OPD screen, WhatsApp reminder, signage) built in code, not stock photos |
| Preloaders and heavy WebGL | Noomo | No preloader. Prerendered HTML. Motion is CSS-driven and respects reduced-motion |

## 5. Opportunities we are designing for

1. **Make "one partner" credible, not vague.** Cardinal's "ditch the myth that one agency can do it all" is the objection. The answer is to *show the system*: five clusters, one brief, one point of contact, one consistent brand, and a clear process.
2. **Turn breadth into a tool.** A *"Your brief"* tray lets visitors collect services as they browse (like a shortlist), then send them as one brief by WhatsApp or email. None of the 17 do this.
3. **Own ethical healthcare communication.** Healthcare clients are the most risk-averse audience; being explicit about consent, doctor-approved content and no guaranteed claims is a trust lever competitors ignore.
4. **Map services to the patient journey.** No competitor shows *where* in a clinic visit each service shows up (discover → arrive → wait → consult → follow-up). This is an original, instantly understandable model for doctors.
5. **Premium visual quality without the weight.** Award-level typography, layout and micro-interaction on a lean, prerendered React build that works well on 4G.

## Sources
- StatCounter India: https://gs.statcounter.com/platform-market-share/mobile-desktop/india · https://gs.statcounter.com/platform-market-share/website/india
- NMC social media / ethics: https://medicaldialogues.in/health-news/nmc/no-likes-follows-paid-ratings-here-is-what-nmc-new-ethics-guidelines-spell-out-to-doctors-for-use-of-social-media-93457 · https://medicaldialogues.in/health-news/nmc/nmc-issues-ethical-advertising-public-communication-guidelines-for-doctors-hospitals-details-180731 · https://thesouthfirst.com/health/doctors-on-instagram-nmc-says-no-to-patient-testimonials-paid-ads-ai-promotions-and-guaranteed-claims/
- DPDP Rules 2025: https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf · https://kpmg.com/in/en/insights/2025/12/the-privacy-prescription-impact-of-dpdp-act-and-rules-in-healthcare-and-life-sciences-sector.html · https://www.india-briefing.com/news/dpdp-rules-2025-india-data-protection-law-compliance-40769.html
- NN/g: https://www.nngroup.com/articles/show-price/ · https://www.nngroup.com/articles/b2b-trust-from-b2c/
- Healthcare agency landscape (leads, self-published): https://www.upgrowth.in/the-best-healthcare-digital-marketing-agencies-in-india-our-comprehensive-guide · https://www.clinicspots.com/blog/top-9-healthcare-marketing-agencies-in-india-2026
- Indian agency landscape (leads): https://www.themediaant.com/blog/best-digital-marketing-agencies-india/ · https://zipdo.co/service/indian-digital-marketing/
- OPD display landscape: https://www.pickcel.com/case-studies/manipal · https://sparsadigital.in/product/digital-opd-boards/ · https://trueview.co.in/case-study/enhancing-patient-experience-in-indore-hospitals-with-trueview-digital-signages
- Awwwards SOTD listings: https://www.awwwards.com/inspiration_search/design-agencies/
- Competitor sites as listed in §2 (accessed 24 Nov 2026).
