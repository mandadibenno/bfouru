import type { GlyphCell } from '../components/Glyph';

export type ClusterId = 'brand' | 'digital' | 'technology' | 'spaces' | 'events';

export interface Cluster {
  id: ClusterId;
  number: string;
  name: string;
  short: string;
  promise: string;
  question: string;
}

export type MockType =
  | 'identity'
  | 'social'
  | 'camera'
  | 'report'
  | 'browser'
  | 'whatsapp'
  | 'dashboard'
  | 'opd'
  | 'status'
  | 'wayfinding'
  | 'print'
  | 'merch'
  | 'badge'
  | 'calendar';

export interface Service {
  slug: string;
  name: string;
  short: string;
  cluster: ClusterId;
  tagline: string;
  intro: string;
  deliverables: string[];
  outcome: string;
  audiences: string[];
  note?: string;
  proposed?: boolean;
  /** 'healthcare' = specialist healthcare service; 'all' = for any business (incl. healthcare) */
  audience: 'all' | 'healthcare';
  related: string[];
  glyph: { cells: [GlyphCell, GlyphCell, GlyphCell, GlyphCell]; accent: 0 | 1 | 2 | 3 };
  mock: MockType;
}

export const clusters: Cluster[] = [
  {
    id: 'brand',
    number: '01',
    name: 'Brand & Creative',
    short: 'Brand',
    promise: 'How you look, sound and show up — designed as one consistent identity.',
    question: 'How do we look and sound?',
  },
  {
    id: 'digital',
    number: '02',
    name: 'Digital & Web',
    short: 'Digital',
    promise: 'Websites, apps and a steady online presence that make you easy to find and trust.',
    question: 'How do people find us online?',
  },
  {
    id: 'technology',
    number: '03',
    name: 'Technology & Automation',
    short: 'Technology',
    promise: 'Systems, screens and automations that take repetitive work off your team.',
    question: 'How do our operations run?',
  },
  {
    id: 'spaces',
    number: '04',
    name: 'Spaces & Print',
    short: 'Spaces',
    promise: 'Signage, interiors, print and merchandise that carry your brand into the real world.',
    question: 'How do we show up physically?',
  },
  {
    id: 'events',
    number: '05',
    name: 'Events & Education',
    short: 'Events',
    promise: 'Conferences, campaigns and patient communication that land at the moments that matter.',
    question: 'How do we communicate at key moments?',
  },
];

