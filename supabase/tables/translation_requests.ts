import { useEffect, useState } from 'react'
import { useRealtime } from 'react-supabase'
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

export function useTranslationRequestsCount(slug: string) {
  const [count, setCount] = useState(0)
  const [{ data, error }] = useRealtime(TRANSLATION_REQUESTS_TABLE, {
    select: {
      columns: 'id, slug',
      // filter: (query) => query.eq('slug', slug), // there's a bug here so I'll filter them client-side
    },
  })

  useEffect(() => {
    const requestsWithThisSlug = data?.filter((t) => t.slug === slug) || []

    setCount(requestsWithThisSlug.length)
  }, [data])

  if (error) {
    console.error(error)
    return []
  }

  return count
}
