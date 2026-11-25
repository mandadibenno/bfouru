# 04 · Creative Direction & Design System

## 1. Three directions explored

### Direction A: "Clinical Clean" ✗
White canvas, medical blue/teal, rounded cards, friendly line icons, stock photos of smiling doctors.
- **For:** instantly reads "healthcare"; low risk.
- **Against:** it is what DigiScrub, Healthcare Success, DocPulse and Pickcel already look like (see research). It also **pigeonholes BFourU as a healthcare-only agency**, which the brief explicitly rejects. It reads as a template.

### Direction B: "Dark Creative-Tech" ✗
Black canvas, neon accent, giant kinetic type, WebGL, smooth-scroll hijacking, preloader (the Noomo / Schbang end of the spectrum).
- **For:** award-site energy; signals "creative + technology".
- **Against:** cold and intimidating for a 50-year-old hospital administrator or a doctor on a mid-range phone. Heavy on Indian mobile networks. Easy to make look like every other "AI agency". It undermines the trust a healthcare audience needs.

### Direction C: "Warm Editorial Systems" ✓ chosen
A warm ivory canvas, deep forest ink, one confident persimmon accent. Large, crafted display typography with editorial layouts and hairline rules. A **modular "tile" language** expresses *one system → many outputs*. Deliverables are shown as **finely crafted, code-built mock objects** (an OPD screen, a WhatsApp reminder, a wayfinding sign, a prescription pad) instead of stock photos.
- **Why it wins:**
  - **Premium without coldness.** The editorial confidence of Pentagram, Codesign and Klick, with warmth suited to doctors and SME founders.
  - **Distinct in the category.** No competitor in the set uses a warm ivory + forest + persimmon palette. Healthcare sites are blue/white and agencies are black/white.
  - **One brand, two audiences.** Healthcare isn't a different look. It's the same system with a calmer sage/teal tint, which says "specialist vertical" rather than "different company".
  - **Honest proof.** The mock deliverables demonstrate craft and breadth without pretending to be client work.
  - **Performance.** Typography and CSS-built visuals weigh almost nothing compared with photography or WebGL.

## 2. Brand idea: the modular mark

"One Brand. Multiple Solutions." becomes a **2 × 2 modular tile mark**: four cells built from simple primitives (square, circle, quarter-round). One cell is always persimmon, *the part that's specifically for you*. The four cells also nod to the "Four" in B**Four**U.

The same primitive vocabulary generates:
- **Service glyphs.** Each of the 14 services has a unique 2 × 2 arrangement (`src/data/services.ts → glyph`). Together they form a consistent icon family with no off-the-shelf icon set.
- **Cluster markers** and decorative section dividers.

> The wordmark and mark are a proposed website identity. If BFourU has an official logo, replace `src/components/Logo.tsx`. Everything else adapts.

## 3. Colour

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F3EFE7` | Primary canvas (warm ivory) |
| `--paper-2` | `#EAE4D8` | Raised surfaces, alternating bands |
| `--paper-3` | `#DED6C6` | Hairline-strong borders, chips |
| `--ink` | `#10211C` | Text, dark sections, primary buttons |
| `--ink-2` | `#33433D` | Secondary text |
| `--muted` | `#5A6862` | Tertiary text (≥ 4.9:1 on paper) |
| `--accent` | `#E4572E` | Persimmon: signature dots, highlights, large display accents, active states |
| `--accent-ink` | `#A63A1B` | Accent for small text on paper and paper-2 (≥ 4.9:1) |
| `--sage` | `#D3DFD3` | Healthcare surfaces |
| `--teal` | `#1E6B58` | Healthcare accent (≥ 5.5:1 on paper, 4.6:1 on sage) |
| `--marigold` | `#E9B44C` | Tertiary, used only inside mock deliverables |

**Rules:** the accent never carries small body text on paper (use `--accent-ink`). Primary buttons are ink on paper and paper on ink. The accent fills on hover/active. There are no gradients except a subtle paper grain.

