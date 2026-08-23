import { DM_Sans, Manrope } from 'next/font/google'
import { siteConfig } from '@/lib/siteconfig'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

const SITE_URL = siteConfig.url

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Utopian Design Studio — Architecture & Design Lahore',
    template: '%s — Utopian Design Studio',
  },
  description:
    'Utopian Design Studio is a Lahore-based architecture and interior design studio creating residential, commercial, hospitality, institutional and mixed-use projects.',
  keywords: [
    'architecture studio Lahore',
    'interior design Lahore',
    'architect in Lahore',
    'residential architecture Pakistan',
    'commercial architecture Lahore',
    'turnkey execution Lahore',
    'Utopian Design Studio',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Utopian Design Studio — Architecture & Design Lahore',
    description:
      'Architecture, interiors, planning, renovation, development and turnkey execution in Lahore, Pakistan.',
    url: SITE_URL,
    siteName: 'Utopian Design Studio',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: '#f4f2ed',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArchitecturalService',
  name: 'Utopian Design Studio',
  url: SITE_URL,
  description:
    'Architecture and interior design studio in Lahore creating functional, refined and timeless spaces.',
  areaServed: ['Lahore', 'Pakistan'],
  telephone: '+92 301 3918872',
  email: 'utopiandesignstuido7@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7CC, DHA Phase 4',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}