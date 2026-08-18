'use server'

import { Resend } from 'resend'
import { contactSchema } from '@/lib/schema'
import { supabase } from '@/lib/supabaseClient'

export async function submitContact(formData) {
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

  // 1) Save in Supabase
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

  // 2) Email you (optional but recommended)
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
    // DB save ho chuka hai — email fail hone par bhi success de sakte ho
  }

  return { success: true }
}