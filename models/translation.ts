import { Database } from 'models/supabase/generated-types'
export type Translation = Database['public']['Tables']['i18n']['Row']
