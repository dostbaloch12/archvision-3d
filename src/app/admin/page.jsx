import { requireAdmin } from '@/lib/adminAuth'
import { createSupabaseAdmin } from '@/lib/supabaseAdmin'
import { deleteMessage, logoutAdmin, updateMessageStatus } from './actions'

function formatDate(value) {
    if (!value) return '—'

    return new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value))
}

function formatWhatsAppPhone(value) {
    const digits = String(value || '').replace(/\D/g, '')

    if (!digits) {
        return ''
    }

    if (digits.startsWith('00')) {
        return digits.slice(2)
    }

    if (digits.startsWith('0')) {
        return `92${digits.slice(1)}`
    }

    if (digits.startsWith('92')) {
        return digits
    }

    if (digits.length === 10) {
        return `92${digits}`
    }

    return digits
}

function StatusBadge({ status }) {
    const normalized = status || 'new'

    const classes = {
        new: 'border-yellow-300/40 bg-yellow-300/10 text-yellow-100',
        contacted: 'border-blue-300/40 bg-blue-300/10 text-blue-100',
        closed: 'border-green-300/40 bg-green-300/10 text-green-100',
    }

    return (
        <span
            className={`inline-flex border px-2 py-1 text-[10px] uppercase tracking-[0.14em] ${classes[normalized] || classes.new
                }`}
        >
            {normalized}
        </span>
    )
}

