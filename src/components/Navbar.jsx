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
    <nav className="flex h-[92px] items-center justify-between border-b border-[#d7d3ca]">
      <a href="#" aria-label="Utopian Design Studio home" className="relative block">
        <LogoMark className="h-14 w-52" priority sizes="208px" />
      </a>

      <div className="hidden gap-[30px] text-xs text-[#53514b] md:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors duration-300 hover:text-black">
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="hidden border-b border-[#171715] pb-[7px] text-[10px] font-semibold uppercase tracking-[0.13em] text-[#171715] md:inline-flex"
      >
        Start a Project ↗
      </a>
    </nav>
  )
}