# 06 · Build, Performance, SEO & QA

## Technical decisions

| Decision | Why |
|---|---|
| **React 19 + TypeScript + Vite 8** | Requested stack. Fast builds and a typed content model. |
| **Static prerendering** (`scripts/prerender.mjs`) | Every route is rendered to real HTML at build time (21 pages: home, services index, 14 service pages, healthcare, approach, contact, privacy, 404). Content, titles and structured data are in the HTML before JS loads, which helps SEO, link previews and slow Indian mobile networks. React then hydrates. |
| **MPA serving + `/route.html` siblings** | Each URL serves its own HTML on any static host (no single-page fallback that would hand `/contact` the home page). |
| **CSS Modules + design tokens** (`src/styles/global.css`) | Bespoke design without a utility framework. Tokens drive colour, type, spacing and motion. |
| **No animation/scroll libraries** | Motion is CSS + IntersectionObserver. No Lenis/GSAP/WebGL, and no preloader. |
| **Self-hosted variable fonts** (Fontsource) | No Google Fonts request (performance and privacy). The two primary fonts are preloaded. The italic serif loads only when used. |
| **Code-built visuals** (`Mock.tsx`, `Glyph.tsx`) | 14 deliverable mock-ups and the icon system are HTML/CSS/SVG: crisp at any size, about 0 KB of images, and honest (illustrative, fictional names). |
| **Content as data** (`src/data/*.ts`) | Services, clusters, process, FAQs, journey stages and contact details are edited in one place. |
| **No backend required** | Briefs are sent via the visitor's WhatsApp/email with a prefilled, readable summary. An optional `VITE_FORM_ENDPOINT` enables direct POST. |

## Build output (production)

| Asset | Raw | Gzipped |
|---|---|---|
| JavaScript (React, router, app) | 393 KB | **~120 KB** |
| CSS (all pages) | 86 KB | **~19 KB** |
| Home HTML (prerendered) | 164 KB | **~18 KB** |
| Fonts | Bricolage 77 KB + Instrument 30 KB (preloaded) · Newsreader Italic 65 KB (on demand) | already compressed |
| Images | 0 on pages (OG image 70 KB, touch icon 2 KB) | |

About half the JS is `react-dom` itself. Because pages are prerendered, content paints before the bundle downloads. Possible future optimisation: route-level code splitting (it needs pre-hydration chunk loading).

## SEO

- A unique `<title>`, meta description (≤ 160 characters), canonical, Open Graph and Twitter card on every page.
- JSON-LD: `ProfessionalService` (organisation), `FAQPage` (home), `BreadcrumbList`, `ItemList` (services), `Service` + `OfferCatalog` (each service page).
- `sitemap.xml` (20 indexable URLs) and `robots.txt` are generated at build. The 404 page is `noindex`.
- Semantic headings: one H1 per page and no skipped levels (verified by script on every page).
- Set the real domain with `VITE_SITE_URL=https://your-domain npm run build` (see CONTENT-TO-CONFIRM).

## Accessibility (WCAG 2.2 AA target)

- Colour contrast was checked numerically for every text/background pairing. Ink on paper is 14.6:1, muted on paper 5.1:1, accent-ink on paper 5.7:1, accent on ink 4.5:1 and teal on paper 5.5:1. The bright accent is never used for small text on light backgrounds.
- Skip link, landmarks (`header`, `nav`, `main`, `footer`), and focus moves to `main` on route change.
- Visible `:focus-visible` rings. Keyboard support for the services panel (Esc closes), mobile menu and brief drawer (focus trap, Esc, scroll lock), patient-journey tabs (arrow/Home/End keys), FAQ (native `details`) and form chips.
- Forms: visible labels, `autocomplete`, `inputmode`, inline errors with `aria-invalid` / `aria-describedby`, an error summary with `role="alert"`, and an explicit consent checkbox.
- The auto-moving showcase has a pause button and pauses on hover and focus. `prefers-reduced-motion` disables reveals, marquee, ticker and diagram animation.
- A script audit of every page found no unnamed links or buttons, no unlabelled inputs, no duplicate IDs, and `rel="noopener"` on all new-tab links.

## QA performed

| Check | Result |
|---|---|
| TypeScript strict typecheck | ✅ passes (part of `npm run build`) |
| Production build + prerender of 21 routes | ✅ |
| Hydration errors (fresh browser, every route, production build) | ✅ none |
| Horizontal overflow at 320 / 360 / 768 / 1024 / 1440 px on 8 key routes | ✅ none (two issues found and fixed: cluster-row text column at 360 px; diagram layout switch on phones) |
| Visual review: desktop 1440, tablet 768, mobile 390 (full-page captures of every page type) | ✅ |
| Brief tray: add/remove, persistence, header counter, toast, drawer focus trap / Esc | ✅ |
| `/contact?service=…&type=…` prefill (merged with saved brief) | ✅ (race condition found and fixed) |
| Form validation (required, phone length, email format, consent) and WhatsApp message composition | ✅ |
| WhatsApp deep link opens with a correctly formatted brief | ✅ |
| Every URL serves its own prerendered HTML (incl. query strings); unknown URLs return 404 | ✅ (SPA-fallback issue found and fixed) |
| Mobile menu geometry, scroll lock, footer actions | ✅ |

## Issues found during testing and fixed

1. The healthcare band had a stray `undefined` class.
2. Process step numbers were nearly invisible on the sand background, so their contrast was raised.
3. Cluster service lists broke awkwardly on phones. Items are now kept together, and the column can shrink.
4. Service headings lower-cased acronyms ("opd tv"). An acronym-safe helper fixes this.
5. Uppercase labels turned "BFourU" into "BFOURU", so the label was reworded.
6. The preview server returned the home HTML for `/contact`, causing hydration mismatches. Fixed with MPA mode and `.html` siblings.
7. The `?service=` prefill was overwritten by the saved brief, so the two are now merged.
8. The WhatsApp brief lost its blank line after the greeting.
9. The page fade-in ran on first load, so it now only runs on in-app navigation.
10. The vendor diagram animated from the desktop to the mobile layout on load, so it now jumps.
11. The hidden mobile action bar is now also `visibility: hidden`.
12. Meta descriptions were shortened to ≤ 160 characters.

## Known limitations / next steps

- No real proof (case studies, logos, testimonials) yet. See CONTENT-TO-CONFIRM.
- A Lighthouse run was not performed in this environment. Run `npx lighthouse http://localhost:4173 --view` after `npm run build && npm run preview` for official scores.
- Route-level code splitting could cut ~30–40 KB of JS from first load.
- Without `VITE_FORM_ENDPOINT`, enquiries depend on the visitor pressing send in WhatsApp or email.

## Design changes made during build (vs. wireframes)

- **Services index audience filter → dropped.** Almost every service applies to healthcare too, so a filter hid only 3 of 14 cards and added a decision without helping anyone. It was replaced by cluster jump links plus a "Healthcare" tag on the three healthcare-specific services, and the Healthcare page groups those separately.
- **Brand name** changed to **BFourU** site-wide at the client's request.
