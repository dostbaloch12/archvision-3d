'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  clearAdminSession,
  requireAdmin,
  setAdminSession,
  verifyAdminPassword,
} from '@/lib/adminAuth'
import { createSupabaseAdmin } from '@/lib/supabaseAdmin'

export async function loginAdmin(formData) {
  const password = formData.get('password') || ''

  try {
    if (!verifyAdminPassword(password)) {
      redirect('/admin/login?error=invalid')
    }

    setAdminSession()
  } catch (error) {
    console.error('Admin login error:', error)
    redirect('/admin/login?error=config')
  }

  redirect('/admin')
}

export async function logoutAdmin() {
  clearAdminSession()
  redirect('/admin/login')
}

export async function updateMessageStatus(formData) {
  requireAdmin()

  const id = formData.get('id')
  const status = formData.get('status')
  const note = formData.get('admin_note') || ''

  if (!id || !['new', 'contacted', 'closed'].includes(status)) {
    redirect('/admin?error=invalid-status')
  }

  const supabase = createSupabaseAdmin()

  const { error } = await supabase
    .from('contact_messages')
    .update({
      status,
      admin_note: note,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    console.error('Update message status error:', error)
    redirect('/admin?error=update-failed')
  }

  revalidatePath('/admin')
  redirect('/admin?updated=1')
}

export async function deleteMessage(formData) {
  requireAdmin()

  const id = formData.get('id')

  if (!id) {
    redirect('/admin?error=missing-id')
  }

  const supabase = createSupabaseAdmin()

  const { error } = await supabase.from('contact_messages').delete().eq('id', id)

  if (error) {
    console.error('Delete message error:', error)
    redirect('/admin?error=delete-failed')
  }

  revalidatePath('/admin')
  redirect('/admin?deleted=1')
}