export const services: Service[] = [
  {
    slug: 'branding-identity',
    name: 'Branding & Identity',
    short: 'Branding',
    cluster: 'brand',
    tagline: 'An identity people recognise — on a screen, a signboard or a prescription pad.',
    intro:
      'We build distinctive identities for businesses, professionals, clinics and hospitals — and the rules that keep them consistent wherever they appear. From a first logo to a complete rebrand, every touchpoint speaks the same language.',
    deliverables: [
      'Logo design and development',
      'Complete brand identity',
      'Brand colour and typography guidelines',
      'Professional and doctor profile design',
      'Corporate identity',
      'Visiting cards and letterheads',
      'Prescription pad designs',
      'Staff ID card designs',
      'Business, clinic and hospital rebranding',
      'Brand guideline documentation',
    ],
    outcome: 'A recognisable identity across every digital and physical touchpoint.',
    audiences: ['Startups & new ventures', 'SMEs planning a refresh', 'Doctors starting a practice', 'Clinics & hospitals rebranding'],
    audience: 'all',
    related: ['creative-design', 'interior-branding-signage', 'printing-production'],
    glyph: { cells: ['tl', 'ci', 'sq', 'br'], accent: 1 },
    mock: 'identity',
  },
  {
    slug: 'creative-design',
    name: 'Creative Design',
    short: 'Creative design',
    cluster: 'brand',
    tagline: 'Visual communication that is consistent, considered — and actually says something.',
    intro:
      'Everyday design for every channel — social posts, campaigns, posters, presentations and print — produced to your brand system, so everything looks like it came from the same place. Because it did.',
    deliverables: [
      'Social media creative designs',
      'Promotional and awareness posters',
      'Festival and special occasion creatives',
      'Illustrations and infographics, including medical illustrations',
      'Patient education materials',
      'Presentation designs',
      'Brochures and newsletters',
      'Pregnancy and baby milestone calendars',
      'Custom campaign creatives',
      '2D and 3D visual designs',
    ],
    outcome: 'Consistent, professional and meaningful visual communication.',
    audiences: ['Marketing teams needing reliable output', 'Businesses with seasonal campaigns', 'Clinics communicating with patients'],
    audience: 'all',
    related: ['branding-identity', 'digital-marketing', 'printing-production'],
    glyph: { cells: ['ci', 'tr', 'bl', 'sq'], accent: 0 },
    mock: 'social',
  },
  {
    slug: 'photography-media',
    name: 'Photography & Media Production',
    short: 'Photo & media',
    cluster: 'brand',
    tagline: 'Photographs, films and motion that tell your story properly.',
    intro:
      'From professional portraits and facility photography to walkthrough films, podcasts and medical animation — we plan, shoot, edit and deliver content ready for your website, social channels and screens.',
    deliverables: [
      'Doctor profile photography',
      'Clinic and hospital photography',
      'Professional corporate photography',
      'Hospital walkthrough videos',
      'Doctor educational videos',
      'Healthcare awareness reels',
      'Interview and podcast production',
      'Corporate profile videos',
      'Medical animations',
      'Video editing and motion graphics',
      'Voice-over and subtitles',
      'Medical event photography',
    ],
    outcome: 'Professional content for digital and physical media.',
    audiences: ['Doctors & specialists', 'Hospitals and clinics', 'Corporate teams', 'Event organisers'],
    note: 'Patient images and recordings are only captured and used with appropriate consent.',
    audience: 'all',
    related: ['digital-marketing', 'opd-tv-displays', 'events-conferences'],
    glyph: { cells: ['ring', 'sq', 'sq', 'ci'], accent: 0 },
    mock: 'camera',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    short: 'Digital marketing',
    cluster: 'digital',
    tagline: 'A steady, responsible online presence — planned monthly, reported honestly.',
    intro:
      'We run your social channels, Google Business Profile, search visibility, YouTube and online reputation with a monthly plan and a clear report. For healthcare, every campaign is built to respect advertising and professional-ethics requirements.',
    deliverables: [
      'Social media account management',
      'Monthly content planning',
      'Awareness campaigns',
      'Instagram and Facebook management',
      'Google Business Profile management',
      'Search engine optimisation (SEO)',
      'YouTube channel management',
      'Online reputation management',
      'Digital communication strategies',
      'Monthly performance reports',
      'Compliant digital campaign management',
    ],
    outcome: 'A stronger, more consistent online presence.',
    audiences: ['Businesses without time to manage channels', 'Clinics and hospitals', 'Brands launching campaigns'],
    note: 'Healthcare marketing is subject to applicable advertising and professional-ethics requirements. We don’t buy followers or reviews, and we don’t promise guaranteed outcomes.',
    audience: 'all',
    related: ['creative-design', 'website-app-development', 'photography-media'],
    glyph: { cells: ['sq', 'tr', 'dot', 'ci'], accent: 3 },
    mock: 'report',
  },
  {
    slug: 'website-app-development',
    name: 'Website & App Development',
    short: 'Websites & apps',
    cluster: 'digital',
    tagline: 'Fast, accessible websites and apps that make it easy to find you, trust you and book you.',
    intro:
      'Professional websites for businesses, doctors, clinics and hospitals — mobile-first, easy to update and connected to what matters: appointment booking, WhatsApp, maps and enquiries. We also build custom web and mobile applications, and look after domains, hosting and email.',
    deliverables: [
      'Professional websites, including doctor, clinic and hospital websites',
      'Mobile-responsive web development',
      'Online appointment booking systems',
      'Digital visiting cards',
      'QR code-based solutions',
      'Custom web applications',
      'Mobile application development',
      'Domain and hosting management',
      'Professional email solutions',
      'Website maintenance and support',
    ],
    outcome: 'Accessible digital experiences and easier access to information.',
    audiences: ['Doctors & clinics', 'Startups', 'SMEs replacing an outdated site', 'Teams needing a custom tool'],
    audience: 'all',
    related: ['digital-marketing', 'smart-automation', 'it-technical-solutions'],
    glyph: { cells: ['ph', 'dot', 'sq', 'sq'], accent: 1 },
    mock: 'browser',
  },
  {
    slug: 'smart-automation',
    name: 'Smart Automation',
    short: 'Automation',
    cluster: 'technology',
    tagline: 'Let the reminders, confirmations and follow-ups run themselves.',
    intro:
      'We automate the repetitive, non-clinical communication that eats into your team’s day — WhatsApp confirmations and reminders, enquiry handling, feedback, digital forms and daily reports — so people can focus on people.',
    deliverables: [
      'WhatsApp Business integration',
      'Automated appointment confirmations',
      'Appointment reminders',
      'Patient follow-up reminders',
      'Vaccination reminders',
      'Clinic information chatbots',
      'Digital enquiry management',
      'Patient feedback collection',
      'Digital registration and consent forms',
      'Automated payment notifications',
      'Daily operational reports',
      'Customised workflow automation',
    ],
    outcome: 'Less manual work and more efficient communication.',
    audiences: ['Busy clinics & diagnostic centres', 'Hospitals', 'Service businesses handling many enquiries'],
    note: 'Built around patient consent and secure data handling. Our chatbots share clinic information and reminders only — they never provide medical advice or diagnoses.',
    audience: 'all',
    related: ['clinic-management-software', 'website-app-development', 'it-technical-solutions'],
    glyph: { cells: ['ci', 'em', 'ring', 'ci'], accent: 0 },
    mock: 'whatsapp',
  },
  {
    slug: 'clinic-management-software',
    name: 'Clinic Management Software',
    short: 'Clinic software',
    cluster: 'technology',
    tagline: 'Appointments, prescriptions, billing and reports — in one place, shaped around your clinic.',
    intro:
      'A proposed, customisable system for everyday clinic administration: registration, scheduling, OPD tokens, digital prescriptions, billing, records, follow-ups and reporting — for single-doctor clinics through to multi-branch practices.',
    deliverables: [
      'Patient registration',
      'Appointment scheduling',
      'Digital prescription management',
      'OPD token management',
      'Billing and invoicing',
      'Patient record management',
      'Follow-up management',
      'Clinic expense tracking',
      'Staff attendance management',
      'Daily and monthly reports',
      'Multi-doctor management',
      'Multi-branch management',
      'Role-based access control',
    ],
    outcome: 'Streamlined clinic operations through one centralised system.',
    audiences: ['Single-doctor clinics', 'Multi-doctor practices', 'Multi-branch clinics'],
    note: 'This is a proposed solution. Availability depends on project scope, implementation and privacy safeguards — tell us what your clinic needs and we’ll be clear about what’s possible.',
    proposed: true,
    audience: 'healthcare',
    related: ['smart-automation', 'opd-tv-displays', 'it-technical-solutions'],
    glyph: { cells: ['sq', 'ph', 'ph', 'sq'], accent: 3 },
    mock: 'dashboard',
  },
  {
    slug: 'opd-tv-displays',
    name: 'OPD TV & Digital Display Solutions',
    short: 'OPD TV & displays',
    cluster: 'technology',
    tagline: 'Turn waiting-room screens into calm, useful, on-brand communication.',
    intro:
      'We design and schedule content for the displays you already have — doctor availability, token and queue screens, awareness videos, reception information, wayfinding and announcements — managed centrally across departments and locations.',
    deliverables: [
      'OPD TV display designs',
      'Doctor availability displays',
      'Digital token and queue displays',
      'Patient awareness content',
      'Health education videos',
      'Reception information screens',
      'Department-wise digital displays',
      'Hospital announcement screens',
      'Digital wayfinding solutions',
      'Scheduled content updates',
      'Centralised multi-location display management',
    ],
    outcome: 'More informative waiting areas and clearer on-site communication.',
    audiences: ['Hospitals', 'Multi-specialty clinics', 'Diagnostic centres'],
    note: 'We create and manage content for your existing display systems.',
    audience: 'healthcare',
    related: ['patient-education', 'interior-branding-signage', 'it-technical-solutions'],
    glyph: { cells: ['sq', 'sq', 'ph', 'dot'], accent: 3 },
    mock: 'opd',
  },
  {
    slug: 'it-technical-solutions',
    name: 'IT & Technical Solutions',
    short: 'IT support',
    cluster: 'technology',
    tagline: 'Reliable systems, backed up and looked after — so the technology just works.',
    intro:
      'Practical support for the digital infrastructure behind your business: computers and software, networks and Wi-Fi, email, cloud storage, backups, security, display hardware and ongoing maintenance — on-site or remote, as agreed.',
    deliverables: [
      'Computer and software configuration',
      'Network and Wi-Fi setup support',
      'Professional email management',
      'Cloud storage solutions',
      'Secure data backup solutions',
      'Website technical maintenance',
      'Software updates and maintenance',
      'Digital display technical support',
      'Cybersecurity support',
      'Remote technical assistance',
      'Annual maintenance services',
    ],
    outcome: 'Reliable digital operations with ongoing technical support.',
    audiences: ['Clinics & hospitals', 'Small offices', 'Growing teams without in-house IT'],
    note: 'Scope and availability are confirmed for each engagement.',
    audience: 'all',
    related: ['website-app-development', 'smart-automation', 'opd-tv-displays'],
    glyph: { cells: ['ring', 'ring', 'ring', 'ci'], accent: 3 },
    mock: 'status',
  },
  {
    slug: 'interior-branding-signage',
    name: 'Interior Branding & Signage',
    short: 'Signage & interiors',
    cluster: 'spaces',
    tagline: 'Spaces that look like your brand — and are easy to find your way around.',
    intro:
      'Environmental branding for clinics, hospitals and offices — reception walls, exterior and LED signage, nameplates, department boards, wayfinding, glass graphics and waiting-area walls — designed to welcome people and guide them.',
    deliverables: [
      'Clinic and hospital interior branding',
      'Reception wall branding',
      'Exterior signboards',
      'Acrylic and LED signage',
      'Doctor nameplates',
      'Department identification boards',
      'Hospital directional signage',
      'Wall graphics and illustrations',
      'Glass branding and vinyl graphics',
      'Patient waiting area graphics',
      'Floor and navigation graphics',
      'Health awareness wall displays',
    ],
    outcome: 'A professional, welcoming and easier-to-navigate physical space.',
    audiences: ['New clinics & hospitals', 'Facilities being renovated', 'Offices and showrooms'],
    audience: 'all',
    related: ['branding-identity', 'opd-tv-displays', 'printing-production'],
    glyph: { cells: ['tr', 'sq', 'sq', 'bl'], accent: 0 },
    mock: 'wayfinding',
  },
  {
    slug: 'printing-production',
    name: 'Printing & Production',
    short: 'Printing',
    cluster: 'spaces',
    tagline: 'From file to finished piece — printed right, every time.',
    intro:
      'Design-to-production support for everything printed: stationery, prescription pads, patient files, brochures, booklets, calendars, posters, standees, labels, certificates and bulk runs — with colour and quality that match your brand.',
    deliverables: [
      'Visiting cards and letterheads',
      'Prescription pads',
      'Patient file folders',
      'Brochures and pamphlets',
      'Patient education booklets',
      'Pregnancy and vaccination calendars',
      'Posters and wall charts',
      'Standees and flex banners',
      'Stickers and labels',
      'Certificates',
      'Customised stationery',
      'Bulk printing and production',
    ],
    outcome: 'Consistent brand presentation across every printed piece.',
    audiences: ['Clinics & hospitals', 'Businesses needing stationery', 'Event organisers'],
    audience: 'all',
    related: ['branding-identity', 'creative-design', 'customized-merchandise'],
    glyph: { cells: ['sq', 'sq', 'sq', 'tl'], accent: 3 },
    mock: 'print',
  },
  {
    slug: 'customized-merchandise',
    name: 'Customised Merchandise',
    short: 'Merchandise',
    cluster: 'spaces',
    tagline: 'Branded things people actually keep.',
    intro:
      'Notebooks, pens, bags, bottles, lanyards, calendars, folders, gift kits and delegate kits — designed to your brand and produced for teams, clients and events.',
    deliverables: [
      'Customised notebooks and diaries',
      'Branded pens',
      'Corporate gift kits',
      'Customised bags',
      'Branded water bottles',
      'ID cards and lanyards',
      'Customised calendars',
      'Conference delegate kits',
      'Branded folders',
      'Corporate promotional materials',
      'Customised packaging',
    ],
    outcome: 'Consistent brand experiences through customised products.',
    audiences: ['Corporate teams', 'Conference organisers', 'Brands launching products'],
    audience: 'all',
    related: ['events-conferences', 'printing-production', 'branding-identity'],
    glyph: { cells: ['br', 'bl', 'tr', 'tl'], accent: 2 },
    mock: 'merch',
  },
  {
    slug: 'events-conferences',
    name: 'Events & Conferences',
    short: 'Events',
    cluster: 'events',
    tagline: 'One consistent event brand — from the first invitation to the last certificate.',
    intro:
      'Creative, digital and production support for conferences, CMEs, seminars, health camps, inaugurations and exhibitions: identity, invitations, registration websites, stage and stall design, delegate kits, ID cards, photography and digital certificates.',
    deliverables: [
      'Medical conference branding',
      'CME event creative support',
      'Healthcare seminar branding',
      'Health camp communication materials',
      'Hospital inauguration branding',
      'Event invitations',
      'Stage and backdrop designs',
      'Exhibition stall branding',
      'Registration websites',
      'Event ID cards and delegate kits',
      'Medical presentation designs',
      'Event photography and videography',
      'Digital certificates',
    ],
    outcome: 'Consistent event branding and communication, from planning to delivery.',
    audiences: ['Medical associations', 'Hospitals & colleges', 'Corporate event teams'],
    audience: 'all',
    related: ['customized-merchandise', 'photography-media', 'printing-production'],
    glyph: { cells: ['pv', 'ci', 'pv', 'pv'], accent: 1 },
    mock: 'badge',
  },
  {
    slug: 'patient-education',
    name: 'Patient Education Solutions',
    short: 'Patient education',
    cluster: 'events',
    tagline: 'Clear, visual health information — always approved by the doctor.',
    intro:
      'We turn doctor-approved medical information into materials patients genuinely understand: awareness leaflets, pregnancy and baby calendars, vaccination charts, nutrition guides, treatment booklets, aftercare cards, illustrations, animations and multilingual content.',
    deliverables: [
      'Disease awareness materials',
      'Pregnancy care educational content',
      'Baby development calendars',
      'Vaccination awareness materials',
      'Nutrition education charts',
      'Treatment information booklets',
      'Post-treatment instruction cards',
      'Medical illustrations',
      'Educational animations',
      'Multilingual patient communication',
      'Digital patient education presentations',
    ],
    outcome: 'Better patient understanding through meaningful visual communication.',
    audiences: ['Doctors & specialists', 'Maternity & paediatric clinics', 'Hospitals'],
    note: 'All clinical content is reviewed and approved by the relevant healthcare professionals. We design and communicate; doctors decide what is medically right.',
    audience: 'healthcare',
    related: ['creative-design', 'opd-tv-displays', 'printing-production'],
    glyph: { cells: ['dot', 'ring', 'sq', 'tl'], accent: 1 },
    mock: 'calendar',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const clusterById = (id: ClusterId) => clusters.find((c) => c.id === id)!;
export const servicesInCluster = (id: ClusterId) => services.filter((s) => s.cluster === id);
export const totalDeliverables = services.reduce((n, s) => n + s.deliverables.length, 0);
