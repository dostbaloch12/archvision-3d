import { encryptText, hashValue, verifyFormToken } from '@/lib/crypto'
import { getServerSecrets } from '@/lib/env'
import {
  getIp,
  isRateLimited,
  isSameOrigin,
  json,
  pick,
  validateBrief,
  validateJournal,
} from '@/lib/security'
import { createPublicClient } from '@/lib/supabase/public'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function sendMail({ subject, name, replyTo, message, extras }) {
  const { web3formsKey } = getServerSecrets()
  if (!web3formsKey) {
    return { ok: false, error: 'Email is not configured.' }
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: web3formsKey,
      subject,
      name,
      email: replyTo,
      replyto: replyTo,
      message,
      from_name: 'ArchVision 3D',
      ...extras,
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok || data.success === false) {
    return { ok: false, error: 'The mail service rejected this message.' }
  }
  return { ok: true }
}

export async function POST(request) {
  try {
    if (!isSameOrigin(request)) {
      return json({ error: 'Forbidden' }, 403)
    }

    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return json({ error: 'Unsupported content type.' }, 415)
    }

    const ip = getIp(request)
    if (isRateLimited(ip)) {
      return json({ error: 'Too many messages. Please wait a few minutes.' }, 429, {
        'Retry-After': '120',
      })
    }

    const raw = await request.json().catch(() => null)
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return json({ error: 'Invalid payload.' }, 400)
    }

    const intent = String(raw.intent || 'brief')

    if (intent === 'journal') {
      const parsed = validateJournal(pick(raw, ['email', 'token', 'website']))
      if (parsed.honeypot) {
        return json({ ok: true })
      }
      if (parsed.error) {
        return json({ error: parsed.error }, 400)
      }

      const token = verifyFormToken(parsed.token)
      if (!token.ok) {
        return json({ error: token.error }, 400)
      }

      const supabase = createPublicClient()
      const { error } = await supabase.from('subscribers').insert({
        email_enc: encryptText(parsed.email),
        email_hash: hashValue(parsed.email),
      })

      if (error && error.code !== '23505') {
        return json({ error: 'Could not save the subscription.' }, 502)
      }

      const mailed = await sendMail({
        subject: 'ArchVision 3D — journal subscriber',
        name: 'Journal',
        replyTo: parsed.email,
        message: 'A reader asked to receive the journal.',
        extras: { Source: 'Footer journal' },
      })

      if (!mailed.ok) {
        return json({ error: mailed.error }, 502)
      }

      return json({ ok: true })
    }

    if (intent !== 'brief') {
      return json({ error: 'Unknown request.' }, 400)
    }

    const parsed = validateBrief(
      pick(raw, [
        'name',
        'email',
        'phone',
        'type',
        'budget',
        'timeline',
        'location',
        'area',
        'message',
        'token',
        'website',
      ])
    )

    if (parsed.honeypot) {
      return json({ ok: true })
    }
    if (parsed.error) {
      return json({ error: parsed.error }, 400)
    }

    const token = verifyFormToken(parsed.form.token)
    if (!token.ok) {
      return json({ error: token.error }, 400)
    }

    const form = parsed.form
    const supabase = createPublicClient()
    const { error } = await supabase.from('inquiries').insert({
      name: form.name,
      email_enc: encryptText(form.email),
      phone_enc: form.phone ? encryptText(form.phone) : null,
      type: form.type,
      budget: form.budget,
      timeline: form.timeline,
      location: form.location,
      area: form.area || null,
      message_enc: encryptText(form.message),
      ip_hash: hashValue(ip),
      status: 'new',
    })

    if (error) {
      return json({ error: 'Could not save the brief.' }, 502)
    }

    const mailed = await sendMail({
      subject: `New brief — ${form.name} — ${form.type}`,
      name: form.name,
      replyTo: form.email,
      message: [
        'A new commission brief arrived from the website.',
        '',
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || '—'}`,
        `Discipline: ${form.type}`,
        `Budget: ${form.budget}`,
        `Timeline: ${form.timeline}`,
        `Site: ${form.location}${form.area ? ` · ${form.area}` : ''}`,
        '',
        'Brief:',
        form.message,
      ].join('\n'),
      extras: {
        Discipline: form.type,
        Budget: form.budget,
        Timeline: form.timeline,
        Location: form.location,
      },
    })

    if (!mailed.ok) {
      return json({ error: mailed.error }, 502)
    }

    return json({ ok: true })
  } catch {
    return json({ error: 'Could not send the message. Please try again.' }, 500)
  }
}