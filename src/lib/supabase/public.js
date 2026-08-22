import { createClient } from '@supabase/supabase-js'
import { getPublicEnv } from '@/lib/env'

export function createPublicClient() {
  const { supabaseUrl, supabaseAnonKey } = getPublicEnv()

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
