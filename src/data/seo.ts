/**
 * Search-focused titles and descriptions, kept separate from on-page copy.
 * Titles: keyword first, brand last, ≤ 60 characters. Descriptions: ≤ 155 characters, benefit + audience + action.
 */
export const pageSeo = {
  home: {
    title: 'BFourU | Branding, Website & Digital Marketing Agency',
    description:
      'One partner for branding, websites, digital marketing, automation, signage, print and events in India — with ethical, non-clinical support for clinics.',
  },
  services: {
    title: 'Branding, Website, Marketing & Print Services | BFourU',
    description:
      '14 services in one place: branding, design, websites, digital marketing, automation, OPD displays, signage, printing, merchandise and events.',
  },
  healthcare: {
    title: 'Healthcare Marketing & Clinic Branding Agency | BFourU',
    description:
      'Ethical, non-clinical branding, websites, OPD TV content, signage, patient education and reminders for doctors, clinics and hospitals in India.',
  },
  approach: {
    title: 'How We Work: One Brief, One Partner | BFourU',
    description:
      'A six-step process with one point of contact, project or subscription engagements and clear, customised quotations. See how BFourU works.',
  },
  contact: {
    title: 'Contact BFourU | Start a Branding or Website Project',
    description:
      'Build your brief in two minutes and send it on WhatsApp or email — or call +91 91829 70829. Branding, websites, marketing, signage and more.',
  },
  insights: {
    title: 'Insights: Branding, Websites & Healthcare Marketing | BFourU',
    description:
      'Practical guides for business owners, doctors and clinics on branding, websites, Google Business Profile and ethical healthcare communication.',
  },
} as const;

export const serviceSeo: Record<string, { title: string; description: string }> = {
  'branding-identity': {
    title: 'Branding & Logo Design for Businesses and Clinics',
    description:
      'Logo design, brand identity, visiting cards, letterheads, prescription pads and brand guidelines for businesses, doctors, clinics and hospitals.',
  },
  'creative-design': {
    title: 'Graphic Design: Social Media, Brochures & Posters',
    description:
      'Social media creatives, posters, brochures, newsletters, infographics and festival designs — consistent with your brand, delivered by one team.',
  },
  'photography-media': {
    title: 'Corporate & Clinic Photography and Video Production',
    description:
      'Doctor and team profile photography, clinic and office shoots, walkthrough and profile videos, reels, editing, subtitles and voice-over.',
  },
  'digital-marketing': {
    title: 'Digital Marketing & Social Media Management',
    description:
      'Instagram, Facebook and YouTube management, Google Business Profile, SEO and monthly content plans — planned monthly and reported honestly.',
  },
  'website-app-development': {
    title: 'Website Design & App Development for Businesses',
    description:
      'Fast, mobile-first websites and apps with online booking, WhatsApp, domain, hosting and maintenance — for businesses, doctors and clinics.',
  },
  'smart-automation': {
    title: 'WhatsApp Automation & Appointment Reminders',
    description:
      'WhatsApp Business integration, appointment confirmations and reminders, follow-ups, enquiry management and digital forms that save staff time.',
  },
  'clinic-management-software': {
    title: 'Clinic Management Software (Proposed)',
    description:
      'A proposed, customisable system for registration, appointments, OPD tokens, digital prescriptions, billing and reports. Tell us what you need.',
  },
  'opd-tv-displays': {
    title: 'OPD TV Displays & Digital Signage for Hospitals',
    description:
      'OPD token and queue displays, doctor availability screens and doctor-approved health awareness content for clinic and hospital waiting areas.',
  },
  'it-technical-solutions': {
    title: 'IT Support, Email, Backup & Network Setup',
    description:
      'Computer and network setup, professional email, cloud storage, secure backups, remote help and annual maintenance for offices and clinics.',
  },
  'interior-branding-signage': {
    title: 'Clinic & Office Signage and Interior Branding',
    description:
      'Reception walls, exterior signboards, acrylic and LED signage, nameplates, wayfinding and wall graphics for offices, clinics and hospitals.',
  },
  'printing-production': {
    title: 'Printing: Visiting Cards, Brochures & Stationery',
    description:
      'Visiting cards, letterheads, prescription pads, brochures, posters, standees, flex banners, stickers and certificates — printed right, every time.',
  },
  'customized-merchandise': {
    title: 'Custom Corporate Gifts & Branded Merchandise',
    description:
      'Branded notebooks, diaries, pens, bags, bottles, calendars, gift kits, delegate kits, ID cards and lanyards for teams, clients and events.',
  },
  'events-conferences': {
    title: 'Event & Medical Conference Branding',
    description:
      'Branding for conferences, CMEs, seminars, inaugurations and health camps: invitations, stage design, stalls, delegate kits and certificates.',
  },
  'patient-education': {
    title: 'Patient Education Materials & Health Awareness',
    description:
      'Doctor-approved awareness posters, booklets, pregnancy and vaccination calendars, instruction cards and multilingual patient content.',
  },
};
