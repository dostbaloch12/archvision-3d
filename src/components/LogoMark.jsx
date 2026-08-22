import Image from 'next/image'

export default function LogoMark({
  className = 'h-12 w-40',
  priority = false,
  sizes = '160px',
}) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <Image
        src="/logo/utopian-logo.jpeg"
        alt="Utopian Design Studio logo"
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain object-left"
      />
    </div>
  )
}