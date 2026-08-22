'use client'

import { useState } from 'react'
import Link from 'next/link'
import { subscribeJournal } from '@/app/actions'
import AnimatedButton from './ui/AnimatedButton'
import LogoMark from './LogoMark'

const INDEX = [
  { href: '/#studio', label: 'Studio' },
  { href: '/#services', label: 'Services' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#process', label: 'Process' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

const DISCIPLINES = [
  'Architecture',
  'Planning',
  'Interior Design',
  'Renovation',
  'Development',
  'Turnkey Execution',
]

const LEGAL = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

function ArrowUpRightSmall() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

function ArrowUpSmall() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}

function SpinnerSmall() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

function CheckSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#44433f]">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')
  const year = new Date().getFullYear()

  const onSubscribe = async (event) => {
    event.preventDefault()
    setError('')

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      setState('error')
      return
    }

    setState('loading')

    const fd = new FormData()
    fd.append('email', email)

    try {
      const result = await subscribeJournal(fd)

      if (result && result.success) {
        setState('success')
        setEmail('')
      } else {
        setState('error')
        setError((result && result.error) || 'Could not subscribe. Try again.')
      }
    } catch (err) {
      setState('error')
      setError('Network error. Please try again.')
    }
  }

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-[#f6f4ef] text-[#44433f]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-8 border-b border-[#c8c4bc] py-16 md:flex-row md:items-end md:justify-between md:py-20">
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#44433f] md:text-5xl">
            Have a site,
            <span className="text-[#77736b]"> a budget, or only an instinct?</span>
          </h2>
          <AnimatedButton href="/#contact" variant="olive" className="shrink-0">
            Start a project
          </AnimatedButton>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <Link href="/" aria-label="Utopian Design Studio home">
              <LogoMark className="h-16 w-52" sizes="208px" />
            </Link>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-[#77736b]">
              We design buildings and interiors as meaningful, functional spaces — from first
              concept to final execution.
            </p>

            <div className="mt-8 space-y-2 text-sm text-[#77736b]">
              <a
                href="mailto:utopiandesignstuido7@gmail.com"
                className="block transition-colors duration-500 hover:text-[#44433f]"
              >
                utopiandesignstuido7@gmail.com
              </a>
              <a
                href="tel:+923013918872"
                className="block transition-colors duration-500 hover:text-[#44433f]"
              >
                +92 301 3918872
              </a>
              <p>7CC, DHA Phase 4 · Lahore</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#44433f]">Index</p>
            <ul className="mt-5 space-y-3">
              {INDEX.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#77736b] transition-colors duration-500 ease-out hover:text-[#44433f]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#44433f]">Services</p>
            <ul className="mt-5 space-y-3">
              {DISCIPLINES.map((discipline) => (
                <li key={discipline}>
                  <Link
                    href="/#services"
                    className="text-[#77736b] transition-colors duration-500 ease-out hover:text-[#44433f]"
                  >
                    {discipline}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#44433f]">Journal</p>
            <p className="mt-5 text-sm text-[#77736b]">
              Occasional notes on design, materials and project thinking.
            </p>

            <form onSubmit={onSubscribe} noValidate className="mt-6">
              {state === 'success' ? (
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#44433f]">
                  <CheckSmall />
                  Subscribed — thank you.
                </p>
              ) : (
                <>
                  <div className="flex border border-[#c8c4bc] bg-[#fbfaf7] focus-within:border-[#44433f]">
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
                      className="h-11 w-full bg-transparent px-3 text-sm text-[#44433f] placeholder:text-[#77736b] focus:outline-none"
                      placeholder="you@email.com"
                    />
                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      aria-label="Subscribe to the journal"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center border-l border-[#c8c4bc] text-[#44433f] transition-colors duration-500 ease-out hover:bg-[#44433f] hover:text-[#f6f4ef] disabled:cursor-wait"
                    >
                      {state === 'loading' ? <SpinnerSmall /> : <ArrowUpRightSmall />}
                    </button>
                  </div>

                  {error ? (
                    <p className="mt-2 text-xs text-[#44433f]" role="alert">
                      {error}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-[#77736b]">
                      Four letters a year. Nothing else.
                    </p>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-[#c8c4bc]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
          <p className="text-xs uppercase tracking-[0.16em] text-[#77736b]">
            © {year} Utopian Design Studio. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-6">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs uppercase tracking-[0.16em] text-[#77736b] transition-colors duration-500 ease-out hover:text-[#44433f]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.16em] text-[#77736b] transition-colors duration-500 ease-out hover:text-[#44433f] md:self-auto"
          >
            Back to top
            <ArrowUpSmall />
          </button>
        </div>
      </div>
    </footer>
  )
}