import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { Database } from '../generated-types'

export const useBrowserSupabaseClient = () => {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>(),
  )

  return supabaseClient
}
