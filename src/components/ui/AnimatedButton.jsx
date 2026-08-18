'use client'

const VARIANTS = {
  olive: 'btn-olive',
  forest: 'btn-forest',
  plum: 'btn-plum',
  blush: 'btn-blush',
  ghost: 'btn-ghost',
}

export default function AnimatedButton({
  href,
  children,
  variant = 'olive',
  showArrow = true,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ariaLabel,
}) {
  const classes = `group btn-glow ${VARIANTS[variant] || VARIANTS.olive} ${className}`

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        <span>{children}</span>
        {showArrow ? arrow : null}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {showArrow ? arrow : null}
    </button>
  )
}