'use server'

import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { contactSchema, journalSchema } from '@/lib/schema'

const REQUEST_LIMIT_WINDOW = 60_000
const REQUEST_LIMIT_MAX = 3
const rateStore = new Map()

function checkRateLimit(identifier) {
  const now = Date.now()
  const record = rateStore.get(identifier)

  if (!record || now - record.start > REQUEST_LIMIT_WINDOW) {
    rateStore.set(identifier, { count: 1, start: now })
    return { allowed: true }
  }

  if (record.count >= REQUEST_LIMIT_MAX) {
    return { allowed: false }
  }

  record.count += 1
  return { allowed: true }
}

function getIp() {
  try {
    const headersList = headers()
    return headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  } catch {
    return 'unknown'
  }
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return {
      client: null,
      error: 'Supabase environment variables are missing.',
    }
  }

  if (!url.startsWith('https://')) {
    return {
      client: null,
      error: 'Supabase URL must start with https://',
    }
  }

  try {
    return {
      client: createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }),
      error: '',
    }
  } catch (error) {
    return {
      client: null,
      error: error.message || 'Could not create Supabase client.',
    }
  }
}

function formatInquiryMessage(data) {
  return `
New Utopian Design Studio inquiry

Reply to client: ${data.email}

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || '—'}
Project Type: ${data.type || '—'}
Budget: ${data.budget || '—'}
Timeline: ${data.timeline || '—'}
Location: ${data.location || '—'}
Approx. Area: ${data.area || '—'}

Brief:
${data.message}
`
}

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timeout`)), ms)
    }),
  ])
}

async function sendWeb3FormsEmail(data) {
  if (!process.env.WEB3FORMS_ACCESS_KEY) {
    return { success: true }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `New Utopian Design Studio Inquiry — ${data.name}`,
        from_name: 'Utopian Design Studio Website',
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        project_type: data.type || '',
        budget: data.budget || '',
        timeline: data.timeline || '',
        location: data.location || '',
        area: data.area || '',
        message: formatInquiryMessage(data),
      }),
    })

    clearTimeout(timeout)

    const result = await response.json()

    if (!response.ok || !result.success) {
      console.error('Web3Forms error:', result)
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    clearTimeout(timeout)
    console.error('Web3Forms request failed:', error)
    return { success: false }
  }
}

export async function submitContact(formData) {
  try {
    const ip = getIp()
    const { allowed } = checkRateLimit(`contact-${ip}`)

    if (!allowed) {
      return { success: false, error: 'Too many requests. Please try again in a minute.' }
    }

    const honeypot = formData.get('website')
    if (honeypot) {
      return { success: true }
    }

    const raw = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      type: formData.get('type') || '',
      budget: formData.get('budget') || '',
      timeline: formData.get('timeline') || '',
      location: formData.get('location') || '',
      area: formData.get('area') || '',
      message: formData.get('message') || '',
    }

    const parsed = contactSchema.safeParse(raw)

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message || 'Invalid form data',
      }
    }

    const data = parsed.data
    const { client, error: clientError } = getSupabaseClient()

    if (!client) {
      return {
        success: false,
        error: clientError || 'Database connection failed.',
      }
    }

    const { error: dbError } = await withTimeout(
      client.from('contact_messages').insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        project_type: data.type || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        location: data.location || null,
        area: data.area || null,
        message: data.message,
      }),
      10000,
      'Database insert'
    )

    if (dbError) {
      console.error('Supabase contact error:', dbError)
      return {
        success: false,
        error: `Database error: ${dbError.message}`,
      }
    }

    const emailResult = await sendWeb3FormsEmail(data)

    if (!emailResult.success) {
      return {
        success: true,
        warning: 'Message saved, but email notification could not be sent.',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('submitContact fatal error:', error)

    return {
      success: false,
      error: error.message || 'Server error. Please try again.',
    }
  }
}

export async function subscribeJournal(formData) {
  try {
    const ip = getIp()
    const { allowed } = checkRateLimit(`journal-${ip}`)

    if (!allowed) {
      return { success: false, error: 'Too many requests. Please wait a minute.' }
    }

    const parsed = journalSchema.safeParse({
      email: formData.get('email') || '',
    })

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message || 'Invalid email',
      }
    }

    const { client, error: clientError } = getSupabaseClient()

    if (!client) {
      return {
        success: false,
        error: clientError || 'Database connection failed.',
      }
    }

    const { error: dbError } = await withTimeout(
      client.from('journal_subscribers').insert({ email: parsed.data.email }),
      10000,
      'Journal insert'
    )

    if (dbError) {
      if (dbError.code === '23505') {
        return { success: true }
      }

      console.error('Supabase journal error:', dbError)
      return { success: false, error: `Database error: ${dbError.message}` }
    }

    return { success: true }
  } catch (error) {
    console.error('subscribeJournal fatal error:', error)

    return {
      success: false,
      error: error.message || 'Server error. Please try again.',
    }
  }
}