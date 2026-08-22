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
      className="scroll-mt-24 bg-gradient-to-b from-[#080808] to-[#111111] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B59A67]">Method</p>

              <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F4EFE6] md:text-5xl">
                How a project
                <span className="text-[#C9BCA8]"> takes shape.</span>
              </h2>

              <p className="mt-6 max-w-sm text-base leading-relaxed text-[#C9BCA8] md:text-lg">
                A clear, considered process — from the first conversation to final handover. We
                bring together design, technical expertise, and execution to deliver projects with
                clarity and purpose.
              </p>

              <div className="mt-10">
                <AnimatedButton href="#contact" variant="olive">
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
                className="group relative border-t border-[#2A2A2A] py-10 pl-8 transition-colors duration-500 ease-out hover:border-[#B59A67] md:py-14 md:pl-14"
              >
                <span
                  className="absolute left-0 top-10 h-3 w-3 border border-[#3A3A3A] bg-[#080808] transition-colors duration-500 ease-out group-hover:border-[#B59A67] group-hover:bg-[#B59A67] md:top-14"
                  aria-hidden="true"
                />

                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="font-serif text-5xl font-light tracking-tight text-[#2A2A2A] transition-colors duration-500 group-hover:text-[#B59A67] md:text-6xl">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-light tracking-tight text-[#F4EFE6]">{step.title}</h3>
                </div>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#C9BCA8] md:text-lg">
                  {step.copy}
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {step.outputs.map((output) => (
                    <li key={output} className="text-xs uppercase tracking-[0.16em] text-[#8D806E]">
                      — {output}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}

            <div className="border-t border-[#2A2A2A]" />
          </div>
        </div>
      </div>
    </section>
  )
}