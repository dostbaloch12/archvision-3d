import { Cormorant_Garamond, Outfit } from 'next/font/google'
import { siteConfig } from '@/lib/siteconfig'
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

const SITE_URL = siteConfig.url

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Utopian Design Studio — Architecture & Interior Design Lahore',
    template: '%s — Utopian Design Studio',
  },
  description:
    'Utopian Design Studio is a Lahore-based architecture and interior design studio creating thoughtful residential, commercial, hospitality and turnkey projects.',
  keywords: [
    'architecture studio Lahore',
    'interior design Lahore',
    'architect in Lahore',
    'residential architect Pakistan',
    'commercial architecture Pakistan',
    'turnkey construction Lahore',
    '3D architecture visualization Pakistan',
    'Utopian Design Studio',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Utopian Design Studio — Architecture & Interior Design Lahore',
    description:
      'Thoughtful architecture, interiors, planning, development and turnkey execution across residential, commercial and hospitality projects.',
    url: SITE_URL,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utopian Design Studio — Architecture & Interior Design Lahore',
    description:
      'Architecture and interior design studio in Lahore creating functional, refined and timeless spaces.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport = {
  themeColor: '#44433f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArchitecturalService',
  name: siteConfig.name,
  url: SITE_URL,
  description: siteConfig.description,
  areaServed: ['Lahore', 'Pakistan'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7CC, DHA Phase 4',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  serviceType: [
    'Architecture',
    'Planning',
    'Interior Design',
    'Renovation',
    'Development',
    'Turnkey Execution',
  ],
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
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
      <body className="bg-[#44433f] font-sans text-[#44433f] antialiased">
        {children}
      </body>
    </html>
  )
}
