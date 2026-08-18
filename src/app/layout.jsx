import { Cormorant_Garamond, Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://archvision3d.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ArchVision 3D — Architecture Atelier',
    template: '%s — ArchVision 3D',
  },
  description:
    'Luxury architecture atelier crafting cinematic buildings. Explore interactive 3D models, residential and commercial work, and begin a private commission.',
  keywords: [
    'architecture studio',
    '3D architecture',
    'luxury residential architect',
    'interactive building models',
  ],
  authors: [{ name: 'ArchVision 3D' }],
  openGraph: {
    title: 'ArchVision 3D — Architecture Atelier',
    description: 'Design you can walk through. Interactive 3D architecture.',
    url: SITE_URL,
    siteName: 'ArchVision 3D',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ArchVision 3D',
  url: SITE_URL,
  description: 'Luxury architecture atelier crafting cinematic buildings.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'studio@archvision3d.com',
    contactType: 'Customer Service',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#041B13] font-sans text-[#EAF3EC] antialiased">{children}</body>
    </html>
  )
}