'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FAQS = [
  {
    question: 'How much does a commission cost?',
    answer:
      'Every project is priced individually based on scope, size and location. After your brief, we send a fixed fee proposal broken down by phase — no hourly billing surprises.',
  },
  {
    question: 'Do you work outside Los Angeles and Dubai?',
    answer:
      'Yes. We have delivered projects across 14 countries. Site visits and construction supervision are scoped separately for international work.',
  },
  {
    question: 'Can I see the 3D model before construction starts?',
    answer:
      'Always. Every project includes a live, interactive 3D model — the same kind featured on this site — so you can walk through the design before any contract is signed.',
  },
  {
    question: 'How long does a typical residential project take?',
    answer:
      'From first brief to handover, most private houses take 14 to 30 months depending on complexity, planning approval times and site conditions.',
  },
  {
    question: 'Do you handle planning permission and permits?',
    answer:
      'Yes, our team manages the full planning and permitting process as part of the standard service, including liaison with local authorities.',
  },
]

const EASE = [0.22, 1, 0.36, 1]

function PlusIcon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={`shrink-0 text-[#262626] transition-transform duration-500 ease-out ${
        open ? 'rotate-45' : 'rotate-0'
      }`}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      className="bg-gradient-to-b from-[#F4EFE6] to-[#F4EFE6] py-24 md:py-32"
      aria-label="Frequently asked questions"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#262626]">Questions</p>
          <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-[#080808] md:text-5xl">
            Before you write to us.
          </h2>
        </div>

        <div className="mt-16 border-t border-[#080808]/20">
          {FAQS.map((faq, index) => {
            const isOpen = index === openIndex
            return (
              <div key={faq.question} className="border-b border-[#080808]/20">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="text-lg font-light tracking-tight text-[#080808] md:text-xl">
                    {faq.question}
                  </span>
                  <PlusIcon open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 text-base text-[#111111]/80 md:text-lg">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
