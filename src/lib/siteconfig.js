function normalizeUrl(value) {
  const fallback = 'https://archvision-3d-ten.vercel.app'
  const raw = value || fallback

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw.replace(/\/$/, '')
  }

  return `https://${raw}`.replace(/\/$/, '')
}

export const siteConfig = {
  name: 'Utopian Design Studio',
  shortName: 'Utopian',
  tagline: 'Architecture & Design Studio',
  location: 'Lahore, Pakistan',
  description:
    'Utopian Design Studio creates thoughtful architecture across residential, commercial, and hospitality projects—rooted in context, purpose, and detail.',
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL),

  contact: {
    email: 'utopiandesignstuido7@gmail.com',
    phone: '+92 301 3918872',
    phoneHref: 'tel:+923013918872',
    hours: 'Monday — Saturday, 10:00 — 18:00',
    hoursNote: 'Visits by appointment only',
  },

  offices: [
    {
      city: 'Lahore',
      line: '7CC, DHA Phase 4',
      region: 'Lahore, Pakistan',
    },
  ],

  social: {
    instagram: 'https://www.instagram.com',
    linkedin: 'https://www.linkedin.com',
  },
}