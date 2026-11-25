import type { ClusterId } from './services';

/** Problems named in the brief → the cluster that answers them. */
export const problems: { text: string; detail: string; cluster: ClusterId | 'all' }[] = [
  { text: 'Inconsistent branding', detail: 'A logo here, different colours there, a signboard that matches nothing.', cluster: 'brand' },
  { text: 'Too many vendors', detail: 'A designer, a printer, a developer, a sign-maker — and you in the middle.', cluster: 'all' },
  { text: 'No time for digital', detail: 'Social media, Google profile and reviews that slip every busy week.', cluster: 'digital' },
  { text: 'An outdated website', detail: 'Slow on phones, hard to update, nowhere to book or enquire.', cluster: 'digital' },
  { text: 'Manual follow-ups', detail: 'Reminders, confirmations and enquiries handled one call at a time.', cluster: 'technology' },
  { text: 'Unprofessional materials', detail: 'Printed pieces and presentations that undersell the work you do.', cluster: 'spaces' },
  { text: 'Repetitive admin', detail: 'Hours lost to tasks a well-built system could do in seconds.', cluster: 'technology' },
];

export const process = [
  {
    title: 'Understand',
    text: 'We listen first — your business, your audience, your goals, your constraints and what is already in place.',
  },
  {
    title: 'Shape the solution',
    text: 'We recommend the right mix of services — nothing you don’t need — and share a customised quotation.',
  },
  {
    title: 'Plan & design',
    text: 'Timelines, owners and first designs, all built on one consistent brand system.',
  },
  {
    title: 'Review & approve',
    text: 'You review, we refine. Nothing goes live or to print without your sign-off — and no clinical content without a doctor’s.',
  },
  {
    title: 'Execute & deliver',
    text: 'Production, development, printing, installation or launch — coordinated through one point of contact.',
  },
  {
    title: 'Ongoing support',
    text: 'Where agreed, we stay with you: monthly content, maintenance, updates and reporting.',
  },
];

export const commitments = [
  {
    title: 'Doctor-approved clinical content',
    text: 'Every medical message is reviewed and approved by the relevant healthcare professional before it is published, printed or displayed.',
  },
  {
    title: 'Consent before camera',
    text: 'Patient images, recordings and data are only used with appropriate consent — no exceptions.',
  },
  {
    title: 'Ethical by default',
    text: 'Campaigns respect applicable advertising and professional-ethics requirements. No bought followers, no fake reviews, no guaranteed-outcome claims.',
  },
  {
    title: 'Bots that never diagnose',
    text: 'Chatbots and automations share clinic information and reminders. They never offer medical advice or diagnoses.',
  },
  {
    title: 'Privacy-conscious systems',
    text: 'Automations and software are planned around secure data handling and privacy safeguards from day one.',
  },
  {
    title: 'Clear boundaries',
    text: 'We provide non-clinical support only. Medical care, equipment, medicines and staffing stay out of our scope.',
  },
];

export const exclusions = [
  'Medical equipment supply or procurement',
  'Medicine distribution',
  'Staff recruitment, manpower or staffing supply',
  'Clinical or medical treatment services',
];

export const principles = [
  { title: 'Consistency over noise', text: 'Every output is built on one brand system, so your business looks like one business everywhere.' },
  { title: 'Clarity over jargon', text: 'Plain language, clear scopes and quotes you can actually read.' },
  { title: 'Ethics over shortcuts', text: 'Especially in healthcare: consent, approvals and honest communication come first.' },
  { title: 'Ownership over hand-offs', text: 'One point of contact who is accountable for the whole brief, not just one piece of it.' },
];

export const engagementModels = [
  {
    name: 'Project-based',
    tag: 'Defined scope',
    text: 'A clear deliverable with a beginning and an end.',
    examples: ['A brand identity or rebrand', 'A new website or app', 'Clinic signage and interiors', 'A conference or launch event'],
  },
  {
    name: 'Subscription-based',
    tag: 'Ongoing support',
    text: 'A monthly partnership for work that never really stops.',
    examples: ['Social media & monthly content', 'OPD display content updates', 'Website & IT maintenance', 'Automation upkeep and reports'],
  },
];

export const quoteFactors = [
  { title: 'Services & deliverables', text: 'Which services you need and how many pieces each involves.' },
  { title: 'Volume & formats', text: 'Number of designs, pages, screens, videos or print quantities.' },
  { title: 'Locations & on-site work', text: 'Shoots, installations or support across one or several sites.' },
  { title: 'Timeline', text: 'Standard schedules versus launch-date or event-date deadlines.' },
  { title: 'Level of ongoing support', text: 'One-off delivery, or monthly management and maintenance.' },
];

export const audiences = {
  business: ['Startups', 'Entrepreneurs', 'SMEs', 'Marketing teams', 'Established businesses'],
  healthcare: [
    'Individual doctors',
    'Private clinics',
    'Multi-specialty hospitals',
    'Maternity hospitals',
    'Specialty clinics',
    'Diagnostic centres',
    'Medical colleges',
    'Medical associations',
    'Healthcare organisations',
  ],
};

export interface JourneyStage {
  id: string;
  label: string;
  title: string;
  text: string;
  touchpoints: string[];
  services: string[];
}

