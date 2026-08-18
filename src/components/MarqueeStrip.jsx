'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'

const SERVICES = [
  {
    number: '01',
    title: 'Residential Architecture',
    copy: 'Houses, villas and private retreats composed around light, landscape and daily ritual.',
    points: ['Concept & massing', 'Planning package', 'Construction drawings'],
    duration: '14 — 30 months',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80',
    alt: 'Contemporary residence with warm interior light at dusk',
    bg: '#4E3A85',
  },
  {
    number: '02',
    title: 'Commercial & Civic',
    copy: 'Workplaces, galleries and hospitality buildings with a cinematic public presence.',
    points: ['Feasibility studies', 'Facade engineering', 'Tender documentation'],
    duration: '18 — 40 months',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80',
    alt: 'Minimal white commercial facade with strong shadow lines',
    bg: '#5E489B',
  },
  {
    number: '03',
    title: 'Interior Architecture',
    copy: 'Materials, joinery and atmosphere — the last metre where architecture is actually felt.',
    points: ['Material palettes', 'Bespoke joinery', 'Lighting sequences'],
    duration: '8 — 16 months',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    alt: 'Warm minimal interior with oak joinery and soft daylight',
    bg: '#6B52A6',
  },
  {
    number: '04',
    title: '3D Vision & Massing',
    copy: 'Interactive models so you can inhabit a design long before ground is broken.',
    points: ['Live 3D walkthroughs', 'Daylight studies', 'Investor presentations'],
    duration: '3 — 8 weeks',
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80',
    alt: 'Architectural model of a modern house under directional light',
    bg: '#7C5FB0',
  },
]

function ServiceCard({ service, index, total, progress }) {
  const targetScale = 1 - (total - index) * 0.04
  const range = [index / total, 1]
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className="sticky top-0 flex h-svh items-center justify-center px-6 md:px-12">
      <motion.article
        style={{
          scale,
          backgroundColor: service.bg,
          top: `calc(8vh + ${index * 22}px)`,
        }}
        className="relative flex h-[78vh] w-full max-w-6xl origin-top flex-col overflow-hidden border border-white/15 md:flex-row"
      >
        <div className="flex flex-1 flex-col justify-between p-8 md:p-14">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#EAAFCB]">
                {service.number}
              </span>
              <span className="h-px flex-1 bg-white/20" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                {service.duration}
              </span>
            </div>

            <h3 className="mt-10 font-serif text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
              {service.title}
            </h3>

            <p className="mt-6 max-w-md text-base text-white/75 md:text-lg">{service.copy}</p>

            <ul className="mt-10 space-y-3">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/60"
                >
                  <span className="h-1 w-1 bg-[#EAAFCB]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <AnimatedButton href="#contact" variant="blush">
              Discuss this
            </AnimatedButton>
          </div>
        </div>

        <div className="relative hidden w-[42%] shrink-0 md:block">
          <Image src={service.image} alt={service.alt} fill sizes="42vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
        </div>
      </motion.article>
    </div>
  )
}

export default function StackedServices() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#5E489B] to-[#7C5FB0]"
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-24 md:px-12 md:pt-32">
        <p className="text-xs uppercase tracking-[0.2em] text-[#EAAFCB]">Capabilities</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
          A precise field of work.
        </h2>
      </div>

      {SERVICES.map((service, index) => (
        <ServiceCard
          key={service.number}
          service={service}
          index={index}
          total={SERVICES.length}
          progress={scrollYProgress}
        />
      ))}
    </section>
  )
}