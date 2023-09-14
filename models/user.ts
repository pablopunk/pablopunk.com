import { Database } from 'models/supabase/generated-types'
export type User = Database['public']['Views']['users']['Row']
export type UserInsert = Database['public']['Views']['users']['Insert']
