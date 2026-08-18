'use client'

import Marquee from './ui/Marquee'

const SERVICES = [
  'Residential Architecture',
  'Commercial & Civic',
  'Interior Architecture',
  '3D Vision & Massing',
  'Adaptive Reuse',
  'Master Planning',
]

export default function MarqueeStrip() {
  return (
    <section
      className="overflow-hidden border-y border-white/15 bg-gradient-to-b from-[#654EA3] to-[#5E489B] py-6"
      aria-label="Services offered"
    >
      <Marquee
        items={SERVICES}
        speed={38}
        direction="left"
        separator="✦"
        className="font-serif text-2xl font-light tracking-tight text-white md:text-3xl"
      />
    </section>
  )
}