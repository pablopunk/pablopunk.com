import { LIKES_TABLE, useSlugCountInTable } from '@db/supabase/tables'

export default function useLikes(slug: string) {
  return useSlugCountInTable(LIKES_TABLE, slug)
}
