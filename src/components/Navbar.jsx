import LogoMark from './LogoMark'

export default function Navbar() {
  const links = [
    { href: '#studio', label: 'Studio' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#process', label: 'Process' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d7d3ca] bg-[#f4f2ed]/90 backdrop-blur-md">
      <div className="site-container">
        <nav className="flex h-[92px] items-center justify-between">
          <a href="/#top" aria-label="Utopian Design Studio home" className="relative block">
            <LogoMark className="h-14 w-52" priority sizes="208px" />
          </a>

          <div className="hidden gap-[34px] text-[13px] font-medium text-[#53514b] md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-[var(--font-manrope)] tracking-[0.04em] transition-colors duration-300 hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden border-b border-[#171715] pb-[7px] font-[var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.13em] text-[#171715] transition-colors duration-300 hover:text-[#77746c] md:inline-flex"
          >
            Start a Project ↗
          </a>

          <a
            href="#contact"
            className="inline-flex border-b border-[#171715] pb-[7px] font-[var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.13em] text-[#171715] md:hidden"
          >
            Start ↗
          </a>
        </nav>
      </div>
    </header>
  )
}
