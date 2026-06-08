import { createClient, type SupabaseClientOptions } from '@supabase/supabase-js'
import { env } from '../config/env.js'

export const createSupabaseClient = (accessToken?: string) => {
  const options: SupabaseClientOptions<'public'> = {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }

  if (accessToken) {
    options.global = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, options)
}

export const supabase = createSupabaseClient()
