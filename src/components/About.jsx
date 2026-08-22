'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const STUDIO_POINTS = [
  'Architecture',
  'Interior Design',
  'Planning',
  'Development',
  'Renovation',
  'Turnkey Solutions',
]

const LEADERS = [
  {
    name: 'Zubair Ahmed',
    role: 'Founder & CEO',
    quote:
      'At Utopian Design Studio, we believe architecture is not simply about creating buildings, but about shaping experiences that remain meaningful over time. Our aim is to combine thoughtful design, functionality, and lasting quality to create spaces that truly belong to their people and place.',
  },
  {
    name: 'Rasheed Ahmad',
    role: 'Director',
    quote:
      'Every successful project is built on clarity, collaboration, and attention to detail. We are committed to turning ideas into well-crafted spaces through a process that values quality, precision, and trust from the first concept to final completion.',
  },
]

export default function About() {
  return (
    <section
      id="studio"
      className="scroll-mt-24 bg-gradient-to-b from-[#F4F3F0] via-[#171717] to-[#F4F3F0] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-14 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="md:col-span-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#B5AEA3]">Studio</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#171717] md:text-5xl">
              Designing spaces.
              <span className="text-[#77736B]"> Defining experiences.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="md:col-span-7"
          >
            <p className="text-base leading-relaxed text-[#77736B] md:text-lg">
              Utopian Design Studio is a contemporary architectural firm and interior design studio
              creating functional, refined, and timeless spaces. We combine creative vision,
              thoughtful planning, and technical expertise to transform ideas into distinctive
              environments.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {STUDIO_POINTS.map((point) => (
                <div
                  key={point}
                  className="border border-[#D9D6CF] bg-[#171717] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#77736B]"
                >
                  {point}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div id="about" className="mt-24 scroll-mt-28 border-t border-[#D9D6CF] pt-16">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B5AEA3]">About</p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#171717] md:text-5xl">
                Thoughtful design.
                <span className="text-[#77736B]"> Meaningful spaces. Lasting value.</span>
              </h2>
            </div>

            <div className="space-y-6 md:col-span-8">
              <p className="text-base leading-relaxed text-[#77736B] md:text-lg">
                Utopian Design Studio is an architectural firm and design practice focused on
                creating thoughtful, functional, and timeless spaces. Our work spans architecture,
                interiors, planning, development, and turnkey solutions, with a commitment to design
                quality from concept through completion.
              </p>

              <div className="grid gap-6 lg:grid-cols-2">
                {LEADERS.map((leader, index) => (
                  <motion.figure
                    key={leader.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                    className="border border-[#D9D6CF] bg-[#171717] p-6"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-[#B5AEA3]">
                      From Our Leadership
                    </p>
                    <blockquote className="mt-5 text-base leading-relaxed text-[#77736B]">
                      “{leader.quote}”
                    </blockquote>
                    <figcaption className="mt-6">
                      <p className="font-serif text-2xl font-light tracking-tight text-[#171717]">
                        {leader.name}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#77736B]">
                        {leader.role}
                      </p>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}