export default async function AdminPage({ searchParams }) {
    requireAdmin()

    const supabase = createSupabaseAdmin()

    const [{ data: messages, error: messagesError }, { data: subscribers, error: subscribersError }] =
        await Promise.all([
            supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100),
            supabase
                .from('journal_subscribers')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100),
        ])

    return (
        <main className="min-h-screen bg-[#191917] px-6 py-8 text-white">
            <div className="mx-auto max-w-7xl">
                <header className="flex flex-col justify-between gap-5 border-b border-[#3a3a36] pb-6 md:flex-row md:items-end">
                    <div>
                        <p className="mt-2 text-xs text-[#aaa]">
                            Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#aaa]">
                            Utopian Design Studio
                        </p>
                        <h1 className="mt-3 font-[var(--font-manrope)] text-5xl font-medium tracking-[-0.06em]">
                            Admin Dashboard
                        </h1>
                        <p className="mt-3 text-sm text-[#aaa]">
                            Manage project inquiries and journal subscribers.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href="/"
                            className="border border-[#4a4a45] px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-[#ddd] hover:border-white hover:text-white"
                        >
                            View Website
                        </a>

                        <form action={logoutAdmin}>
                            <button
                                type="submit"
                                className="bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#181816]"
                            >
                                Logout
                            </button>
                        </form>
                    </div>
                </header>

                {searchParams?.updated ? (
                    <p className="mt-5 border border-green-300/30 bg-green-300/10 p-3 text-sm text-green-100">
                        Message updated.
                    </p>
                ) : null}

                {searchParams?.deleted ? (
                    <p className="mt-5 border border-green-300/30 bg-green-300/10 p-3 text-sm text-green-100">
                        Message deleted.
                    </p>
                ) : null}

                {searchParams?.error ? (
                    <p className="mt-5 border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100">
                        Action failed: {searchParams.error}
                    </p>
                ) : null}

                <section className="mt-10">
                    <div className="flex items-baseline justify-between gap-6">
                        <h2 className="font-[var(--font-manrope)] text-3xl font-medium tracking-[-0.04em]">
                            Project Inquiries
                        </h2>
                        <p className="text-sm text-[#aaa]">{messages?.length || 0} messages</p>
                    </div>

                    {messagesError ? (
                        <p className="mt-6 border border-red-300/30 bg-red-300/10 p-4 text-red-100">
                            Could not load messages: {messagesError.message}
                        </p>
                    ) : null}

                    <div className="mt-6 grid gap-5">
                        {(messages || []).map((message) => {
                            const whatsappPhone = formatWhatsAppPhone(message.phone)

                            return (
                                <article key={message.id} className="border border-[#3a3a36] bg-[#242421] p-5">
                                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="font-[var(--font-manrope)] text-2xl font-medium tracking-[-0.035em]">
                                                    {message.name}
                                                </h3>
                                                <StatusBadge status={message.status} />
                                            </div>

                                            <p className="mt-2 text-sm text-[#aaa]">{formatDate(message.created_at)}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <a
                                                href={`mailto:${message.email}`}
                                                className="border border-[#4a4a45] px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-[#ddd] hover:border-white"
                                            >
                                                Email Client
                                            </a>

                                            {whatsappPhone ? (
                                                <a
                                                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                                                        `Hello ${message.name}, this is Utopian Design Studio regarding your project inquiry.`
                                                    )}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border border-[#4a4a45] px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-[#ddd] hover:border-white"
                                                >
                                                    WhatsApp
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>

                                    <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2 lg:grid-cols-4">
                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.14em] text-[#888]">Email</dt>
                                            <dd className="mt-1 text-[#ddd]">{message.email}</dd>
                                        </div>

                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.14em] text-[#888]">Phone</dt>
                                            <dd className="mt-1 text-[#ddd]">{message.phone || '—'}</dd>
                                        </div>

                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.14em] text-[#888]">
                                                Location
                                            </dt>
                                            <dd className="mt-1 text-[#ddd]">{message.location || '—'}</dd>
                                        </div>

                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.14em] text-[#888]">Area</dt>
                                            <dd className="mt-1 text-[#ddd]">{message.area || '—'}</dd>
                                        </div>

                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.14em] text-[#888]">Type</dt>
                                            <dd className="mt-1 text-[#ddd]">{message.project_type || '—'}</dd>
                                        </div>

                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.14em] text-[#888]">Budget</dt>
                                            <dd className="mt-1 text-[#ddd]">{message.budget || '—'}</dd>
                                        </div>

                                        <div>
                                            <dt className="text-[10px] uppercase tracking-[0.14em] text-[#888]">
                                                Timeline
                                            </dt>
                                            <dd className="mt-1 text-[#ddd]">{message.timeline || '—'}</dd>
                                        </div>
                                    </dl>

                                    <div className="mt-6 border-t border-[#3a3a36] pt-5">
                                        <p className="text-[10px] uppercase tracking-[0.14em] text-[#888]">Brief</p>
                                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#ddd]">
                                            {message.message}
                                        </p>
                                    </div>

                                    <form
                                        action={updateMessageStatus}
                                        className="mt-6 grid gap-4 border-t border-[#3a3a36] pt-5 md:grid-cols-[180px_1fr_auto]"
                                    >
                                        <input type="hidden" name="id" value={message.id} />

                                        <div>
                                            <label className="text-[10px] uppercase tracking-[0.14em] text-[#888]">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                defaultValue={message.status || 'new'}
                                                className="mt-2 h-11 w-full border border-[#4a4a45] bg-transparent px-3 text-sm text-white outline-none"
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-[10px] uppercase tracking-[0.14em] text-[#888]">
                                                Admin note
                                            </label>
                                            <input
                                                name="admin_note"
                                                defaultValue={message.admin_note || ''}
                                                className="mt-2 h-11 w-full border border-[#4a4a45] bg-transparent px-3 text-sm text-white outline-none"
                                                placeholder="Internal note"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="self-end bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#181816]"
                                        >
                                            Save
                                        </button>
                                    </form>

                                    <form action={deleteMessage} className="mt-4">
                                        <input type="hidden" name="id" value={message.id} />
                                        <button
                                            type="submit"
                                            className="text-[10px] uppercase tracking-[0.14em] text-red-200 hover:text-red-100"
                                        >
                                            Delete message
                                        </button>
                                    </form>
                                </article>
                            )
                        })}

                        {!messages?.length && !messagesError ? (
                            <div className="border border-[#3a3a36] bg-[#242421] p-8 text-[#aaa]">
                                No messages yet.
                            </div>
                        ) : null}
                    </div>
                </section>

                <section className="mt-16 border-t border-[#3a3a36] pt-10">
                    <div className="flex items-baseline justify-between gap-6">
                        <h2 className="font-[var(--font-manrope)] text-3xl font-medium tracking-[-0.04em]">
                            Journal Subscribers
                        </h2>
                        <p className="text-sm text-[#aaa]">{subscribers?.length || 0} subscribers</p>
                    </div>

                    {subscribersError ? (
                        <p className="mt-6 border border-red-300/30 bg-red-300/10 p-4 text-red-100">
                            Could not load subscribers: {subscribersError.message}
                        </p>
                    ) : null}

                    <div className="mt-6 border border-[#3a3a36] bg-[#242421]">
                        {(subscribers || []).map((subscriber) => (
                            <div
                                key={subscriber.id}
                                className="flex flex-col justify-between gap-2 border-b border-[#3a3a36] p-4 text-sm md:flex-row"
                            >
                                <span>{subscriber.email}</span>
                                <span className="text-[#aaa]">{formatDate(subscriber.created_at)}</span>
                            </div>
                        ))}

                        {!subscribers?.length && !subscribersError ? (
                            <div className="p-6 text-[#aaa]">No subscribers yet.</div>
                        ) : null}
                    </div>
                </section>
            </div>
        </main>
    )
}