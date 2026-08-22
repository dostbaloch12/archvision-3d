'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'

const ArchitectureCanvas = dynamic(() => import('./three/ArchitectureCanvas'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#080808]" />,
})

const STATS = [
  { value: '06', label: 'Core Services' },
  { value: 'PK', label: 'Lahore Based' },
  { value: '3D', label: 'Design Vision' },
]

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { amount: 0.12 })
  const [ready, setReady] = useState(false)

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-svh min-h-[720px] overflow-hidden bg-[#080808]"
    >
      <div
        className="absolute inset-0"
        role="application"
        aria-label="Interactive 3D building model. Drag to rotate on desktop."
      >
        <ArchitectureCanvas
          active={inView}
          autoRotate
          enableZoom={false}
          enableRotate
          onReady={() => setReady(true)}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080808]/96 via-[#080808]/55 to-transparent md:via-[#080808]/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808]/95 to-transparent" />

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 pt-28 md:justify-center md:px-12 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#C9BCA8]">
            Architecture & Design — Lahore, Pakistan
          </p>

          <h1 className="mt-6 font-serif text-5xl font-light leading-[0.9] tracking-tight text-[#F4EFE6] drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] md:text-7xl">
            Design you
            <br />
            can walk
            <br />
            through.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#C9BCA8] drop-shadow-[0_1px_10px_rgba(0,0,0,0.95)] md:text-lg">
            Utopian Design Studio creates thoughtful architecture across residential, commercial,
            and hospitality projects—rooted in context, purpose, and detail.
          </p>

          <div className="pointer-events-auto mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <AnimatedButton href="#projects" variant="olive">
              Explore Projects
            </AnimatedButton>

            <AnimatedButton href="#contact" variant="ghost" showArrow={false}>
              Start a Commission
            </AnimatedButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="mt-16 hidden items-center gap-10 md:flex"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl font-light tracking-tight text-[#F4EFE6]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8D806E]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
        className="pointer-events-none absolute bottom-10 right-12 hidden text-xs uppercase tracking-[0.2em] text-[#8D806E] lg:block"
      >
        Drag to orbit
      </motion.p>

      <a
        href="#studio"
        aria-label="Scroll to studio"
        className="absolute bottom-8 left-6 z-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8D806E] transition-colors duration-500 hover:text-[#F4EFE6] md:left-12"
      >
        Scroll
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="animate-bounce">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
