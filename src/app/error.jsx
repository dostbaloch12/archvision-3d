'use client'

import { useEffect } from 'react'

export default function ErrorBoundaryPage({ error, reset }) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#041B13] px-6 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[#CED46A]">Something broke</p>

      <h1 className="mt-6 font-serif text-5xl font-light tracking-tight text-[#EAF3EC] md:text-6xl">
        Unexpected error.
      </h1>

      <p className="mt-6 max-w-md text-base text-[#8FAA9B] md:text-lg">
        Please try again. If the problem continues, write to studio@archvision3d.com.
      </p>

      <button type="button" onClick={reset} className="btn-glow btn-olive mt-10">
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
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        <span>Try again</span>
      </button>
    </section>
  )
}