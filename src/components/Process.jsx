'use client'

import { motion } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'

const STEPS = [
  {
    number: '01',
    title: 'Brief',
    copy: 'Understanding the site, requirements, vision, and project goals.',
    outputs: ['Site & Context', 'Project Brief', 'Scope & Proposal'],
  },
  {
    number: '02',
    title: 'Concept',
    copy: 'Shaping the idea through planning, form, space, and material.',
    outputs: ['Concept Design', 'Spatial Planning', 'Design Direction'],
  },
  {
    number: '03',
    title: 'Development',
    copy: 'Refining every element into a coordinated and buildable design.',
    outputs: ['Detailed Design', 'Material Selection', 'Working Drawings'],
  },
  {
    number: '04',
    title: 'Execution',
    copy: 'Bringing the design to life with careful coordination and quality control.',
    outputs: ['Site Coordination', 'Contractor Management', 'Quality Control'],
  },
  {
    number: '05',
    title: 'Handover',
    copy: 'Completing the project with attention to detail, ready for use and enjoyment.',
    outputs: ['Final Inspection', 'Finishing & Snagging', 'Project Handover'],
  },
]

const EASE = [0.22, 1, 0.36, 1]

export default function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-24 bg-gradient-to-b from-[#111111] to-[#171717] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-[0.2em] text-[#E8DDCC]">Method</p>

              <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
                How a project
                <span className="text-[#C9BCA8]"> takes shape.</span>
              </h2>

              <p className="mt-6 max-w-sm text-base leading-relaxed text-white/70 md:text-lg">
                A clear, considered process — from the first conversation to final handover. We
                bring together design, technical expertise, and execution to deliver projects with
                clarity and purpose.
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
                className="group relative border-t border-white/20 py-10 pl-8 transition-colors duration-500 ease-out hover:border-[#E8DDCC] md:py-14 md:pl-14"
              >
                <span
                  className="absolute left-0 top-10 h-3 w-3 border border-white/40 bg-transparent transition-colors duration-500 ease-out group-hover:border-[#E8DDCC] group-hover:bg-[#E8DDCC] md:top-14"
                  aria-hidden="true"
                />

                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="font-serif text-5xl font-light tracking-tight text-white/25 transition-colors duration-500 group-hover:text-[#E8DDCC] md:text-6xl">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-light tracking-tight text-white">{step.title}</h3>
                </div>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                  {step.copy}
                </p>

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
