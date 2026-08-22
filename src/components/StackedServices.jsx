'use client'

import { motion } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'

const SERVICES = [
  {
    number: '01',
    title: 'Architecture',
    copy: 'Thoughtful architectural design for residential, commercial, hospitality, institutional and mixed-use projects.',
    points: ['Concept Design', 'Spatial Planning', 'Design Development'],
  },
  {
    number: '02',
    title: 'Planning',
    copy: 'Clear planning strategies that respond to site, context, circulation, programme and project goals.',
    points: ['Site & Context', 'Project Brief', 'Scope & Proposal'],
  },
  {
    number: '03',
    title: 'Interior Design',
    copy: 'Refined interiors shaped around function, atmosphere, material quality and daily use.',
    points: ['Interior Concepts', 'Material Selection', 'Lighting Direction'],
  },
  {
    number: '04',
    title: 'Renovation',
    copy: 'Transforming existing spaces through careful redesign, improved functionality and modern detailing.',
    points: ['Existing Assessment', 'Design Upgrade', 'Detail Refinement'],
  },
  {
    number: '05',
    title: 'Development',
    copy: 'Design and development support for property owners, investors and real-estate projects.',
    points: ['Feasibility', 'Development Vision', 'Presentation Support'],
  },
  {
    number: '06',
    title: 'Turnkey Execution',
    copy: 'End-to-end project delivery from design coordination to site execution and final handover.',
    points: ['Site Coordination', 'Contractor Management', 'Quality Control'],
  },
]

const EASE = [0.22, 1, 0.36, 1]

export default function StackedServices() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 bg-gradient-to-b from-[#141414] to-[#111111] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#E8DDCC]">Services</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
              From concept to completion.
            </h2>
          </div>

          <p className="max-w-md text-base leading-relaxed text-white/70 md:text-lg">
            We deliver integrated architectural, interior, planning, development, and turnkey
            solutions across residential, commercial, hospitality, institutional, and mixed-use
            projects.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: index * 0.04, ease: EASE }}
              className="group border border-white/15 bg-white/5 p-7 transition-colors duration-500 ease-out hover:border-[#E8DDCC]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#E8DDCC]">
                  {service.number}
                </span>
                <span className="h-px flex-1 bg-white/15" />
              </div>

              <h3 className="mt-8 font-serif text-3xl font-light tracking-tight text-white">
                {service.title}
              </h3>

              <p className="mt-5 text-base leading-relaxed text-white/72">{service.copy}</p>

              <ul className="mt-8 space-y-3">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/55"
                  >
                    <span className="h-1 w-1 bg-[#E8DDCC]" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-12">
          <AnimatedButton href="#contact" variant="blush">
            Start a Project
          </AnimatedButton>
        </div>
      </div>
    </section>
  )
}
