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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808]"
          role="status"
          aria-live="polite"
          aria-label="Loading Utopian Design Studio"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col items-center text-center"
          >
            <span className="font-serif text-3xl font-light tracking-[0.24em] text-[#F4EFE6] md:text-5xl">
              UTOPIAN
            </span>

            <span className="mt-3 text-[10px] uppercase tracking-[0.34em] text-[#C9BCA8] md:text-xs">
              Design Studio
            </span>

            <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#8D806E]">
              Architecture & Design — Lahore
            </p>
          </motion.div>

          <div className="mt-14 w-56 md:w-72">
            <div className="h-px w-full bg-[#262626]">
              <div
                className="h-px bg-gradient-to-r from-[#8D806E] via-[#F4EFE6] to-[#C9BCA8]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8D806E]">
                Loading
              </span>
              <span className="font-serif text-lg font-light tabular-nums text-[#F4EFE6]">
                {String(progress).padStart(3, '0')}
              </span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
