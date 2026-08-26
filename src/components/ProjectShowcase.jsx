'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

const PROJECTS = [
  {
    title: 'Private Residence',
    category: 'Residential',
    location: 'Lahore',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=90',
    description:
      'A refined residential project shaped around privacy, natural light and daily family life.',
  },
  {
    title: 'Contemporary House',
    category: 'Residential',
    location: 'Pakistan',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90',
    description:
      'A contemporary home concept balancing clean geometry, material restraint and functional planning.',
  },
  {
    title: 'Urban Residence',
    category: 'Residential',
    location: 'Lahore',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90',
    description:
      'A compact urban residence focused on efficient space planning and a calm architectural expression.',
  },
  {
    title: 'Hospitality Concept',
    category: 'Hospitality',
    location: 'Pakistan',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1500&q=90',
    description:
      'A hospitality concept designed around arrival sequence, atmosphere and memorable guest experience.',
  },
  {
    title: 'Commercial Workplace',
    category: 'Commercial',
    location: 'Lahore',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90',
    description:
      'A workplace design proposal focused on collaboration, workflow and a polished commercial identity.',
  },
  {
    title: 'Office Environment',
    category: 'Commercial',
    location: 'Pakistan',
    year: '2022',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90',
    description:
      'An office interior environment with coordinated lighting, material direction and efficient planning.',
  },
  {
    title: 'Institutional Building',
    category: 'Institutional',
    location: 'Pakistan',
    year: '2022',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=90',
    description:
      'An institutional architecture study shaped around clarity, circulation and long-term usability.',
  },
  {
    title: 'Mixed-Use Development',
    category: 'Mixed-Use',
    location: 'Pakistan',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1500&q=90',
    description:
      'A mixed-use development vision combining commercial activity, public frontage and urban presence.',
  },
  {
    title: 'Interior Architecture',
    category: 'Commercial',
    location: 'Pakistan',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90',
    description:
      'Interior architecture work focused on proportion, material consistency and functional experience.',
  },
]

const FILTERS = ['All', 'Residential', 'Commercial', 'Hospitality', 'Institutional', 'Mixed-Use']

const SPANS = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-7',
  'md:col-span-5',
]

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeIndex, setActiveIndex] = useState(null)

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS
    return PROJECTS.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  const activeProject = activeIndex === null ? null : visibleProjects[activeIndex]

  const close = () => setActiveIndex(null)

  const goNext = () => {
    setActiveIndex((prev) => {
      if (prev === null) return null
      return (prev + 1) % visibleProjects.length
    })
  }

  const goPrev = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === null) return null
      return (prevIndex - 1 + visibleProjects.length) % visibleProjects.length
    })
  }

  useEffect(() => {
    if (activeIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
    }

    document.documentElement.classList.add('overflow-hidden')
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.documentElement.classList.remove('overflow-hidden')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, visibleProjects.length])

  const onFilter = (filter) => {
    setActiveFilter(filter)
    setActiveIndex(null)
  }

  return (
    <section id="projects" className="py-[110px]">
      <div className="site-container">
        <div className="mb-[52px] flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="type-label text-[#77746c]">03 — Selected Work</div>
            <h2 className="type-h2 mt-4">All Projects</h2>
          </div>
          <p className="max-w-[350px] text-[15px] leading-[1.7] text-[#77746c]">
            A growing body of architectural work across residential, commercial, hospitality,
            institutional and mixed-use environments.
          </p>
        </div>

        <div className="mb-[35px] flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => onFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                activeFilter === filter
                  ? 'border-[#171715] bg-[#171715] text-white'
                  : 'border-[#d7d3ca] text-[#77746c] hover:border-[#171715] hover:text-[#171715]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-12">
          {visibleProjects.map((project, index) => (
            <button
              key={`${project.title}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${project.title} project details`}
              className={`${SPANS[index % SPANS.length]} group relative h-[430px] overflow-hidden text-left md:h-[500px]`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-[22px] left-[23px] z-[3] text-white">
                <h3 className="font-[var(--font-manrope)] text-[25px] font-medium">
                  {project.title}
                </h3>
                <p className="mt-[7px] text-[12px] font-medium tracking-[0.08em]">
                  {project.category} · {project.location}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-[90] bg-[#191917]" role="dialog" aria-modal="true">
          <div className="flex h-full flex-col">
            <div className="site-container flex h-[86px] items-center justify-between border-b border-[#3b3b37] text-white">
              <p className="type-meta text-[#aaa]">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(visibleProjects.length).padStart(2, '0')}
              </p>

              <button
                type="button"
                onClick={close}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 items-center justify-center border border-[#44433f] text-white transition-colors duration-300 hover:border-white"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="site-container grid flex-1 gap-8 overflow-y-auto py-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="relative min-h-[55vh] overflow-hidden">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />
              </div>

              <aside className="flex flex-col justify-between bg-[#242421] p-8 text-white">
                <div>
                  <p className="type-meta text-[#aaa]">
                    {activeProject.category} · {activeProject.year}
                  </p>
                  <h3 className="mt-4 font-[var(--font-manrope)] text-[38px] font-medium leading-none tracking-[-0.04em]">
                    {activeProject.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#aaa]">{activeProject.location}</p>
                  <p className="mt-8 text-sm leading-[1.8] text-[#ddd]">
                    {activeProject.description}
                  </p>
                </div>

                <div className="mt-10">
                  <div className="mb-6 flex gap-3">
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous project"
                      className="inline-flex h-11 w-11 items-center justify-center border border-[#44433f] transition-colors duration-300 hover:border-white"
                    >
                      <ArrowLeftIcon />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next project"
                      className="inline-flex h-11 w-11 items-center justify-center border border-[#44433f] transition-colors duration-300 hover:border-white"
                    >
                      <ArrowRightIcon />
                    </button>
                  </div>

                  <a href="#contact" onClick={close} className="editorial-button bg-white !text-[#181816]">
                    Start similar project ↗
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}