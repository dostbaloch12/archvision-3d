'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'

const PROJECTS = [
  {
    id: 'aurelia',
    title: 'Aurelia House',
    location: 'Pacific Palisades, USA',
    year: '2024',
    category: 'Residential',
    area: '1,850 m²',
    status: 'Completed',
    summary:
      'A three-volume house folded around a courtyard, opening entirely to the ocean at dusk.',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=80',
    alt: 'Contemporary white residence with warm interior light glowing at dusk',
    span: 'md:col-span-4 md:row-span-2',
    ratio: 'aspect-[4/5] md:aspect-auto md:h-full',
  },
  {
    id: 'meridian',
    title: 'Meridian Atelier',
    location: 'Dubai, UAE',
    year: '2023',
    category: 'Cultural',
    area: '6,400 m²',
    status: 'Completed',
    summary:
      'A gallery wrapped in a perforated stone screen that filters desert light into the halls.',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80',
    alt: 'Minimal white facade with strong geometric shadow lines',
    span: 'md:col-span-2',
    ratio: 'aspect-[4/5]',
  },
  {
    id: 'northline',
    title: 'Northline',
    location: 'Copenhagen, Denmark',
    year: '2023',
    category: 'Commercial',
    area: '12,000 m²',
    status: 'Completed',
    summary:
      'A headquarters organised around a full-height atrium and a single continuous oak stair.',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80',
    alt: 'Modern glass office building seen from below against a pale sky',
    span: 'md:col-span-2',
    ratio: 'aspect-[4/5]',
  },
  {
    id: 'obscura',
    title: 'Casa Obscura',
    location: 'Valle de Bravo, Mexico',
    year: '2022',
    category: 'Residential',
    area: '980 m²',
    status: 'Completed',
    summary: 'A dark concrete retreat cut into the hillside, lit only by slots aimed at the lake.',
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80',
    alt: 'Architectural model of a low modern house under directional light',
    span: 'md:col-span-2',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'lumina',
    title: 'Pavilion Lumina',
    location: 'Singapore',
    year: '2024',
    category: 'Cultural',
    area: '2,200 m²',
    status: 'In construction',
    summary: 'A civic pavilion of thin columns and deep eaves, designed to disappear into the park.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    alt: 'Warm minimal interior with oak joinery and soft daylight',
    span: 'md:col-span-2',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'kiln',
    title: 'The Kiln Lofts',
    location: 'Brooklyn, USA',
    year: '2021',
    category: 'Adaptive Reuse',
    area: '4,100 m²',
    status: 'Completed',
    summary:
      'A brick works turned into eleven lofts, keeping every scar of the original structure.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    alt: 'Concrete stair detail lit by a narrow slot of daylight',
    span: 'md:col-span-2',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'solaris',
    title: 'Solaris Terraces',
    location: 'Lisbon, Portugal',
    year: '2022',
    category: 'Commercial',
    area: '8,600 m²',
    status: 'Completed',
    summary:
      'Stepped mixed-use terraces that turn a steep site into a sequence of public gardens.',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    alt: 'Stepped modern building facade with planted terraces',
    span: 'md:col-span-3',
    ratio: 'aspect-[16/10]',
  },
  {
    id: 'granary',
    title: 'The Granary',
    location: 'Cotswolds, UK',
    year: '2020',
    category: 'Adaptive Reuse',
    area: '640 m²',
    status: 'Completed',
    summary: 'A stone barn given a glass insert — new and old kept deliberately, visibly apart.',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    alt: 'Minimal stone and glass house at the edge of a green field',
    span: 'md:col-span-3',
    ratio: 'aspect-[16/10]',
  },
]

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Cultural', 'Adaptive Reuse']
const EASE = [0.22, 1, 0.36, 1]

