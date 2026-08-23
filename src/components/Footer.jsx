export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-[65px] pb-7">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
        <div className="font-[var(--font-manrope)] text-3xl font-semibold leading-tight tracking-[-0.04em]">
          UTOPIAN
          <br />
          DESIGN STUDIO
        </div>

        <div className="max-w-[300px] text-xs leading-[1.7] text-[#77746c]">
          We design buildings as living compositions — then place them in your hands as interactive
          models.
          <br />
          <br />
          7CC, DHA PHASE 4 · LAHORE
          <br />
          +92 301 3918872
          <br />
          utopiandesignstuido7@gmail.com
        </div>

        <a href="#contact" className="editorial-button">
          Start a Project ↗
        </a>
      </div>

      <div className="mt-[60px] flex flex-col justify-between gap-4 border-t border-[#d7d3ca] pt-[18px] text-[9px] uppercase tracking-[0.1em] text-[#88847c] md:flex-row">
        <span>© {year} Utopian Design Studio</span>
        <span>Lahore · Pakistan</span>
      </div>
    </footer>
  )
}