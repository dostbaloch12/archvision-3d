import LogoMark from './LogoMark'

const WHATSAPP_URL =
  'https://wa.me/923013918872?text=Hello%20Utopian%20Design%20Studio%2C%20I%20want%20to%20discuss%20a%20project.'

function WhatsAppIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.7-5.1A9 9 0 1 1 8.1 19.3L3 21z" />
      <path d="M8.5 9.5c.2 3 2.8 5.6 6 6" />
      <path d="M9 8.5l1.1 1.9-1 1c.7 1.4 1.8 2.5 3.2 3.2l1-1 1.9 1.1" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="min-h-[360px] w-full py-[65px] pb-7 font-[var(--font-manrope)]">
      <div className="flex w-full flex-col justify-between gap-8 md:flex-row md:items-start">
        <a href="/#top" aria-label="Utopian Design Studio home" className="mt-3 block md:mt-6">
          <LogoMark className="h-20 w-64" sizes="256px" />
        </a>

        <div className="max-w-[330px] text-xs leading-[1.7] text-[#77746c]">
          We design buildings as living compositions — then place them in your hands as interactive
          models.
          <br />
          <br />
          7CC, DHA PHASE 4 · LAHORE
          <br />
          <a
            href="tel:+923013918872"
            className="transition-colors duration-300 hover:text-[#171715]"
          >
            +92 301 3918872
          </a>
          <br />
          <a
            href="mailto:utopiandesignstuido7@gmail.com"
            className="transition-colors duration-300 hover:text-[#171715]"
          >
            utopiandesignstuido7@gmail.com
          </a>
        </div>

        <div className="flex flex-col items-start gap-4">
          <a href="#contact" className="editorial-button">
            Start a Project ↗
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-[#171715] pb-[7px] text-[10px] font-semibold uppercase tracking-[0.13em] text-[#171715] transition-colors duration-300 hover:text-[#77746c]"
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-[60px] flex w-full flex-col justify-between gap-4 border-t border-[#d7d3ca] pt-[18px] text-[9px] uppercase tracking-[0.1em] text-[#88847c] md:flex-row">
        <span>© {year} Utopian Design Studio</span>
        <span>Lahore · Pakistan</span>
      </div>
    </footer>
  )
}