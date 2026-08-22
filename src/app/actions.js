'use server'

import { headers } from 'next/headers'
import { contactSchema, journalSchema } from '@/lib/schema'
import { supabase } from '@/lib/supabaseClient'
import { checkRateLimit } from '@/lib/rateLimit'

function getIp() {
  const headersList = headers()
  return headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
}

function formatInquiryMessage(data) {
  return `
New Utopian Design Studio inquiry

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

async function sendWeb3FormsEmail(data) {
  if (!process.env.WEB3FORMS_ACCESS_KEY) {
    return { success: true }
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
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

    const result = await response.json()

    if (!response.ok || !result.success) {
      console.error('Web3Forms error:', result)
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    console.error('Web3Forms request failed:', error)
    return { success: false }
  }
}

export async function submitContact(formData) {
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

  const { error: dbError } = await supabase.from('contact_messages').insert({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    project_type: data.type || null,
    budget: data.budget || null,
    timeline: data.timeline || null,
    location: data.location || null,
    area: data.area || null,
    message: data.message,
  })

  if (dbError) {
    console.error('Supabase contact error:', dbError.message)
    return { success: false, error: 'Could not save your message. Please try again.' }
  }

  const emailResult = await sendWeb3FormsEmail(data)

  if (!emailResult.success) {
    return {
      success: true,
      warning: 'Message saved, but email notification could not be sent.',
    }
  }

  return { success: true }
}

export async function subscribeJournal(formData) {
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

  const { error: dbError } = await supabase
    .from('journal_subscribers')
    .insert({ email: parsed.data.email })

  if (dbError) {
    if (dbError.code === '23505') {
      return { success: true }
    }

    console.error('Supabase journal error:', dbError.message)
    return { success: false, error: 'Could not subscribe. Please try again.' }
  }

  return { success: true }
}
