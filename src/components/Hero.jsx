'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'

const ArchitectureCanvas = dynamic(() => import('./three/ArchitectureCanvas'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#041B13]" />,
})

const STATS = [
  { value: '240+', label: 'Works' },
  { value: '18', label: 'Years' },
  { value: '36', label: 'Awards' },
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
      className="relative h-svh min-h-[720px] overflow-hidden bg-[#041B13]"
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#041B13]/95 via-[#041B13]/45 to-transparent md:via-[#041B13]/25" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#041B13]/85 to-transparent" />

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 pt-28 md:justify-center md:px-12 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#CED46A]">
            Independent architecture atelier — est. 2006
          </p>

          <h1 className="mt-6 font-serif text-5xl font-light leading-[0.9] tracking-tight text-[#EAF3EC] drop-shadow-[0_2px_20px_rgba(4,27,19,0.9)] md:text-7xl">
            Design you
            <br />
            can walk
            <br />
            through.
          </h1>

          <p className="mt-8 max-w-md text-base text-[#B9CCC0] drop-shadow-[0_1px_10px_rgba(4,27,19,0.95)] md:text-lg">
            Interactive architectural models. Quiet luxury. Buildings composed like film stills —
            for clients who refuse the generic.
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
              <p className="font-serif text-3xl font-light tracking-tight text-[#EAF3EC] drop-shadow-[0_2px_12px_rgba(4,27,19,0.95)]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#B9CCC0]">
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
        className="pointer-events-none absolute bottom-10 right-12 hidden text-xs uppercase tracking-[0.2em] text-[#B9CCC0] lg:block"
      >
        Drag to orbit
      </motion.p>

      <a
        href="#about"
        aria-label="Scroll to studio"
        className="absolute bottom-8 left-6 z-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B9CCC0] transition-colors duration-500 hover:text-[#CED46A] md:left-12"
      >
        Scroll
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="animate-bounce"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}