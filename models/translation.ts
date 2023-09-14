import { Database } from 'models/supabase/generated-types'
export type Translation = Database['public']['Tables']['i18n']['Row']
export type TranslationInsert = Database['public']['Tables']['i18n']['Insert']
