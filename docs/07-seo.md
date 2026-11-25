# 07 · SEO: what was done and what to do next

_Last updated: 25 November 2026. Live site: https://bfouru.com (www redirects to it)._

## 1. Audit (before)
The site already had a strong technical base:
- Every route is prerendered to real HTML, with one H1 per page.
- Each page has its own title, description and canonical URL.
- An XML sitemap and robots.txt are in place.
- JSON-LD covers the organisation, breadcrumbs, services and FAQ.
- Images have alt text, and fonts are self-hosted.

**Gaps found**
| Issue | Impact |
|---|---|
| Titles led with the brand and cluster names ("Creative Design — Brand & Creative"), not the words people search. Two titles were over 70 characters. | Lower click-through; weak keyword relevance |
| Every page shared one social image | Weak link previews on WhatsApp, LinkedIn and Facebook |
| No content beyond service pages, so nothing answered informational searches | Little long-tail traffic and few internal links |
| No logo or sameAs in the organisation schema; no WebSite schema | Weaker brand / knowledge panel signals |
| No location or address | Local search (Google Maps) can't be targeted yet |
| The default URL in code was www.bfouru.com, but the live site is bfouru.com | Risk of mismatched canonicals in local builds |

## 2. Changes made
**Titles and descriptions** (`src/data/seo.ts`)
- Each title leads with keywords and ends with the brand, at 60 characters or fewer. Each description is 155 characters or fewer and states the benefit, the audience and the action. All 25 pages are covered.

**Insights: three new guides** (`/insights`, `src/data/articles.ts`)
| URL | Targets searches like |
|---|---|
| /insights/nmc-advertising-guidelines-doctors-checklist | NMC advertising guidelines 2026, doctors social media rules, NMC testimonial rules |
| /insights/google-business-profile-checklist | Google Business Profile checklist, clinic Google listing, GMB for doctors |
| /insights/what-a-clinic-website-should-include | clinic website design, doctor website features, hospital website pages |

Each guide is linked from the related service pages ("Related reading"), the healthcare page, the footer and the mobile menu. Each one carries Article and Breadcrumb schema.

**Structured data**
- WebSite schema added on the home page.
- Organisation schema now includes the logo (`/logo-512.png`), a default image, `areaServed: India`, and optional `sameAs` and address fields.
- Service schema now includes the URL, audience and area served.
- New schema types: CollectionPage for the Insights listing, and Article for each guide.

**Social previews**
- Each page has its own 1200×630 image in `public/og/` (24 images).
- Added `og:image:width/height/alt` and `twitter:title/description/image` tags.
- To regenerate the images: `npm run build && npm run og && npm run build`.

**Consistency**
- The default domain in code is now `https://bfouru.com`, matching the live site and the deploy workflow.

**Not changed**
- Visible page copy, design and URLs stayed the same.
- No keyword stuffing.
- No invented statistics, reviews or locations.

## 3. Keyword map (primary → page)
| Search intent | Page |
|---|---|
| branding agency, logo design, brand identity | /services/branding-identity |
| graphic design, social media creatives, brochure design | /services/creative-design |
| corporate / clinic photography, video production | /services/photography-media |
| digital marketing agency, social media management, Google Business Profile management | /services/digital-marketing |
| website design company, app development, doctor website | /services/website-app-development |
| WhatsApp automation, appointment reminder system | /services/smart-automation |
| clinic management software | /services/clinic-management-software (marked as proposed) |
| OPD display system, hospital digital signage, token display | /services/opd-tv-displays |
| IT support for small business / clinics | /services/it-technical-solutions |
| clinic signage, office signboard, reception wall branding | /services/interior-branding-signage |
| visiting card printing, brochure printing, prescription pad printing | /services/printing-production |
| corporate gifts, branded merchandise | /services/customized-merchandise |
| medical conference branding, CME event branding | /services/events-conferences |
| patient education material, health awareness posters | /services/patient-education |
| healthcare marketing agency, clinic branding | /healthcare |

Adding a **city** will strengthen every one of these (for example, "branding agency in Hyderabad"). See 4.2.

## 4. Your next steps (these need your accounts or decisions)
### 4.1 Do this week
1. **Deploy:** push to `main`. GitHub Actions publishes the site to bfouru.com.
2. **Google Search Console** (search.google.com/search-console):
   - Add the domain property `bfouru.com` and verify it through a DNS TXT record at your domain registrar.
   - Submit `https://bfouru.com/sitemap.xml`.
   - Use URL Inspection → Request indexing for the home, healthcare and services pages and the three guides.
3. **Bing Webmaster Tools:** import the site from Search Console (one click). Bing also feeds some AI search tools.
4. **Domain email:** set up `hello@bfouru.com` and update `site.email`. A Gmail address looks less trustworthy to customers and search engines.

### 4.2 Local SEO (the biggest opportunity)
1. Decide and confirm the **office address** or **service area**, then fill in `siteProfile.address` in `src/data/site.ts`.
2. Create and verify a **Google Business Profile**:
   - Primary category: "Marketing agency"; secondary categories such as "Graphic designer", "Website designer" and "Sign shop".
   - Use the same name, address and phone number as the website.
   - Add photos, services and the website link.
3. List the business, with identical details, on directories such as Justdial, Sulekha, IndiaMART, Clutch, GoodFirms and LinkedIn.
4. Create official **Instagram, Facebook, LinkedIn and YouTube** profiles. Add their URLs to `siteProfile.sameAs`.
5. Once you have real clients, ask them for honest Google reviews. Never buy reviews. For healthcare clients, follow the NMC rules in the guide.
6. Optional: add city landing pages (for example `/branding-agency-hyderabad`), only for cities you actually serve.

### 4.3 Ongoing (monthly)
- Publish one or two new guides a month. Good topics:
  - patient education ideas
  - OPD display content
  - rebranding a clinic
  - visiting card design
  - WhatsApp Business for clinics
- Check Search Console: queries, clicks and pages not indexed. Improve titles where pages get impressions but few clicks.
- Add real project case studies, with client permission, once they're available. These are the strongest content for ranking and for converting visitors.
- Keep the guides' `updated` dates current when you revise them.

## 5. Checking it works
- **Rich Results Test** (search.google.com/test/rich-results): test the home page, a service page and a guide.
- **Social previews:** share a link in WhatsApp, or use LinkedIn Post Inspector, to refresh the cached preview images.
- **PageSpeed Insights** (pagespeed.web.dev): test the home page on mobile.
