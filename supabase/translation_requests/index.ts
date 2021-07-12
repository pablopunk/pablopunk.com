import client from 'supabase/client'
import { TRANSLATION_REQUESTS_TABLE } from 'supabase/tables'
import { TranslationRequest } from 'supabase/types'

export async function getAllTranslationRequestsForIpAndSlug({
  ip,
  slug,
}: TranslationRequest) {
  return (
    await client
      .from<TranslationRequest>(TRANSLATION_REQUESTS_TABLE)
      .select('*')
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
