import client from 'db/supabase/client'
import { Post } from 'db/supabase/types'
import { POSTS_TABLE } from 'db/supabase/tables'

export async function getAllPostsForLocale(locale: string, preview: boolean) {
  return (
    client
      .from<Post>(POSTS_TABLE)
      .select(
        'id, date, title, subtitle, locale, slug, translated_slug, body, image, status',
      )
      // .match({ locale, status: preview ? undefined : 'live' }) // TODO support locales
      .match({ status: preview ? undefined : 'live' })
      .order('date', { ascending: false })
  )
}

export async function getPost(post: Post) {
  return client
    .from<Post>(POSTS_TABLE)
    .select(
      'id, date, title, subtitle, locale, slug, translated_slug, body, image, status',
    )
    .match(post)
    .single()
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
