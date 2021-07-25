import client from 'supabase/client'
import { Like } from 'supabase/types'
import { LIKES_TABLE, useSlugCountInTable } from '.'

export function useLikes(slug: string) {
  return useSlugCountInTable(LIKES_TABLE, slug)
}

export async function getAllLikesForIpAndSlug(slug: string, ip: string) {
  return (await client.from<Like>(LIKES_TABLE).select('id').match({ slug, ip }))
    .data
}

export async function insertLike(like: Like) {
  return client.from<Like>(LIKES_TABLE).insert(like)
}