## 4. Typography

| Role | Family | Settings |
|---|---|---|
| Display / headings | **Bricolage Grotesque** (variable, opsz 12–96) | wght 560–700, `opsz` matched to size, tracking −0.02 to −0.045em |
| Text / UI | **Instrument Sans** (variable) | 400/500/600, 1.55–1.65 line-height |
| Editorial accent | **Newsreader Italic** | Used for 1–3 words per page, never for body |

**Why:** Bricolage's optical-size axis gives large headlines a hand-crafted, slightly idiosyncratic character (ink-trap-like details) that reads as "designed", not "default". Instrument Sans is crisp, neutral and highly legible on small Android screens. Neither is Inter, Poppins, Roboto or Sora, the faces that dominate the competitor set. All fonts are **self-hosted** (no Google Fonts request, which is better for performance and privacy).

**Fluid scale** (`clamp`, 360 → 1440 px):
- Display XL: 3.1rem → 8rem, line-height 0.9
- Display L: 2.6rem → 5.25rem
- H2: 2.1rem → 3.75rem
- H3: 1.35rem → 1.9rem
- Lead: 1.125rem → 1.375rem
- Body: 1rem → 1.0625rem
- Eyebrow: 0.75rem, uppercase, +0.14em tracking, tabular numerals

## 5. Layout & spacing

- **Container:** max 1440 px; side gutter `clamp(1rem, 4vw, 3.5rem)` (16 px on phones).
- **Grid:** 12 columns on desktop, 6 on tablet, 4 on mobile, with fluid gap.
- **Section rhythm:** `clamp(4.5rem, 3rem + 7vw, 10rem)` vertical padding. Sections are separated by hairline rules carrying a numbered eyebrow (`01 — What we do`), an editorial device that gives long pages a navigable structure.
- **Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Shape language:** *structure is precise, objects are tactile.* Layout uses sharp hairlines and no radii. Interactive objects (buttons, chips, mock deliverables, drawers) use generous radii.

## 6. Motion principles

| Principle | Implementation |
|---|---|
| Motion explains, never decorates | The vendor diagram (tangled → hub) and patient-journey track are the only "big" animations, and both carry meaning |
| Quick and calm | 180 ms for UI feedback; 600–800 ms `cubic-bezier(.2,.7,.1,1)` for reveals |
| No scroll-jacking | Native scroll only (no Lenis). Accessible and predictable |
| Respect the user | `prefers-reduced-motion` disables reveals, marquee and diagram transitions |
| Content first | No preloader; prerendered HTML paints before JS |

Signature micro-interactions: the button arrow slides out and back in on hover, link underlines draw from the left, the header hides on scroll down and returns on scroll up, glyph cells rotate when a service is hovered, and "Add to brief" morphs into a check with a counter bump in the header.

## 7. Components

`Header` (smart hide/show, services panel, mobile menu) · `Footer` · `Button` (primary/secondary/ghost/whatsapp) · `Glyph` · `Logo` · `Eyebrow` · `SectionHead` · `Reveal` · `Marquee` · `Mock` (14 deliverable mocks) · `ClusterList` · `ServiceCard` · `VendorDiagram` · `PatientJourney` · `ProcessSteps` · `EngagementModels` · `Commitments` · `FAQ` (accessible accordion) · `BriefTray` (drawer) · `BriefBuilder` (form) · `MobileActionBar` · `Seo`.

## 8. Voice & copy

- **Plain, specific, warm.** "We automate the reminders, so your team can focus on people," not "AI-powered omnichannel synergy."
- **No superlatives, no fake urgency, no unverifiable numbers.** The only numbers used are true by construction: 14 services, the deliverable count from the brief, 6 process steps, 2 engagement models.
- **Indian English spelling** (organisation, customised, colour), with `lang="en-IN"`.
- Healthcare copy always respects the boundaries: *non-clinical support, doctor-approved content, consent first*.
