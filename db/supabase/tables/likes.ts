import client from '~/db/supabase/client'
import { Like } from '~/db/supabase/types'
import { LIKES_TABLE } from '~/db/supabase/tables'

export async function getAllLikesForIpAndSlug(slug: string, ip: string) {
  return (await client.from<Like>(LIKES_TABLE).select('id').match({ slug, ip }))
    .data
}

export async function insertLike(like: Like) {
  return client.from<Like>(LIKES_TABLE).insert(like)
}
