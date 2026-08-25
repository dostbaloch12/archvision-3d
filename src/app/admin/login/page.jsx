import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { loginAdmin } from '../actions'

export default function AdminLoginPage({ searchParams }) {
  if (isAdminAuthenticated()) {
    redirect('/admin')
  }

  const error = searchParams?.error

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#191917] px-6 text-white">
      <section className="w-full max-w-md border border-[#3a3a36] bg-[#242421] p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#aaa]">
          Private Access
        </p>

        <h1 className="mt-4 font-[var(--font-manrope)] text-4xl font-medium tracking-[-0.05em]">
          Admin Login
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#aaa]">
          Enter the studio admin password to view inquiries and subscribers.
        </p>

        {error ? (
          <p className="mt-5 border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error === 'invalid'
              ? 'Invalid password.'
              : 'Admin environment is not configured correctly.'}
          </p>
        ) : null}

        <form action={loginAdmin} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="text-[10px] uppercase tracking-[0.14em] text-[#aaa]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-3 h-12 w-full border border-[#4a4a45] bg-transparent px-4 text-white outline-none focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="bg-white px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#181816]"
          >
            Enter Dashboard
          </button>
        </form>

        <a
          href="/"
          className="mt-8 inline-block text-[10px] uppercase tracking-[0.14em] text-[#aaa] hover:text-white"
        >
          Back to website
        </a>
      </section>
    </main>
  )
}