import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="studio"
      className="grid min-h-[780px] grid-cols-1 items-center gap-12 py-[75px] md:grid-cols-[0.9fr_1.1fr] md:gap-[7%]"
    >
      <div>
        <div className="mb-[30px] text-[10px] font-semibold uppercase tracking-[0.19em] text-[#77746d]">
          Architecture & Design — Lahore, Pakistan
        </div>

        <h1 className="max-w-[690px] font-[var(--font-manrope)] text-[clamp(62px,7.6vw,112px)] font-medium leading-[0.89] tracking-[-0.067em] text-[#171715]">
          Design you can walk through.
        </h1>

        <p className="mt-[37px] max-w-[520px] text-[15px] leading-[1.7] text-[#6c6961]">
          <strong className="text-[#282722]">Utopian Design Studio</strong> creates thoughtful
          architecture across residential, commercial, and hospitality projects—rooted in context,
          purpose, and detail.
        </p>

        <div className="mt-[39px] flex flex-wrap items-center gap-[27px]">
          <a href="#projects" className="editorial-button">
            Explore Projects ↗
          </a>

          <a href="#contact" className="editorial-textlink">
            Start a Commission
          </a>
        </div>
      </div>

      <a
        href="#projects"
        aria-label="View selected projects"
        className="group relative h-[430px] overflow-hidden md:h-[670px]"
      >
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90"
          alt="Architecture"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute bottom-5 left-[22px] z-[2] text-[10px] font-semibold uppercase tracking-[0.13em] text-white">
          Selected Work / 01
        </span>
      </a>
    </section>
  )
}