export const patientJourney: JourneyStage[] = [
  {
    id: 'discover',
    label: 'Discover',
    title: 'A patient searches, asks around, or scrolls.',
    text: 'First impressions now happen on a phone. Your profile, website and reviews need to be accurate, professional and easy to find.',
    touchpoints: ['Google Business Profile', 'Website', 'Social media', 'Online reputation'],
    services: ['digital-marketing', 'website-app-development', 'photography-media'],
  },
  {
    id: 'book',
    label: 'Book',
    title: 'They check your credibility — then book.',
    text: 'A clear doctor profile, an easy booking flow and an instant confirmation turn interest into an appointment.',
    touchpoints: ['Doctor profile', 'Online booking', 'WhatsApp confirmation', 'Digital visiting card'],
    services: ['branding-identity', 'website-app-development', 'smart-automation'],
  },
  {
    id: 'arrive',
    label: 'Arrive',
    title: 'First impressions at the door.',
    text: 'Signage, reception and registration set the tone. People should feel welcome and know exactly where to go.',
    touchpoints: ['Exterior signboard', 'Reception wall', 'Wayfinding', 'Digital registration & consent forms'],
    services: ['interior-branding-signage', 'smart-automation', 'branding-identity'],
  },
  {
    id: 'wait',
    label: 'Wait',
    title: 'The waiting room becomes useful.',
    text: 'Token screens reduce anxiety. Awareness content informs. Calm, branded spaces make the wait feel shorter.',
    touchpoints: ['OPD TV content', 'Token & queue displays', 'Awareness videos', 'Waiting-area graphics'],
    services: ['opd-tv-displays', 'patient-education', 'interior-branding-signage'],
  },
  {
    id: 'consult',
    label: 'Consult',
    title: 'Clear, professional materials in the room.',
    text: 'Well-designed prescriptions, illustrations and booklets help patients understand — and remember — what the doctor said.',
    touchpoints: ['Prescription pads', 'Medical illustrations', 'Treatment booklets', 'Clinic software (proposed)'],
    services: ['printing-production', 'patient-education', 'clinic-management-software'],
  },
  {
    id: 'follow-up',
    label: 'Follow up',
    title: 'Care continues after they leave.',
    text: 'Timely reminders, aftercare cards and milestone calendars keep patients on track — without your team making every call.',
    touchpoints: ['Follow-up reminders', 'Vaccination reminders', 'Pregnancy & baby calendars', 'Feedback collection'],
    services: ['smart-automation', 'patient-education', 'printing-production'],
  },
];

export interface StartingPoint {
  id: string;
  title: string;
  text: string;
  services: string[];
  audience: 'business' | 'healthcare';
}

export const startingPoints: StartingPoint[] = [
  {
    id: 'brand-launch',
    title: 'Brand launch',
    text: 'For new ventures that need to look established from day one.',
    services: ['branding-identity', 'creative-design', 'website-app-development', 'printing-production'],
    audience: 'business',
  },
  {
    id: 'always-on',
    title: 'Always-on presence',
    text: 'For teams that want consistent content without hiring in-house.',
    services: ['digital-marketing', 'creative-design', 'photography-media'],
    audience: 'business',
  },
  {
    id: 'clinic-launch',
    title: 'Clinic launch',
    text: 'For doctors opening or upgrading a practice.',
    services: ['branding-identity', 'website-app-development', 'interior-branding-signage', 'printing-production', 'digital-marketing', 'smart-automation'],
    audience: 'healthcare',
  },
  {
    id: 'hospital-experience',
    title: 'Hospital patient experience',
    text: 'For hospitals improving how patients find their way, wait and understand.',
    services: ['opd-tv-displays', 'interior-branding-signage', 'patient-education', 'smart-automation', 'it-technical-solutions'],
    audience: 'healthcare',
  },
  {
    id: 'conference',
    title: 'Conference & events',
    text: 'For associations, colleges and companies running an event end to end.',
    services: ['events-conferences', 'customized-merchandise', 'printing-production', 'photography-media', 'website-app-development'],
    audience: 'business',
  },
];

export const faqs = [
  {
    q: 'Do you only work with healthcare businesses?',
    a: 'No. BFourU works with startups, entrepreneurs, SMEs, marketing teams and established businesses across industries. Healthcare is a specialist vertical where we offer additional, industry-specific services such as OPD display content and patient education.',
  },
  {
    q: 'Can I hire you for just one service?',
    a: 'Yes. Every engagement is scoped to what you actually need — one service or several. Many briefs start small; the advantage of one partner is that it’s easy to add more later without starting from scratch.',
  },
  {
    q: 'How is pricing decided?',
    a: 'Every engagement is quoted to your scope. The services involved, volume, locations, timeline and level of ongoing support all shape the quotation. We explain what is included so you can compare clearly.',
  },
  {
    q: 'What’s the difference between project and subscription work?',
    a: 'Project-based work has a defined scope and end point — a rebrand, a website, an event. Subscription-based work is ongoing — monthly social media, display content, maintenance and reporting. Many clients combine both.',
  },
  {
    q: 'How do you handle healthcare advertising rules and patient consent?',
    a: 'Healthcare communication is built to respect applicable advertising and professional-ethics requirements. Clinical content is approved by the relevant healthcare professionals, and patient images, recordings and data are only used with appropriate consent.',
  },
  {
    q: 'Is the clinic management software available now?',
    a: 'Clinic Management Software is a proposed solution. Availability depends on project scope, implementation and privacy safeguards. Share your requirements and we’ll tell you honestly what is possible.',
  },
  {
    q: 'Is there anything you don’t do?',
    a: 'Yes. We don’t supply medical equipment or medicines, provide staffing or manpower, or offer any clinical or medical treatment services. We focus entirely on creative, digital, technology and business support.',
  },
  {
    q: 'How do we get started?',
    a: 'Send us your brief on WhatsApp, call us, or use the brief builder on our contact page. We’ll start by understanding your requirements, then recommend a customised solution and quotation.',
  },
];
