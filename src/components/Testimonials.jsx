'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote:
      'ArchVision did not just design our house — they choreographed how light moves through it across the day. We saw it in 3D before ground was broken and it looked exactly the same when finished.',
    name: 'Marcus Hail',
    role: 'Homeowner, Aurelia House',
  },
  {
    quote:
      'The most rigorous studio we have worked with. Every material decision was justified, every model was tested. Our headquarters feels calmer than any office I have used.',
    name: 'Priya Nandan',
    role: 'CEO, Northline Group',
  },
  {
    quote:
      'They turned a derelict brick works into eleven of the most sought-after lofts in the neighbourhood, without erasing a single scar of the original building.',
    name: 'Daniel Reyes',
    role: 'Developer, The Kiln Lofts',
  },
]

const EASE = [0.22, 1, 0.36, 1]

function QuoteMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mx-auto text-[#44433f]"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const active = TESTIMONIALS[index]

  const next = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  const prev = () => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <section
      className="bg-gradient-to-b from-[#44433f] to-[#44433f] py-24 md:py-32"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#44433f]">Client Words</p>
        <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-white md:text-5xl">
          What clients remember.
        </h2>

        <div className="mt-16 min-h-[300px]">
          <QuoteMark />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="mt-8 font-serif text-2xl font-light leading-relaxed tracking-tight text-white md:text-3xl">
                “{active.quote}”
              </p>
              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#44433f]">{active.name}</p>
              <p className="mt-1 text-sm text-white/80">{active.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="inline-flex h-11 w-11 items-center justify-center border border-white/40 text-white transition-colors duration-500 ease-out hover:border-[#44433f] hover:bg-[#44433f] hover:text-[#44433f]"
          >
            <ChevronLeftIcon />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                  i === index ? 'bg-[#44433f]' : 'bg-white/45'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="inline-flex h-11 w-11 items-center justify-center border border-white/40 text-white transition-colors duration-500 ease-out hover:border-[#44433f] hover:bg-[#44433f] hover:text-[#44433f]"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </section>
  )
}
