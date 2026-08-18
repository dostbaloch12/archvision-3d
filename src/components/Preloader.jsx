'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const DURATION = 3000
const EASE = [0.22, 1, 0.36, 1]

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('overflow-hidden')

    const start = performance.now()
    let frame = 0

    const tick = (now) => {
      const elapsed = now - start
      const raw = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - raw, 2)
      setProgress(Math.round(eased * 100))

      if (raw < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setDone(true)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [])

  useEffect(() => {
    if (!done) return undefined

    const id = window.setTimeout(() => {
      document.documentElement.classList.remove('overflow-hidden')
    }, 700)

    return () => window.clearTimeout(id)
  }, [done])

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#041B13]"
          role="status"
          aria-live="polite"
          aria-label="Loading ArchVision 3D"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col items-center"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-light tracking-[0.3em] text-[#EAF3EC] md:text-4xl">
                ARCHVISION
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#CED46A]">3D</span>
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#8FAA9B]">
              Architecture Atelier
            </p>
          </motion.div>

          <div className="mt-14 w-56 md:w-72">
            <div className="h-px w-full bg-[#0A3D2B]">
              <div
                className="h-px bg-gradient-to-r from-[#CED46A] to-[#654EA3]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8FAA9B]">Loading</span>
              <span className="font-serif text-lg font-light tabular-nums text-[#CED46A]">
                {String(progress).padStart(3, '0')}
              </span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}