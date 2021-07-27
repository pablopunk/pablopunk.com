import client from 'db/supabase/client'
import { TRANSLATION_REQUESTS_TABLE } from 'db/supabase/tables'
import { TranslationRequest } from 'db/supabase/types'

export async function getAllTranslationRequestsForIpAndSlug({
  ip,
  slug,
}: TranslationRequest) {
  return (
    await client
      .from<TranslationRequest>(TRANSLATION_REQUESTS_TABLE)
      .select('id')
      .match({ ip, slug })
  ).data
}

export async function getAllTranslationRequestsForSlug(slug: string) {
  return (
    await client
      .from<TranslationRequest>(TRANSLATION_REQUESTS_TABLE)
      .select('slug')
      .match({ slug })
  ).data
}

export async function insertTranslationRequest(request: TranslationRequest) {
  return client
    .from<TranslationRequest>(TRANSLATION_REQUESTS_TABLE)
    .insert(request)
}
