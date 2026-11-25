# 05 · Wireframes (low-fidelity)

Desktop (≥ 1024 px) is shown first, then the key mobile (360 px) adaptations. High fidelity lives in code. The React build *is* the high-fidelity layout. Run `npm run dev` to view it.

---

## Global

```
DESKTOP HEADER (sticky, hides on scroll-down, returns on scroll-up)
┌──────────────────────────────────────────────────────────────────────────┐
│ ▣ BFourU     Services ▾   Healthcare   Approach   Contact   [Brief·3] [Start a project →] │
└──────────────────────────────────────────────────────────────────────────┘
SERVICES PANEL (on click/Enter)
┌──────────────────────────────────────────────────────────────────────────┐
│ 01 Brand & Creative │ 02 Digital & Web │ 03 Technology │ 04 Spaces & Print │ 05 Events & Ed. │
│  ◰ Branding         │  ◰ Digital mktg  │  ◰ Automation  │  ◰ Signage        │  ◰ Events       │
│  ◰ Creative design  │  ◰ Websites/apps │  ◰ Clinic SW*  │  ◰ Printing       │  ◰ Patient ed.  │
│  ◰ Photo & media    │                  │  ◰ OPD TV      │  ◰ Merchandise    │                 │
│                     │                  │  ◰ IT support  │                   │                 │
│ ── All services → ───────────────────── Not sure? Build a brief → ──────── │
└──────────────────────────────────────────────────────────────────────────┘

MOBILE: [▣ BFourU ............ (Brief·3) (☰)]   →  full-screen menu, clusters as accordions,
        bottom of menu: [WhatsApp] [Call]
MOBILE ACTION BAR (after hero): [ ◎ WhatsApp | ✆ Call | Start a project → ]
```

## Home

```
┌ HERO ────────────────────────────────────────────────────────────────────┐
│ Creative · Digital · Technology — for growing businesses & healthcare      │
│                                                                            │
│ ONE BRAND.                                                                 │
│ MULTIPLE SOLUTIONS.                                                        │
│ COMPLETE SUPPORT.                                                          │
│                                                                            │
│ [Sub-paragraph, 2 lines]                 For: Startups · SMEs · Corporates │
│ [Start a project →] [◎ WhatsApp us]           Doctors · Clinics · Hospitals │
│                                                                            │
│ ⟵ marquee of deliverable mocks: card · post · OPD screen · sign · chat ⟶  │
└────────────────────────────────────────────────────────────────────────────┘
┌ 01 — THE PROBLEM ─────────────────────────────────────────────────────────┐
│ "Most growing businesses are held together     │ Inconsistent branding  → 01│
│  by a patchwork of vendors."                    │ Fragmented providers   → ●│
│                                                 │ No time for digital    → 02│
│                                                 │ Outdated websites      → 02│
│                                                 │ Manual follow-ups      → 03│
│                                                 │ No pro materials       → 04│
│                                                 │ Repetitive admin       → 03│
└────────────────────────────────────────────────────────────────────────────┘
┌ 02 — ONE PARTNER (dark ink band) ─────────────────────────────────────────┐
│ One partner, not ten vendors.         [ Without BFourU | With BFourU ]    │
│ ┌──────────── diagram: tangled lines ⇄ hub & spokes ───────────┐           │
│ └──────────────────────────────────────────────────────────────┘           │
│ 8 briefs · 8 invoices · 8 versions of you  ⇄  1 brief · 1 contact · 1 brand │
└────────────────────────────────────────────────────────────────────────────┘
┌ 03 — WHAT WE DO ──────────────────────────────────────────────────────────┐
│ 14 services. Five ways we help. 159 deliverables.                         │
│ ─────────────────────────────────────────────────────────────────────────  │
│ 01  Brand & Creative        Branding · Creative design · Photo & media  → │
│ 02  Digital & Web           Digital marketing · Websites & apps         → │
│ 03  Technology & Automation …                                           → │
│ (rows expand on hover/focus to show service links + glyphs)               │
└────────────────────────────────────────────────────────────────────────────┘
┌ 04 — HEALTHCARE (sage band) ──────────────────────────────────────────────┐
│ You care for patients.            │ Discover → Book → Arrive → Wait →      │
│ We take care of the rest.         │ Consult → Follow up  (mini journey)    │
│ [Explore healthcare →]            │                                        │
└────────────────────────────────────────────────────────────────────────────┘
┌ 05 — STARTING POINTS ─────────────────────────────────────────────────────┐
│ [Brand launch]   [Always-on marketing]   [Clinic launch]   [Event]        │
│  services list    services list           services list     services list  │
│  [+ Add set to brief]  …                                                   │
└────────────────────────────────────────────────────────────────────────────┘
┌ 06 — HOW WE WORK ─────────────────────────────────────────────────────────┐
│ sticky title  │ 01 Understand  02 Shape  03 Plan & design  04 Review &     │
│               │ approve  05 Execute & deliver  06 Ongoing support          │
└────────────────────────────────────────────────────────────────────────────┘
┌ 07 — CARE COMMITMENTS ─┐ ┌ 08 — FAQ (accordion) ┐ ┌ CLOSING CTA (ink) ────┐
```

