'use client'

import { motion } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'

const STEPS = [
  {
    number: '01',
    title: 'Brief',
    duration: 'Week 1 — 3',
    copy: 'We walk the site, read the constraints and listen until the ambition is unmistakable.',
    outputs: ['Site appraisal', 'Written brief', 'Fee proposal'],
  },
  {
    number: '02',
    title: 'Massing',
    duration: 'Week 4 — 10',
    copy: 'Volumes are studied in three dimensions. Light, approach and landscape find their places.',
    outputs: ['Concept models', 'Sun studies', 'Planning strategy'],
  },
  {
    number: '03',
    title: 'Detail',
    duration: 'Month 3 — 8',
    copy: 'Materials, joints and thresholds are drawn until the building can be built without doubt.',
    outputs: ['Material palette', 'Technical drawings', 'Tender package'],
  },
  {
    number: '04',
    title: 'Vision',
    duration: 'Runs alongside',
    copy: 'Cinematic stills and a live 3D model let you inhabit the work before a contract is signed.',
    outputs: ['Interactive model', 'Renders', 'Client presentation'],
  },
  {
    number: '05',
    title: 'Delivery',
    duration: 'To handover',
    copy: 'We stay on the project through construction — protecting the idea at every site meeting.',
    outputs: ['Site inspections', 'Contractor reviews', 'Final handover'],
  },
]

const EASE = [0.22, 1, 0.36, 1]

export default function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-24 bg-gradient-to-b from-[#7C5FB0] to-[#8A69B8] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-[0.2em] text-[#EAAFCB]">Method</p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
                How a building
                <span className="text-[#F0C4D8]"> arrives.</span>
              </h2>
              <p className="mt-6 max-w-sm text-base text-white/70 md:text-lg">
                A calm sequence. No theatre, no surplus workshops — only the work the building
                actually requires.
              </p>

              <div className="mt-10">
                <AnimatedButton href="#contact" variant="blush">
                  Start at step one
                </AnimatedButton>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {STEPS.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
                className="group relative border-t border-white/20 py-10 pl-8 transition-colors duration-500 ease-out hover:border-[#EAAFCB] md:py-14 md:pl-14"
              >
                <span
                  className="absolute left-0 top-10 h-3 w-3 border border-white/40 bg-transparent transition-colors duration-500 ease-out group-hover:border-[#EAAFCB] group-hover:bg-[#EAAFCB] md:top-14"
                  aria-hidden="true"
                />

                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="font-serif text-5xl font-light tracking-tight text-white/25 transition-colors duration-500 group-hover:text-[#EAAFCB] md:text-6xl">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-light tracking-tight text-white">{step.title}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    {step.duration}
                  </span>
                </div>

                <p className="mt-5 max-w-xl text-base text-white/70 md:text-lg">{step.copy}</p>

                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {step.outputs.map((output) => (
                    <li key={output} className="text-xs uppercase tracking-[0.16em] text-white/55">
                      — {output}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
            <div className="border-t border-white/20" />
          </div>
        </div>
      </div>
    </section>
  )
}