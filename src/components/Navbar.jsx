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

          <div className="hidden gap-[30px] text-[13px] font-medium text-[#53514b] md:flex">
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

          <a href="#contact" className="editorial-button hidden md:inline-flex">
            Start a project ↗
          </a>

          <a
            href="#contact"
            className="inline-flex border-b border-[#171715] pb-[7px] text-[11px] font-semibold tracking-[0.08em] text-[#171715] md:hidden"
          >
            Start ↗
          </a>
        </nav>
      </div>
    </header>
  )
}