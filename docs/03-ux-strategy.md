# 03 · UX Research & Strategy

## 1. The first-visit question set

Someone landing on BFourU for the first time is trying to answer, in this order:

1. **"What do you do, and is it for someone like me?"** → answered in the hero (one line + audience chips) within 5 seconds.
2. **"Can you actually handle what I need?"** → the five-cluster service map, then service detail pages showing concrete deliverables.
3. **"Why one agency instead of several specialists?"** → "One partner, not ten vendors" section (answers Cardinal-style scepticism).
4. **"Will you get my industry?"** (especially doctors/hospitals) → healthcare band + dedicated healthcare page with patient-journey mapping and care commitments.
5. **"How does working with you go, and what does it cost?"** → 6-step process, engagement models, "what shapes your quote".
6. **"How do I start without a long sales call?"** → Brief Builder, WhatsApp with prefilled context, or a 3-field form.

The homepage is ordered to answer these questions in sequence.

## 2. Personas

Personas are grounded in the brief's audience list, the problems it names, and competitor positioning. Treat them as research hypotheses to validate with real clients.

### P1 · Dr. Kavya, independent specialist opening her own clinic
- **Context:** 38, gynaecologist leaving a hospital post to start a private practice. Runs her life on WhatsApp. Browses on her phone between OPDs.
- **Needs:** logo, letterhead, prescription pads, doctor profile, website with appointment booking, Google Business Profile, signage, pregnancy calendars for patients.
- **Fears:** NMC compliance ("will this look like advertising?"), juggling a printer, a web developer, a sign-maker and a social-media freelancer, and looking "salesy".
- **Triggers to contact:** sees the whole clinic-launch kit in one place; reads the care commitments; can WhatsApp without filling a form.
- **Key pages:** Healthcare → Branding & Identity → Brief Builder (WhatsApp).

### P2 · Mr. Rao, administrator / marketing head at a multi-specialty hospital
- **Context:** 45, manages brand, patient communication and facilities across 2–3 locations. Desktop at work, compares vendors, needs internal approvals.
- **Needs:** rebranding, OPD TV content, wayfinding signage, department displays, CME/conference branding, reputation management, IT support.
- **Fears:** inconsistent output across vendors, missed timelines, data privacy, explaining a new vendor to management.
- **Triggers:** clear scope per service, process with review/approval step, multi-location display management, ethics and consent stance.
- **Key pages:** Services (Technology cluster) → OPD TV → Events → Approach → Contact form (email).

### P3 · Neha, founder of a growing D2C / service startup
- **Context:** 31, 12-person team, has a logo a friend made, wants to look established. Budget-aware.
- **Needs:** brand identity refresh, website, social content plan, packaging/merch, launch event creatives.
- **Fears:** agencies that over-promise, opaque pricing, being a "small client".
- **Triggers:** honest pricing explanation, project vs subscription choice, a polished site that proves taste.
- **Key pages:** Home → Brand & Creative cluster → Approach (engagement models) → Brief Builder.

### P4 · Arjun, marketing manager at an established SME / corporate
- **Context:** 36, needs a dependable extension team for monthly content, campaigns, corporate videos, event collateral and printed material.
- **Fears:** brand drift across outputs, slow turnaround, no reporting.
- **Triggers:** subscription model, monthly reports, single point of contact, consistency promise.
- **Key pages:** Digital Marketing → Photography & Media → Approach → Contact.

### P5 · Dr. Menon, organising secretary of a medical association conference
- **Context:** 52, organises an annual CME conference with a volunteer committee. Short timelines.
- **Needs:** conference identity, registration website, invitations, stage backdrop, exhibition stalls, delegate kits, ID cards, certificates, photography.
- **Trigger:** seeing the entire event chain covered end-to-end (Events + Merchandise + Print + Web + Media).
- **Key pages:** Events & Conferences → Brief Builder.

## 3. Customer journey

| Stage | What they do | What they need from the site | Design response |
|---|---|---|---|
| **Discover** | Google ("clinic branding agency", "OPD TV content"), Instagram, referral, Google Maps | Instant clarity, credibility at a glance | Prerendered pages with real titles/meta per service. Hero states offer + audiences |
| **Explore** | Skims home, opens 1–3 services | Concrete deliverables, not adjectives | Service pages list every deliverable, show a mock output, and name who it's for |
| **Evaluate** | Compares with 2–3 other agencies; checks how work happens | Process, ethics, pricing logic, honesty | Process timeline, engagement models, "what shapes your quote", exclusions, care commitments |
| **Shortlist** | Wants to share with partner/boss | Easy to share and summarise | "Your brief" tray collects services; WhatsApp message is a readable summary |
| **Contact** | WhatsApp / call / form | Low effort, quick reassurance | Brief Builder (3 fields); WhatsApp prefilled; tap-to-call; clear "what happens next" |
| **After contact** | Waits for reply | Confidence they'll be heard | Confirmation screen explains next steps (mirrors the brief's process step 1) |

## 4. Information architecture

```
/                         Home
/services                 All services (5 clusters, jump links, healthcare tags)
/services/:slug           14 service detail pages
/healthcare               Healthcare specialisation
/approach                 About + process + engagement models + exclusions
/contact                  Brief Builder + direct channels
/privacy                  Privacy notice (DPDP-aware)
*                         404 with service shortcuts
```

