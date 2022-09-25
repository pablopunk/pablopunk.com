import { Provider } from 'react-supabase'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

const client = supabaseClient

export default client

export function SupabaseProvider({ children }) {
  return <Provider value={client}>{children}</Provider>
}
