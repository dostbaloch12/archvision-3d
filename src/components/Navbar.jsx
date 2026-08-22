'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'
import LogoMark from './LogoMark'

const NAV_LINKS = [
  { href: '#studio', label: 'Studio' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }

    return () => document.documentElement.classList.remove('overflow-hidden')
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-3 focus:z-[60] focus:bg-[#44433f] focus:px-4 focus:py-2 focus:text-[#f6f4ef]"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className={`border-b transition-colors duration-500 ease-out ${
          scrolled || open
            ? 'border-[#c8c4bc] bg-[#f6f4ef]/95'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          <a href="#top" aria-label="Utopian Design Studio home">
            <LogoMark className="h-12 w-40 md:h-14 md:w-48" priority sizes="192px" />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative block text-xs uppercase tracking-[0.2em] text-[#77736b] transition-colors duration-500 ease-out hover:text-[#44433f]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#44433f] transition-all duration-500 ease-out group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <AnimatedButton
              href="#contact"
              variant="olive"
              className="!min-h-0 !min-w-0 !px-5 !py-2.5"
            >
              Start a Project
            </AnimatedButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#c8c4bc] text-[#44433f] transition-colors duration-500 hover:border-[#44433f] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-20 z-40 bg-[#f6f4ef] lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 py-12">
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.5 }}
                  >
                    <a
                      href={link.href}
                      onClick={close}
                      className="group flex items-center gap-4 font-serif text-4xl font-light tracking-tight text-[#44433f]"
                    >
                      <span className="h-px w-0 bg-[#44433f] transition-all duration-500 ease-out group-hover:w-8" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <AnimatedButton href="#contact" variant="olive" onClick={close} className="w-full">
                Start a Project
              </AnimatedButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}