'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
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
  },
]

const EASE = [0.22, 1, 0.36, 1]

export default function StackedServices() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 bg-gradient-to-b from-[#5E489B] to-[#7C5FB0] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#EAAFCB]">Capabilities</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
              A precise field of work.
            </h2>
          </div>

          <p className="max-w-sm text-base text-white/70 md:text-lg">
            Disciplines needed to take a building from first sketch to an interactive model.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: index * 0.04, ease: EASE }}
              className="group overflow-hidden border border-white/15 bg-white/5 transition-colors duration-500 ease-out hover:border-[#EAAFCB]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E1A47]/85 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#EAAFCB]">
                      {service.number}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/70">
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-light tracking-tight text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-base text-white/75 md:text-lg">{service.copy}</p>

                <ul className="mt-7 space-y-3">
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

                <div className="mt-8">
                  <AnimatedButton href="#contact" variant="blush">
                    Discuss this
                  </AnimatedButton>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}