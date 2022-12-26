import {
  TRANSLATION_REQUESTS_TABLE,
  useSlugCountInTable,
} from '~/db/supabase/tables'

export default function useTranslationRequestsCount(slug: string) {
  return useSlugCountInTable(TRANSLATION_REQUESTS_TABLE, slug)
}
