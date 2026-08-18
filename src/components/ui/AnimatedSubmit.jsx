'use client'

const VARIANTS = {
  olive: 'btn-olive',
  forest: 'btn-forest',
  plum: 'btn-plum',
  blush: 'btn-blush',
}

export default function AnimatedSubmit({
  loading = false,
  children = 'Send',
  loadingText = 'Sending',
  variant = 'plum',
  className = '',
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`group btn-glow ${VARIANTS[variant] || VARIANTS.plum} ${className}`}
    >
      {loading ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
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
        </>
      )}
    </button>
  )
}