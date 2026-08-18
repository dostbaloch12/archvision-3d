'use client'

import { useState } from 'react'
import AnimatedButton from './ui/AnimatedButton'

const INDEX = [
  { href: '#about', label: 'Studio' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const DISCIPLINES = [
  'Residential Architecture',
  'Commercial & Civic',
  'Interior Architecture',
  '3D Vision & Massing',
]

const OFFICES = [
  { city: 'Los Angeles', region: 'California, USA' },
  { city: 'Dubai', region: 'DIFC, UAE' },
]

const LEGAL = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MailSmallIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function ArrowUpRightSmall() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

function ArrowUpSmall() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}

function CheckSmall() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-[#4E3A85]"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')
  const year = new Date().getFullYear()

  const onSubscribe = (event) => {
    event.preventDefault()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      setState('error')
      return
    }

    setError('')
    setState('success')
    setEmail('')
  }

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-gradient-to-b from-[#EAAFCB] to-[#F6DCE8]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-8 border-b border-[#1E1230]/20 py-16 md:flex-row md:items-end md:justify-between md:py-20">
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#1E1230] md:text-5xl">
            Have a site,
            <span className="text-[#4E3A85]"> a budget, or only an instinct?</span>
          </h2>
          <AnimatedButton href="#contact" variant="plum" className="shrink-0">
            Start a project
          </AnimatedButton>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <a
              href="#top"
              className="inline-flex items-baseline gap-2"
              aria-label="ArchVision 3D home"
            >
              <span className="font-serif text-2xl font-light tracking-[0.28em] text-[#1E1230]">
                ARCHVISION
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#4E3A85]">3D</span>
            </a>
            <p className="mt-6 max-w-sm text-base text-[#2E1A47]/75">
              An independent architecture atelier. We design buildings as living compositions — then
              place them in your hands as interactive models.
            </p>

            <ul className="mt-8 flex items-center gap-3">
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center border border-[#1E1230]/25 text-[#2E1A47] transition-colors duration-500 ease-out hover:border-[#4E3A85] hover:bg-[#4E3A85] hover:text-white"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center border border-[#1E1230]/25 text-[#2E1A47] transition-colors duration-500 ease-out hover:border-[#4E3A85] hover:bg-[#4E3A85] hover:text-white"
                >
                  <LinkedinIcon />
                </a>
              </li>
              <li>
                <a
                  href="mailto:studio@archvision3d.com"
                  aria-label="Email the studio"
                  className="inline-flex h-10 w-10 items-center justify-center border border-[#1E1230]/25 text-[#2E1A47] transition-colors duration-500 ease-out hover:border-[#4E3A85] hover:bg-[#4E3A85] hover:text-white"
                >
                  <MailSmallIcon />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Index</p>
            <ul className="mt-5 space-y-3">
              {INDEX.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#2E1A47]/75 transition-colors duration-500 ease-out hover:text-[#1E1230]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Disciplines</p>
            <ul className="mt-5 space-y-3">
              {DISCIPLINES.map((discipline) => (
                <li key={discipline}>
                  <a
                    href="#services"
                    className="text-[#2E1A47]/75 transition-colors duration-500 ease-out hover:text-[#1E1230]"
                  >
                    {discipline}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">Studios</p>
            <ul className="mt-5 space-y-4">
              {OFFICES.map((office) => (
                <li key={office.city}>
                  <p className="text-[#1E1230]">{office.city}</p>
                  <p className="text-sm text-[#2E1A47]/70">{office.region}</p>
                </li>
              ))}
            </ul>

            <form onSubmit={onSubscribe} noValidate className="mt-8">
              <label htmlFor="journal" className="text-xs uppercase tracking-[0.2em] text-[#3D2B6B]">
                Journal
              </label>
              {state === 'success' ? (
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#1E1230]">
                  <CheckSmall />
                  Subscribed — thank you.
                </p>
              ) : (
                <>
                  <div className="mt-3 flex border border-[#1E1230]/25 bg-white/50 focus-within:border-[#4E3A85]">
                    <input
                      id="journal"
                      name="journal"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        setError('')
                        setState('idle')
                      }}
                      aria-invalid={state === 'error'}
                      className="h-11 w-full bg-transparent px-3 text-sm text-[#1E1230] placeholder:text-[#2E1A47]/40 focus:outline-none"
                      placeholder="you@studio.com"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe to the journal"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center border-l border-[#1E1230]/25 text-[#3D2B6B] transition-colors duration-500 ease-out hover:bg-[#4E3A85] hover:text-white"
                    >
                      <ArrowUpRightSmall />
                    </button>
                  </div>
                  {error ? (
                    <p className="mt-2 text-xs text-[#2E1A47]" role="alert">
                      {error}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-[#2E1A47]/55">
                      Four letters a year. Nothing else.
                    </p>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1E1230]/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
          <p className="text-xs uppercase tracking-[0.16em] text-[#2E1A47]/70">
            © {year} ArchVision 3D. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-6">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-xs uppercase tracking-[0.16em] text-[#2E1A47]/70 transition-colors duration-500 ease-out hover:text-[#1E1230]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.16em] text-[#2E1A47]/70 transition-colors duration-500 ease-out hover:text-[#1E1230] md:self-auto"
          >
            Back to top
            <ArrowUpSmall />
          </button>
        </div>
      </div>
    </footer>
  )
}