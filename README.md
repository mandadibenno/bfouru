# BFourU — Company Website

**One Brand. Multiple Solutions. Complete Support.**

A custom-designed, fully responsive React website for BFourU, a creative, digital, technology and business-support agency with a healthcare specialisation.

## Quick start

```bash
npm install
npm run dev        # development server → http://localhost:5173
npm run build      # typecheck + production build + prerender all pages → dist/
npm run preview    # serve the production build → http://localhost:4173
```

Requires Node 20+.

## Deploying

`dist/` is a fully static site. Upload it to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, Hostinger, an S3 bucket, nginx and so on).

- Every route has its own prerendered HTML (`/services/branding-identity/index.html` and `/services/branding-identity.html`).
- `404.html` is the not-found page.
- Set the real domain at build time so canonical URLs and the sitemap are correct:

```bash
VITE_SITE_URL=https://www.your-domain.com npm run build
```

Optional: receive briefs directly by setting a form endpoint (Formspree, Web3Forms, your API):

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx npm run build
```

## Editing content

| What | Where |
|---|---|
| Phone, WhatsApp, email, domain | `src/data/site.ts` |
| Services (names, copy, deliverables, related services) | `src/data/services.ts` |
| Process, FAQs, commitments, patient journey, starting points | `src/data/content.ts` |
| Logo | `src/components/Logo.tsx`, `public/favicon.svg` |
| Colours, type, spacing (design tokens) | `src/styles/global.css` |

## Project structure

```
docs/                  Research, strategy, design system, wireframes, QA, content to confirm
public/                Favicon, touch icon, social image, manifest
scripts/prerender.mjs  Static prerender + sitemap/robots
src/
  data/                Content model (site, services, content)
  components/          Header, Footer, Mock deliverables, Glyph icons, BriefTray, VendorDiagram…
  pages/               Home, Services, Service, Healthcare, Approach, Contact, Privacy, NotFound
  lib/                 Brief state, SEO/head, hooks
  styles/global.css    Design tokens and base styles
```

## Documentation

1. [Brief & business understanding](docs/01-brief-and-business.md)
2. [Market & competitor research (17 sites)](docs/02-market-and-competitor-research.md)
3. [UX research & strategy](docs/03-ux-strategy.md)
4. [Creative direction & design system](docs/04-design-direction-and-system.md)
5. [Wireframes](docs/05-wireframes.md)
6. [Build, performance, SEO & QA](docs/06-build-and-qa.md)
7. **[Content & details to confirm before launch](docs/CONTENT-TO-CONFIRM.md)**
