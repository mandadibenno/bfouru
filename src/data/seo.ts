/**
 * Search-focused titles and descriptions, kept separate from on-page copy.
 * Titles: keyword first, brand last, ≤ 60 characters. Descriptions: ≤ 155 characters, benefit + audience + action.
 */
export const pageSeo = {
  home: {
    title: "Digital Marketing & Branding Agency in Hyderabad | BFourU",
    description:
      "BFourU offers digital marketing, branding, website development and healthcare marketing services for businesses, doctors and hospitals in Hyderabad.",
  },

  services: {
    title: "Branding, Website, Marketing & Print Services | BFourU",
    description:
      "14 services in one place: branding, design, websites, digital marketing, automation, OPD displays, signage, printing, merchandise and events.",
  },
  healthcare: {
    title: "Healthcare Marketing & Clinic Branding Agency | BFourU",
    description:
      "Ethical, non-clinical branding, websites, OPD TV content, signage, patient education and reminders for doctors, clinics and hospitals in India.",
  },
  approach: {
    title: "How We Work: One Brief, One Partner | BFourU",
    description:
      "A six-step process with one point of contact, project or subscription engagements and clear, customised quotations. See how BFourU works.",
  },
  contact: {
    title: "Contact BFourU | Start a Branding or Website Project",
    description:
      "Build your brief in two minutes and send it on WhatsApp or email — or call +91 91829 70829. Branding, websites, marketing, signage and more.",
  },
  insights: {
    title: "Insights: Branding, Websites & Healthcare Marketing | BFourU",
    description:
      "Practical guides for business owners, doctors and clinics on branding, websites, Google Business Profile and ethical healthcare communication.",
  },
} as const;

export const serviceSeo: Record<
  string,
  { title: string; description: string }
> = {
  "branding-identity": {
    title: "Branding & Logo Design Agency in Hyderabad",
    description:
      "Professional logo design, brand identity, brand guidelines, business cards and stationery design for businesses and clinics in Hyderabad.",
  },
  "creative-design": {
    title: "Graphic Design Services in Hyderabad",
    description:
      "Creative graphic design services in Hyderabad for social media, brochures, posters, newsletters, infographics and business promotions.",
  },
  "photography-media": {
    title: "Corporate Photography & Videography in Hyderabad",
    description:
      "Professional corporate photography, doctor profile shoots, clinic photography, promotional videos and reels for businesses in Hyderabad.",
  },
  "digital-marketing": {
    title: "Digital Marketing & SEO Services in Hyderabad",
    description:
      "Grow your business with SEO, social media marketing, Google Business Profile management and digital marketing services in Hyderabad.",
  },
  "website-app-development": {
    title: "Website & App Development Company in Hyderabad",
    description:
      "Custom website design, responsive web development and mobile app development for businesses, startups, doctors and clinics in Hyderabad.",
  },
  "smart-automation": {
    title: "Business & WhatsApp Automation Services in Hyderabad",
    description:
      "Simplify business operations with WhatsApp automation, appointment reminders, enquiry management and automated follow-ups in Hyderabad.",
  },
  "clinic-management-software": {
    title: "Clinic Management Software Solutions in Hyderabad",
    description:
      "Explore proposed clinic management software for patient registration, appointments, OPD tokens, digital prescriptions and billing.",
  },
  "opd-tv-displays": {
    title: "OPD TV Displays & Hospital Digital Signage Solutions",
    description:
      "OPD token displays, patient queue screens, doctor availability displays and doctor-approved health awareness content for clinics and hospitals.",
  },
  "it-technical-solutions": {
    title: "Business IT Support & Technical Services in Hyderabad",
    description:
      "IT support, computer and network setup, professional email, cloud storage, secure backups and remote assistance for businesses in Hyderabad.",
  },
  "interior-branding-signage": {
    title: "Interior Branding & Signage Services in Hyderabad",
    description:
      "Transform business and healthcare spaces with interior branding, acrylic signage, LED signboards, reception branding and wayfinding solutions.",
  },
  "printing-production": {
    title: "Commercial Printing Services in Hyderabad",
    description:
      "Business printing services in Hyderabad for visiting cards, brochures, prescription pads, posters, banners, standees and branded stationery.",
  },
  "customized-merchandise": {
    title: "Custom Corporate Gifts & Branded Merchandise",
    description:
      "Branded notebooks, diaries, pens, bags, bottles, calendars, gift kits, delegate kits, ID cards and lanyards for teams, clients and events.",
  },
  "events-conferences": {
    title: "Event & Medical Conference Branding",
    description:
      "Branding for conferences, CMEs, seminars, inaugurations and health camps: invitations, stage design, stalls, delegate kits and certificates.",
  },
  "patient-education": {
    title: "Patient Education Materials & Health Awareness",
    description:
      "Doctor-approved awareness posters, booklets, pregnancy and vaccination calendars, instruction cards and multilingual patient content.",
  },
};
