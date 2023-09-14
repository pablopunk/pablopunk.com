import client from 'models/supabase/client'
import { Like, LikeInsert } from '~/models/like'
import { LIKES_TABLE } from 'models/supabase/tables'

export async function getAllLikesForIpAndSlug(slug: string, ip: string) {
  return (await client.from<Like>(LIKES_TABLE).select('id').match({ slug, ip }))
    .data
}

export async function insertLike(like: LikeInsert) {
  return client.from<Like>(LIKES_TABLE).insert(like)
}