function ExpandIcon() {
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
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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

function LeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function RightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default function ProjectShowcase() {
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  )

  const active = openIndex === null ? null : visible[openIndex]
  const close = useCallback(() => setOpenIndex(null), [])

  const next = useCallback(() => {
    setOpenIndex((prev) => (prev === null ? null : (prev + 1) % visible.length))
  }, [visible.length])

  const prev = useCallback(() => {
    setOpenIndex((prev) => (prev === null ? null : (prev - 1 + visible.length) % visible.length))
  }, [visible.length])

  useEffect(() => {
    if (openIndex === null) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
    }

    document.documentElement.classList.add('overflow-hidden')
    window.addEventListener('keydown', onKey)

    return () => {
      document.documentElement.classList.remove('overflow-hidden')
      window.removeEventListener('keydown', onKey)
    }
  }, [openIndex, close, next, prev])

  const onFilter = (category) => {
    setOpenIndex(null)
    setFilter(category)
  }

  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-gradient-to-b from-[#44433f] to-[#44433f] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#77736b]">Selected Work</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
              Buildings that hold
              <span className="text-[#44433f]"> their silence.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base text-white/75 md:text-lg">
            A short edit from the last decade. Each project was modelled in three dimensions before
            it was ever built.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 border-b border-white/20 pb-6">
          {CATEGORIES.map((category) => {
            const isActive = category === filter
            return (
              <button
                key={category}
                type="button"
                onClick={() => onFilter(category)}
                aria-pressed={isActive}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors duration-500 ease-out ${
                  isActive
                    ? 'border-[#77736b] bg-[#77736b] text-[#44433f]'
                    : 'border-white/25 text-white/70 hover:border-white/60 hover:text-white'
                }`}
              >
                {category}
              </button>
            )
          })}
          <span className="ml-auto text-xs uppercase tracking-[0.2em] text-white/60">
            {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, delay: index * 0.04, ease: EASE }}
                className={`${project.span} group relative overflow-hidden border border-white/20 bg-white/5 transition-colors duration-500 ease-out hover:border-[#77736b]`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={`Open ${project.title} in full screen`}
                  className="block h-full w-full text-left"
                >
                  <div className={`relative ${project.ratio} min-h-[280px]`}>
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#44433f] via-[#44433f]/30 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />

                    <span className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center border border-white/30 text-white opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ExpandIcon />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#77736b]">
                        {project.category} — {project.year}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl font-light tracking-tight text-white md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/70">
                        {project.location} · {project.area}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 flex flex-col items-start gap-6 border-t border-white/20 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-base text-white/75 md:text-lg">
            The full archive, including unbuilt work, is shared during a first meeting.
          </p>
          <AnimatedButton href="#contact" variant="blush">
            Request the archive
          </AnimatedButton>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[70] flex flex-col bg-[#44433f]"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} project detail`}
          >
            <div className="flex items-center justify-between border-b border-white/15 px-6 py-5 md:px-12">
              <p className="text-xs uppercase tracking-[0.2em] text-[#77736b]">
                {String(openIndex + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close project view"
                className="inline-flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors duration-500 ease-out hover:border-[#77736b] hover:text-[#77736b]"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row">
              <div className="relative min-h-[45vh] flex-1 lg:min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.image}
                      alt={active.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <aside className="w-full shrink-0 border-t border-white/15 bg-[#44433f] p-6 md:p-10 lg:w-[420px] lg:border-l lg:border-t-0">
                <p className="text-xs uppercase tracking-[0.2em] text-[#77736b]">
                  {active.category} — {active.status}
                </p>
                <h3 className="mt-4 font-serif text-3xl font-light tracking-tight text-white md:text-4xl">
                  {active.title}
                </h3>
                <p className="mt-5 text-base text-white/70 md:text-lg">{active.summary}</p>

                <dl className="mt-10 space-y-5 border-t border-white/15 pt-8">
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="text-xs uppercase tracking-[0.2em] text-white/50">Location</dt>
                    <dd className="text-right text-white">{active.location}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="text-xs uppercase tracking-[0.2em] text-white/50">Year</dt>
                    <dd className="text-right text-white">{active.year}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="text-xs uppercase tracking-[0.2em] text-white/50">Area</dt>
                    <dd className="text-right text-white">{active.area}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="text-xs uppercase tracking-[0.2em] text-white/50">Status</dt>
                    <dd className="text-right text-white">{active.status}</dd>
                  </div>
                </dl>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous project"
                    className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors duration-500 ease-out hover:border-[#77736b] hover:text-[#77736b]"
                  >
                    <LeftIcon />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next project"
                    className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors duration-500 ease-out hover:border-[#77736b] hover:text-[#77736b]"
                  >
                    <RightIcon />
                  </button>

                  <AnimatedButton
                    href="#contact"
                    variant="blush"
                    onClick={close}
                    className="ml-auto !min-h-0 !min-w-0 !px-5 !py-2.5"
                  >
                    Enquire
                  </AnimatedButton>
                </div>

                <p className="mt-6 hidden text-xs uppercase tracking-[0.16em] text-white/40 lg:block">
                  Use ← → to browse · Esc to close
                </p>
              </aside>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
