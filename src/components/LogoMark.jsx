import Image from 'next/image'

export default function LogoMark({
  className = 'h-12 w-44',
  priority = false,
  sizes = '176px',
  dark = false,
}) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <Image
        src="/logo/utopian-logo.jpeg"
        alt="Utopian Design Studio logo"
        fill
        priority={priority}
        sizes={sizes}
        className={`object-contain object-left ${dark ? 'brightness-0 invert' : ''}`}
      />
    </div>
  )
}