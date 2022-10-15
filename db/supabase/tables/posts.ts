import client from 'db/supabase/client'
import { Post } from 'db/supabase/types'
import { POSTS_TABLE } from 'db/supabase/tables'

export async function getAllPostsForLocale(locale: string) {
  return client.from<Post>(POSTS_TABLE).select('id').match({ locale })
}

export async function insertPost(post: Post) {
  return client.from<Post>(POSTS_TABLE).upsert(post)
}

export async function updatePost(post: Post) {
  return client.from<Post>(POSTS_TABLE).upsert(post)
}

export async function deletePost(id: string) {
  return client.from<Post>(POSTS_TABLE).delete().match({ id })
}
