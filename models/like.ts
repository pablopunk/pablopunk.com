import { Database } from 'models/supabase/generated-types'
export type Like = Database['public']['Tables']['likes']['Row']
export type LikeInsert = Database['public']['Tables']['likes']['Insert']
