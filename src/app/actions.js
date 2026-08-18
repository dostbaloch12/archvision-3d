'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/schema'
import { supabase } from '@/lib/supabaseClient'
import { checkRateLimit } from '@/lib/rateLimit'

export async function submitContact(formData) {
  // Rate limiting by IP
  const headersList = headers()
  const ip = headersList.get('x-forwarded-for') || 'unknown'
  const { allowed } = checkRateLimit(ip)

  if (!allowed) {
    return { success: false, error: 'Too many requests. Please try again in a minute.' }
  }

  // Honeypot check (bot protection) — add a hidden field named "website" in your form
  const honeypot = formData.get('website')
  if (honeypot) {
    return { success: true } // silently drop bot submissions
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
    console.error('Supabase error:', dbError)
    return { success: false, error: 'Could not save your message. Try again.' }
  }

  try {
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'ArchVision <onboarding@resend.dev>',
        to: process.env.CONTACT_TO_EMAIL,
        reply_to: data.email,
        subject: `New inquiry — ${data.name}`,
        html: `
          <h2>New ArchVision inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || '—'}</p>
          <p><strong>Type:</strong> ${data.type || '—'}</p>
          <p><strong>Budget:</strong> ${data.budget || '—'}</p>
          <p><strong>Timeline:</strong> ${data.timeline || '—'}</p>
          <p><strong>Location:</strong> ${data.location || '—'}</p>
          <p><strong>Area:</strong> ${data.area || '—'}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      })
    }
  } catch (err) {
    console.error('Email error:', err)
  }

  return { success: true }
}