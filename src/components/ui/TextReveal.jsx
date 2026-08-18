'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Word({ children, progress, range, baseColor, revealColor }) {
  const opacity = useTransform(progress, range, [0, 1])

  return (
    <span className="relative mr-[0.28em] mt-[0.12em] inline-block">
      <span className={`absolute inset-0 ${baseColor}`}>{children}</span>
      <motion.span style={{ opacity }} className={revealColor}>
        {children}
      </motion.span>
    </span>
  )
}

export default function TextReveal({
  children,
  className = '',
  baseColor = 'text-white/20',
  revealColor = 'text-white',
}) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'start 0.25'],
  })

  const words = String(children).split(' ')

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const start = index / words.length
        const end = start + 1 / words.length

        return (
          <Word
            key={`${word}-${index}`}
            progress={scrollYProgress}
            range={[start, end]}
            baseColor={baseColor}
            revealColor={revealColor}
          >
            {word}
          </Word>
        )
      })}
    </p>
  )
}