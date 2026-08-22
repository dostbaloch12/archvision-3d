import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getPublicEnv } from '@/lib/env'

export function createServerSupabase() {
  const cookieStore = cookies()
  const { supabaseUrl, supabaseAnonKey } = getPublicEnv()
  const secure = process.env.NODE_ENV === 'production'

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookieOptions: {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
    },
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value
      },
      set(name, value, options) {
        try {
          cookieStore.set({
            name,
            value,
            ...options,
            httpOnly: true,
            secure,
            sameSite: 'lax',
            path: '/',
          })
        } catch {
          // Server Components cannot always set cookies. Middleware refreshes the session.
        }
      },
      remove(name, options) {
        try {
          cookieStore.set({
            name,
            value: '',
            ...options,
            httpOnly: true,
            secure,
            sameSite: 'lax',
            path: '/',
            maxAge: 0,
          })
        } catch {
          // See set()
        }
      },
    },
  })
}

export async function getAdminUser() {
  const supabase = createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { supabase, user: null, isAdmin: false }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  return {
    supabase,
    user,
    isAdmin: profile?.role === 'admin',
  }
}
