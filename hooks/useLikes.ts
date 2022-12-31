import { LIKES_TABLE, useSlugCountInTable } from '~/supabase/tables'

export default function useLikes(slug: string) {
  return useSlugCountInTable(LIKES_TABLE, slug)
}