## Services index

```
H1 Everything your brand needs, organised in five clusters.
[jump: 01 02 03 04 05]   (healthcare-specific services carry a "Healthcare" tag)
── 01 Brand & Creative ───────────────────────────────────────────
  [card: glyph · name · tagline · n deliverables · →] ×3
── 02 … (repeats)
CTA band
```

## Service detail

```
Services / Brand & Creative / Branding & Identity
┌──────────────────────────────────┬──────────────────────────────┐
│ ◰ 01 · Brand & Creative  [Healthcare-ready]                     │
│ H1 Branding & Identity           │   [ designed mock deliverable ]│
│ tagline (lead)                   │                              │
│ [+ Add to my brief] [◎ Ask on WhatsApp]                          │
└──────────────────────────────────┴──────────────────────────────┘
What's included (n)   │ deliverable rows, 2 columns, numbered
Who it's for          │ audience chips
The outcome           │ large quote-style statement
Good to know          │ compliance note (if any)
Works well with       │ 3 related service cards
CTA band
```

## Healthcare

```
HERO (sage): You care for patients. We take care of the rest.
Who we work with: 9 audience chips
PATIENT JOURNEY: [Discover][Book][Arrive][Wait][Consult][Follow up]  ← tabs/track
   stage detail: description + services at this touchpoint (links)
Starting points for healthcare (clinic launch / hospital experience / medical event)
CARE COMMITMENTS (6)
Boundaries: what we don't do
CTA
```

## Approach

```
H1 Built around you. Delivered as one.
About (brief text) │ Vision / Mission cards
Why one partner? (answers the objection)
PROCESS (6 steps, numbered, large)
ENGAGEMENT: [Project-based] [Subscription-based] + "What shapes your quote"
Principles (4)
What we don't do
CTA
```

## Contact / Brief Builder

```
H1 Let's put your brief together.
┌ BRIEF BUILDER ───────────────────────────┐ ┌ DIRECT ───────────────┐
│ 1 You are…  (chips: Startup, SME, …)      │ │ ◎ WhatsApp            │
│ 2 You need… (service chips by cluster)    │ │ ✆ +91 91829 70829     │
│ 3 Way of working (Project/Subscription/?) │ │ ✉ email               │
│ 4 Name* · Phone* · Email · City · Note    │ │ What happens next 1-2-3│
│ ☐ consent                                  │ └───────────────────────┘
│ [Send on WhatsApp →] [Send by email]       │
└───────────────────────────────────────────┘
```

## Mobile adaptations (360 px)

- Hero headline wraps to 5–6 lines at ~3.1rem. CTAs go full-width, stacked. The marquee stays as a swipeable strip.
- The problem list becomes a single column. Cluster rows become tap-to-expand accordions.
- The vendor diagram scales to fit (SVG viewBox), with the toggle above it.
- The patient journey becomes a vertical stepper with the active stage expanded.
- The process becomes a vertical timeline. The Brief Builder becomes a single column with chips wrapping.
- The sticky bottom action bar appears after the hero and hides when the footer is visible.