**Why not a separate "About" and "Process"?** For a young agency with no case studies yet, *how we work* **is** the about story. Combining them on one strong "Approach" page avoids two thin pages.

**Why no "Work/Portfolio" yet?** There's no verified work in the brief. An empty or fake portfolio would destroy trust. The architecture reserves `/work` for later (see `CONTENT-TO-CONFIRM.md`).

## 5. Navigation

- **Desktop header:** `Services ▾` · `Healthcare` · `Approach` · `Contact` + **Start a project** (primary) + brief tray indicator (appears once a service is added).
- **Services panel:** opens the 5 clusters with their 14 services in one view (no 3-level mega menu). It closes on Esc, outside click and route change, and is keyboard operable.
- **Mobile:** full-screen menu with large tap targets, clusters listed as accordions, direct WhatsApp and Call buttons at the bottom of the menu.
- **Mobile action bar:** after the hero scrolls away, a slim bottom bar shows `WhatsApp` · `Call` · `Start a project`. It sits in the thumb zone (research §1) and hides near the footer to avoid duplicate CTAs.

## 6. Content hierarchy (Home)

1. **Hero**: brand line as H1, one-sentence offer, audience chips, primary + WhatsApp CTA, visual "one system → many outputs" composition.
2. **The problem**: fragmented vendors → inconsistent brand (relatable pain from the brief).
3. **One partner, not ten vendors**: interactive before/after diagram that answers the "can one agency do it all?" objection.
4. **What we do**: 5 clusters → 14 services, with deliverable counts.
5. **Healthcare band**: "You care for patients. We take care of the rest." Patient-journey teaser.
6. **How we work**: 6 steps (from the brief).
7. **Engagement models**: project vs subscription + what shapes a quote.
8. **Care commitments**: ethics/consent/honesty principles.
9. **FAQ**: objections.
10. **Closing CTA**: Brief Builder entry + direct channels.

## 7. Service presentation (detail page template)

1. Breadcrumb + cluster tag + "Healthcare" tag where relevant.
2. H1 service name + one-line promise + **"Add to my brief"** + **"Ask on WhatsApp"** (prefilled: *"Hi BFourU, I'm interested in {service}."*).
3. Designed mock deliverable (code-built visual).
4. **What's included**: the full deliverable list from the brief, as scannable chips/rows.
5. **Who it's for**: audiences.
6. **The outcome**: the brief's "intended benefit" phrased as a customer outcome.
7. **Good to know**: compliance/consent notes from the brief (healthcare-sensitive services).
8. **Works well with**: 3 related services ("one brand" cross-sell).
9. Process mini-strip + CTA.

## 8. Trust-building without fabricated proof

| Lever | Implementation |
|---|---|
| Specificity | ~160 concrete deliverables listed, not vague capability claims |
| Transparency | How quotes work; project vs subscription; exclusions shown openly; "Proposed" label on clinic software |
| Ethics | Care commitments: doctor-approved clinical content, consent-first media, no fake reviews or guaranteed outcomes, chatbots never diagnose |
| Process | 6-step process with an explicit "review & approve" step |
| Craft | The site itself is the portfolio piece: typography, detail, performance |
| Reachability | Real phone and WhatsApp in header/footer/action bar; human tone |
| Privacy | No third-party trackers or font CDNs; purpose notice on forms |
| Future proof slots | Components ready for case studies, client logos and testimonials (non-patient, NMC-safe) once real ones exist |

## 9. Lead generation & conversion strategy

- **One primary verb:** *Start a project.* (Competitors split attention across 3–4 CTA labels.)
- **Three ways in, by effort level:**
  1. **WhatsApp** (lowest effort, India-native). Every service page prefills the service name.
  2. **Call** (tap-to-call).
  3. **Brief Builder** (structured): business type → services (multi-select, pre-filled from the brief tray) → engagement preference → name, phone/email, optional note. Output goes by **WhatsApp or email**, or to a form endpoint once one is configured.
- **"Your brief" tray:** visitors add services while browsing. It persists in `localStorage` (per device only), and a counter appears in the header. This turns *exploration into intent*.
- **Micro-commitments:** "Add to my brief" is a low-stakes step before "contact".
- **Placement:** a CTA at the end of every major section, without nagging popups (no exit-intent modals; competitors' popups degrade mobile UX).

## 10. Mobile-first UX rules

- Designed at 360 px first. Fluid type and spacing via `clamp()`.
- Tap targets ≥ 44 px. Primary actions in the bottom third of the screen.
- No hover-only information. Every hover reveal has a tap/focus equivalent.
- No preloader. Prerendered HTML, so content paints before JS loads.
- Horizontal overflow forbidden (tested at 320, 360, 390, 768, 1024, 1440 px).

## 11. Accessibility & usability standards (WCAG 2.2 AA target)

- Semantic landmarks, one H1 per page, logical heading order, skip link.
- Colour contrast ≥ 4.5:1 for text (accent colour only for large text, decoration or on dark ink).
- Visible `:focus-visible` rings. Full keyboard support for the menu, services panel, accordions, filters and Brief Builder.
- `prefers-reduced-motion` disables reveals, marquee and diagram animation.
- Forms: visible labels, inline errors announced via `aria-live`, no placeholder-as-label, `autocomplete` attributes, `inputmode="tel"`.
- `lang="en-IN"`; meaningful link text; decorative visuals `aria-hidden`.
