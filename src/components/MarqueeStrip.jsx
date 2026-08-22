'use client'

import Marquee from './ui/Marquee'

const SERVICES = [
  'Architecture',
  'Planning',
  'Interior Design',
  'Renovation',
  'Development',
  'Turnkey Execution',
]

export default function MarqueeStrip() {
  return (
    <section
      className="overflow-hidden border-y border-[#D9D6CF] bg-[#F4F3F0] py-6"
      aria-label="Services offered"
    >
      <Marquee
        items={SERVICES}
        speed={38}
        direction="left"
        separator="✦"
        className="font-serif text-2xl font-light tracking-tight text-[#171717] md:text-3xl"
      />
    </section>
  )
}