import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="top"
      className="grid min-h-[calc(100svh-92px)] grid-cols-1 items-center gap-10 py-10 md:grid-cols-[0.95fr_1.05fr] md:gap-12 md:py-12"
    >
      <div className="flex flex-col justify-center">
        <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#77746d]">
          Architecture & Design — Lahore, Pakistan
        </div>

        <h1 className="max-w-[680px] font-[var(--font-manrope)] text-[clamp(56px,6.9vw,104px)] font-medium leading-[0.9] tracking-[-0.067em] text-[#111111]">
          Design you can walk through.
        </h1>

        <p className="mt-8 max-w-[560px] text-[22px] leading-[1.55] tracking-[-0.035em] text-[#6c6961]">
          <strong className="font-semibold text-[#111111]">Utopian Design Studio</strong> creates
          thoughtful architecture across residential, commercial, and hospitality projects—rooted in
          context, purpose, and detail.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#projects" className="editorial-button">
            Explore projects ↗
          </a>

          <a href="#contact" className="editorial-ghost">
            Start a commission
          </a>
        </div>
      </div>

      <a
        href="#projects"
        aria-label="View selected projects"
        className="group relative h-[360px] overflow-hidden md:h-[calc(100svh-210px)] md:max-h-[620px] md:min-h-[460px]"
      >
        <Image
          src="/images/hero-main.png"
          alt="Utopian Design Studio architecture project"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 52vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute bottom-5 left-[22px] z-[2] text-[12px] font-medium tracking-[0.06em] text-white">
          Selected work / 01
        </span>
      </a>
    </section>
  )
}