/**
 * Insights articles — practical, evergreen guides that answer real searches.
 * Rules: no invented statistics, no client claims, healthcare content framed as general guidance (not legal advice).
 */
export type Block =
  | { h2: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { note: string };

export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  published: string; // ISO date
  updated: string;
  readMins: number;
  audience: 'healthcare' | 'business';
  services: string[]; // related service slugs
  body: Block[];
}

export const articles: Article[] = [
  {
    slug: 'nmc-advertising-guidelines-doctors-checklist',
    title: 'NMC’s 2026 advertising guidelines: a checklist for doctors and clinics before posting online',
    seoTitle: 'NMC Advertising Guidelines 2026 for Doctors',
    description:
      'A plain-language checklist for doctors, clinics and hospitals on social media, websites, reviews and AI content under NMC’s October 2026 guidelines.',
    eyebrow: 'Healthcare communication',
    published: '2026-11-25',
    updated: '2026-11-25',
    readMins: 5,
    audience: 'healthcare',
    services: ['digital-marketing', 'creative-design', 'patient-education', 'website-app-development'],
    body: [
      { p: 'In October 2026 the National Medical Commission (NMC) issued Guidelines on Ethical Advertising and Public Communication for registered medical practitioners and hospitals. News coverage at the time reported that they apply across traditional and digital media — including websites, social media, WhatsApp and Telegram, podcasts, influencer marketing, search and platform promotion, and AI-generated content.' },
      { p: 'Doctors are still allowed to communicate publicly. The aim is to keep that communication factual, respectful and free of solicitation. This checklist summarises the practical points we apply when we create healthcare content for clients.' },
      { note: 'This is general guidance, not legal advice. Always read the official notification on the NMC website (nmc.org.in) and check with your own adviser before publishing.' },
      { h2: 'Before you post: a 10-point checklist' },
      { ol: [
        'Is the content factual and educational, rather than promoting a procedure or soliciting patients?',
        'Has the treating doctor reviewed and approved every clinical statement?',
        'Is there any testimonial or endorsement — from a patient, celebrity, influencer or other third party? If so, remove it.',
        'Does it avoid words like “best”, “No. 1”, “guaranteed” or promises of results?',
        'Do you have written, informed consent for any patient image, video, scan or story — and is it really needed at all?',
        'If the post is from a hospital or clinic, does it clearly name the registered medical practitioner associated with the content?',
        'Was any part generated with AI? Check it carefully for accuracy and make sure it is not misleading or promotional.',
        'Are you avoiding paid likes, followers, ratings or reviews — and not asking patients to post reviews in return for anything?',
        'Is it a paid, boosted or influencer post? Check carefully that it does not amount to prohibited promotion.',
        'Would a patient reading it be better informed — and not pressured?',
      ] },
      { h2: 'What is still useful — and allowed' },
      { p: 'Clear, factual information helps patients, and it builds trust slowly and reliably. Content that generally fits the spirit of the guidelines includes:' },
      { ul: [
        'Clinic timings, location, departments, facilities and how to book',
        'Doctor profiles with qualifications and registration details',
        'Health awareness content that is accurate and approved by a doctor',
        'Announcements: a new department, a health camp, a change in timings',
        'Patient instructions and education material handed out after a consultation',
      ] },
      { h2: 'Websites and Google profiles' },
      { p: 'Your website and Google Business Profile are public communication too. Keep them factual and up to date, show who the doctors are, and remove any old testimonial sections. Reviews that patients choose to leave on their own are different from reviews you request, reward or buy — avoid the latter.' },
      { h2: 'How BFourU handles healthcare content' },
      { p: 'Every clinical message we design — for social media, OPD screens, print or patient education — is approved by the relevant doctor before it is published. We do not create testimonial campaigns, buy engagement or make outcome claims, and we caption illustrative work as illustrative.' },
    ],
  },
  {
    slug: 'google-business-profile-checklist',
    title: 'Google Business Profile checklist for clinics and small businesses',
    seoTitle: 'Google Business Profile Checklist for Clinics',
    description:
      'Set up and maintain a complete Google Business Profile: categories, hours, photos, consistent contact details, posts and honest review replies.',
    eyebrow: 'Local search',
    published: '2026-11-25',
    updated: '2026-11-25',
    readMins: 4,
    audience: 'business',
    services: ['digital-marketing', 'website-app-development', 'photography-media'],
    body: [
      { p: 'For many local businesses and clinics, the Google Business Profile is the first thing people see — on Google Search and Maps, often before they visit your website. A complete, accurate profile makes it easier for people to find you, call you and get directions.' },
      { h2: 'Set-up essentials' },
      { ol: [
        'Claim and verify your profile through Google Business Profile (business.google.com).',
        'Use your real business name — exactly as it appears on your signboard. Don’t add keywords to the name.',
        'Choose the most specific primary category, then add a few accurate secondary categories.',
        'Add your exact address (or service area), phone number, WhatsApp-enabled number and website.',
        'Set regular hours, and update special hours for holidays and festivals.',
        'Write a clear description of what you offer and who you serve.',
      ] },
      { h2: 'Keep your details consistent' },
      { p: 'Your name, address and phone number should be identical on your Google profile, website, social media pages, directories and printed material. Inconsistent details confuse customers — and search engines.' },
      { h2: 'Photos that help' },
      { ul: [
        'The entrance and signboard, so people recognise the building',
        'Reception, waiting area and key rooms — clean and well lit',
        'Your team, with their consent',
        'Your logo and a cover image in your brand colours',
        'For clinics: never patients, and nothing that could identify one',
      ] },
      { h2: 'Keep it active' },
      { ul: [
        'Post updates: new services, timings, events, health camps or awareness days',
        'Answer questions in the Q&A section accurately',
        'Reply to reviews politely and briefly — never share any personal or medical details in a reply',
        'Check the profile monthly; anyone can suggest edits, so make sure the details are still right',
      ] },
      { note: 'For doctors and clinics: avoid soliciting, rewarding or buying reviews. See our NMC advertising checklist for the wider rules on public communication.' },
      { h2: 'Where BFourU can help' },
      { p: 'Google Business Profile management is part of our digital marketing service, together with photography, consistent branding and a website that matches.' },
    ],
  },
  {
    slug: 'what-a-clinic-website-should-include',
    title: 'What a doctor’s or clinic website should include',
    seoTitle: 'What a Doctor’s or Clinic Website Should Include',
    description:
      'The pages, details and features that make a clinic or doctor website useful: services, doctor profiles, timings, booking, WhatsApp, privacy and speed.',
    eyebrow: 'Websites',
    published: '2026-11-25',
    updated: '2026-11-25',
    readMins: 5,
    audience: 'healthcare',
    services: ['website-app-development', 'smart-automation', 'branding-identity', 'photography-media'],
    body: [
      { p: 'Most patients will look at your website on a phone, usually to answer a simple question: can this clinic help me, when is it open, and how do I book? A good clinic website answers those questions quickly and calmly.' },
      { h2: 'Pages every clinic website needs' },
      { ul: [
        'Home — who you are, what you treat, and how to book or call, visible without scrolling',
        'Services or departments — one clear section per specialty, in plain language',
        'Doctors — names, qualifications, specialties, registration details and consultation timings',
        'Timings and location — hours, holidays, a map, parking and accessibility information',
        'Contact and booking — phone, WhatsApp, an appointment form or online booking',
        'Privacy notice — what you collect through the website and why',
      ] },
      { h2: 'Features that make it easier to use' },
      { ul: [
        'One-tap call and WhatsApp buttons on mobile',
        'Online appointment booking or a short request form',
        'Fast loading on ordinary mobile connections',
        'Readable text, good contrast and simple language (accessibility helps everyone)',
        'Content in the languages your patients speak, where that helps',
        'Automated confirmations and reminders once an appointment is booked',
      ] },
      { h2: 'What to leave out' },
      { ul: [
        'Patient testimonials and “success stories” used for promotion',
        'Claims such as “best”, “No. 1” or guaranteed results',
        'Patient photos, scans or identifiable details',
        'Stock photos that pretend to be your team or premises',
      ] },
      { note: 'Healthcare websites are public communication, so NMC’s guidelines on ethical advertising apply. See our NMC checklist for details.' },
      { h2: 'Privacy and consent' },
      { p: 'If your website collects names, phone numbers or health information through forms, collect only what you need, explain why, and handle it securely. India’s Digital Personal Data Protection Act, 2023 sets out duties for organisations that process personal data — take advice on how it applies to your clinic.' },
      { h2: 'One brand, everywhere' },
      { p: 'Your website should look like your signboard, your prescription pad and your social media. When everything matches, patients recognise you instantly — which is exactly what BFourU sets out to build.' },
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const articlesForService = (slug: string) => articles.filter((a) => a.services.includes(slug));
