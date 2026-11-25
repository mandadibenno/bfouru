/**
 * Single source of truth for company details.
 * The brief marks contact details as "pending confirmation" — update them here
 * and every page, CTA, WhatsApp link and structured-data block updates with them.
 */
export const site = {
  name: 'BFourU',
  legalName: 'BFourU', // TODO: confirm registered legal entity name
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://www.bfouru.com', // TODO: confirm domain
  tagline: 'One Brand. Multiple Solutions. Complete Support.',
  healthcareTagline: 'You Care for Patients. We Take Care of the Rest.',
  description:
    'BFourU brings branding, design, digital marketing, websites, media, automation, signage, print and events under one roof — one partner for growing businesses, with specialist non-clinical support for doctors, clinics and hospitals.',
  phone: {
    display: '+91 91829 70829',
    href: 'tel:+919182970829',
  },
  whatsapp: {
    display: '+91 91829 70829',
    number: '919182970829',
  },
  email: 'pramod.pramod.949@gmail.com', // TODO: replace with a domain email, e.g. hello@bfouru.com
  /** Optional: set VITE_FORM_ENDPOINT to a form backend (e.g. Formspree, Web3Forms, your API) to enable direct submission. */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || '',
  locale: 'en_IN',
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
