'use client'

import { useState } from 'react'
import { loginAction } from '../../actions'

export default function AdminLoginPage() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setPending(true)
    setError('')

    const result = await loginAction(new FormData(event.currentTarget))
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-neutral-800 bg-neutral-900 p-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-amber-500">Studio desk</p>
        <h1 className="mt-4 font-serif text-3xl font-light tracking-tight text-neutral-100">
          Private entrance.
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          This door is for the atelier only. Clients use the public brief.
        </p>

        <label htmlFor="email" className="mt-8 block text-xs uppercase tracking-[0.2em] text-amber-500">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-3 h-12 w-full border border-neutral-800 bg-neutral-950 px-4 text-neutral-100 focus:border-amber-500"
        />

        <label
          htmlFor="password"
          className="mt-6 block text-xs uppercase tracking-[0.2em] text-amber-500"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          className="mt-3 h-12 w-full border border-neutral-800 bg-neutral-950 px-4 text-neutral-100 focus:border-amber-500"
        />

        {error ? (
          <p className="mt-4 text-sm text-amber-500" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-8 w-full bg-amber-500 px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-neutral-950 transition-colors duration-500 hover:bg-amber-400 disabled:opacity-70"
        >
          {pending ? 'Checking' : 'Enter'}
        </button>
      </form>
    </main>
  )
}