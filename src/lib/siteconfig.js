export const siteConfig = {
  name: 'ArchVision 3D',
  tagline: 'Architecture Atelier',
  description:
    'Luxury architecture atelier crafting cinematic buildings with interactive 3D models.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://archvision3d.com',

  contact: {
    email: 'studio@archvision3d.com',
    phone: '+1 310 555 0190',
    phoneHref: 'tel:+13105550190',
    hours: 'Monday — Friday, 09:00 — 18:00',
    hoursNote: 'Visits by appointment only',
  },

  offices: [
    {
      city: 'Los Angeles',
      line: '420 Santa Monica Boulevard, Suite 12',
      region: 'California, USA',
    },
    {
      city: 'Dubai',
      line: 'Gate Avenue, DIFC',
      region: 'United Arab Emirates',
    },
  ],

  social: {
    instagram: 'https://www.instagram.com/archvision3d',
    linkedin: 'https://www.linkedin.com/company/archvision3d',
  },
}