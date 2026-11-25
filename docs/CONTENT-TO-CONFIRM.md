# Content & details to confirm before launch

The site is complete and working, but some business details were not in the brief (or were marked "pending confirmation"). Everything below is easy to change. Most items live in **`src/data/site.ts`**, **`src/data/services.ts`** or **`src/data/content.ts`**.

## Must confirm

| Item | Current value | Where |
|---|---|---|
| Phone / WhatsApp | `+91 91829 70829` (brief: "pending confirmation") | `src/data/site.ts` |
| Enquiry email | `pramod.pramod.949@gmail.com`. A domain email (e.g. `hello@bfouru.com`) builds more trust | `src/data/site.ts` |
| Website domain | `https://www.bfouru.com` (placeholder, used for canonical URLs, sitemap, social cards) | `src/data/site.ts` or env `VITE_SITE_URL` at build time |
| Legal entity name | `BFourU` | `src/data/site.ts` |
| Brand name styling | **BFourU** (as instructed). The brief file uses "BFouru" | Global |
| Logo | A proposed modular mark + wordmark was designed for the site. Replace if an official logo exists | `src/components/Logo.tsx`, `public/favicon.svg`, `public/apple-touch-icon.png`, `public/og-image.png` |
| Privacy notice | Plain-language template written for how this site actually behaves. **Have it reviewed legally** (DPDP Act 2023 / Rules 2025) | `src/pages/Privacy.tsx` |

## Commitments written into the copy (confirm you're comfortable making them)

These follow directly from the brief's own caveats and from NMC guidance, but they are public promises:
- "We don't buy followers or reviews, and we don't promise guaranteed outcomes." (Digital Marketing page, care commitments)
- "Nothing goes live or to print without your sign-off — and no clinical content without a doctor's." (Process step 4)
- "One point of contact" coordinating every engagement.
- "Takes about 2 minutes" on the contact page (refers to filling the brief).

## Not included on purpose (add when real)

The brief has no case studies, client list, testimonials, awards or statistics, and **none were invented**. When you have them:
- **Case studies / work:** a `/work` section can be added (the IA reserves it). Even 3 strong case studies will lift conversion significantly.
- **Client logos:** only with written permission.
- **Testimonials:** use *business-client* testimonials about BFourU's service. For healthcare clients, avoid anything that reads as patient testimonials or outcome claims (NMC guidance).
- **Response time promise** (e.g. "we reply within one working day") once you can guarantee it.
- **Office address / service area / business hours** for the footer, Google Business Profile and structured data.
- **Social media links** (Instagram, LinkedIn, YouTube, Facebook) for the footer and `sameAs` in structured data.
- **GSTIN / registration details** if you want them in the footer.

## Optional set-up

- **Direct form submissions:** right now, briefs go out through the visitor's WhatsApp or email app (no backend needed). To also receive them in an inbox or CRM, set `VITE_FORM_ENDPOINT` to a form service (e.g. Formspree, Web3Forms, Basin) or your own API and rebuild. The form then shows "Send my brief" and posts JSON.
- **Analytics:** none is installed, by design (privacy-first). If you add one, prefer a cookieless, privacy-friendly tool and update the privacy notice.
