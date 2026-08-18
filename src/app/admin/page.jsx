import { redirect } from 'next/navigation'
import { decryptText } from '@/lib/crypto'
import { getAdminUser } from '@/lib/supabase/server'
import { logoutAction, updateInquiryStatus } from '../actions'

export const dynamic = 'force-dynamic'
export const robots = { index: false, follow: false }

function reveal(value) {
  if (!value) {
    return '—'
  }
  try {
    return decryptText(value)
  } catch {
    return 'Unable to decrypt'
  }
}

export default async function AdminPage() {
  const { supabase, user, isAdmin } = await getAdminUser()

  if (!user) {
    redirect('/admin/login')
  }
  if (!isAdmin) {
    redirect('/admin/login')
  }

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('id, created_at, name, email_enc, phone_enc, type, budget, timeline, location, area, message_enc, status')
    .order('created_at', { ascending: false })
    .limit(100)

  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('id, created_at, email_enc')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-800 pb-10 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-500">Studio desk</p>
            <h1 className="mt-3 font-serif text-4xl font-light tracking-tight">Incoming work</h1>
            <p className="mt-3 text-sm text-neutral-400">{user.email}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="border border-neutral-800 px-5 py-3 text-xs uppercase tracking-[0.2em] text-neutral-300 transition-colors duration-500 hover:border-amber-500 hover:text-amber-500"
            >
              Sign out
            </button>
          </form>
        </div>

        <section className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.2em] text-amber-500">
            Briefs · {inquiries?.length || 0}
          </h2>
          <div className="mt-6 space-y-4">
            {(inquiries || []).map((item) => (
              <article key={item.id} className="border border-neutral-800 bg-neutral-900 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-serif text-2xl font-light">{item.name}</p>
                  <span className="text-xs uppercase tracking-[0.2em] text-amber-500">{item.status}</span>
                </div>
                <p className="mt-3 text-sm text-neutral-400">
                  {new Date(item.created_at).toLocaleString()} · {item.type} · {item.budget}
                </p>
                <p className="mt-2 text-sm text-neutral-300">
                  {reveal(item.email_enc)} · {reveal(item.phone_enc)}
                </p>
                <p className="mt-2 text-sm text-neutral-400">
                  {item.location}
                  {item.area ? ` · ${item.area}` : ''} · {item.timeline}
                </p>
                <p className="mt-4 whitespace-pre-wrap text-neutral-200">{reveal(item.message_enc)}</p>
                <form action={updateInquiryStatus} className="mt-6 flex flex-wrap gap-3">
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    name="status"
                    value="read"
                    className="border border-neutral-800 px-4 py-2 text-xs uppercase tracking-[0.16em] text-neutral-300 hover:border-amber-500 hover:text-amber-500"
                  >
                    Mark read
                  </button>
                  <button
                    name="status"
                    value="archived"
                    className="border border-neutral-800 px-4 py-2 text-xs uppercase tracking-[0.16em] text-neutral-300 hover:border-amber-500 hover:text-amber-500"
                  >
                    Archive
                  </button>
                </form>
              </article>
            ))}
            {!inquiries?.length ? (
              <p className="text-neutral-500">No briefs yet.</p>
            ) : null}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-amber-500">
            Journal · {subscribers?.length || 0}
          </h2>
          <ul className="mt-6 divide-y divide-neutral-800 border border-neutral-800">
            {(subscribers || []).map((row) => (
              <li key={row.id} className="flex justify-between gap-4 px-5 py-4 text-sm">
                <span>{reveal(row.email_enc)}</span>
                <span className="text-neutral-500">{new Date(row.created_at).toLocaleDateString()}</span>
              </li>
            ))}
            {!subscribers?.length ? (
              <li className="px-5 py-4 text-neutral-500">No subscribers yet.</li>
            ) : null}
          </ul>
        </section>
      </div>
    </main>
  )
}