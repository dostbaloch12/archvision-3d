'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Compass, Layers, Sun } from '@/components/icons'
import TextReveal from './ui/TextReveal'

const STATS = [
  { target: 18, suffix: '', label: 'Years of practice' },
  { target: 240, suffix: '+', label: 'Works delivered' },
  { target: 14, suffix: '', label: 'Countries' },
  { target: 36, suffix: '', label: 'Design awards' },
]

const PILLARS = [
  { icon: Sun, title: 'Light first', copy: 'Every plan is tested against the sun path before a single wall is fixed.' },
  { icon: Layers, title: 'Honest material', copy: 'Concrete, stone, oak and glass — left to age rather than disguised.' },
  { icon: Compass, title: 'Site before style', copy: 'The land dictates the geometry. We never repeat a house on a new plot.' },
]

const EASE = [0.22, 1, 0.36, 1]

function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return undefined

    let frame = 0
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration])

  return value
}

function Stat({ target, suffix, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const value = useCountUp(target, inView)

  return (
    <div ref={ref}>
      <dt className="text-xs uppercase tracking-[0.2em] text-white/60">{label}</dt>
      <dd className="mt-3 font-serif text-4xl font-light tracking-tight text-[#F0C4D8] md:text-5xl">
        {value}
        {suffix}
      </dd>
    </div>
  )
}

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-gradient-to-b from-[#654EA3] to-[#5E489B] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#EAAFCB]">The Studio</p>

        <TextReveal
          className="mt-6 max-w-4xl font-serif text-3xl font-light leading-[1.2] tracking-tight md:text-5xl"
          baseColor="text-white/20"
          revealColor="text-white"
        >
          We are a compact atelier of architects and visualisers. We take few commissions each year,
          on buildings that must outlive their owners.
        </TextReveal>

        <div className="mt-20 grid gap-12 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                alt="White modern villa with cantilevered volumes beside a still reflecting pool"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60">
              Aurelia House — study model, 2024
            </p>

            <div className="relative mt-6 aspect-[4/3] overflow-hidden border border-white/20 md:mt-8">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Concrete stair detail lit by a narrow slot of daylight"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="md:col-span-7"
          >
            <div className="space-y-5 text-base text-white/75 md:text-lg">
              <p>
                Every project begins as a conversation on site and ends as a place that cannot be
                imagined any other way. Mass, light and landscape are composed together — then
                tested in three dimensions long before the first drawing is issued.
              </p>
              <p>
                Nothing leaves the studio until it has been walked through in a model. That is why
                our clients recognise their building the moment it is finished.
              </p>
            </div>

            <figure className="mt-10 border-l-2 border-[#EAAFCB] pl-6">
              <blockquote className="font-serif text-2xl font-light leading-snug tracking-tight text-white">
                “A building should be a quiet host — never louder than the life inside it.”
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-[#F0C4D8]">
                Elena Voss — Founding Principal
              </figcaption>
            </figure>

            <div className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {PILLARS.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                    className="group border-t border-white/20 pt-6 transition-colors duration-500 ease-out hover:border-[#EAAFCB]"
                  >
                    <Icon
                      size={20}
                      className="text-[#EAAFCB] transition-transform duration-500 ease-out group-hover:-translate-y-1"
                    />
                    <h3 className="mt-5 text-lg font-light tracking-tight text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/70">{pillar.copy}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-white/20 pt-12 md:grid-cols-4 md:gap-12">
          {STATS.map((stat) => (
            <Stat key={stat.label} target={stat.target} suffix={stat.suffix} label={stat.label} />
          ))}
        </dl>
      </div>
    </section>
  )
}