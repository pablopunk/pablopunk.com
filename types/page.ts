import { Translation } from '~/supabase/types'

export interface PageProps {
  statusCode?: string
  translations: { [key: Translation['key']]: Translation['value'] }
}
