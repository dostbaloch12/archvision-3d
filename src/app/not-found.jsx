import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#F4F3F0] px-6 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[#171717]">Error 404</p>

      <h1 className="mt-6 font-serif text-6xl font-light tracking-tight text-[#171717] md:text-8xl">
        Lost in space.
      </h1>

      <p className="mt-6 max-w-md text-base text-[#77736B] md:text-lg">
        The page you are looking for does not exist, or has been moved.
      </p>

      <Link href="/" className="btn-glow btn-olive mt-10">
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
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <span>Back to home</span>
      </Link>
    </section>
  )
}
