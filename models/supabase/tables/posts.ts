import client from 'models/supabase/client'
import { Post } from '~/models/post'
import { POSTS_TABLE } from 'models/supabase/tables'

export async function getAllPostsForLocale(locale: string, preview: boolean) {
  const result = await client
    .from<Post>(POSTS_TABLE)
    .select(
      'id, date, title, subtitle, locale, slug, translated_slug, body, image, status',
    )
    .match(preview ? {} : { status: 'live' })
    .order('date', { ascending: false })

  if (result.error) {
    console.error(result.error)
    return []
  }

  return result.data
}

export async function getPost(post: Post) {
  const result = await client
    .from<Post>(POSTS_TABLE)
    .select(
      'id, date, title, subtitle, locale, slug, translated_slug, body, image, status',
    )
    .match(post)
    .single()

  if (result.error) {
    console.error(result.error)
    return null
  }

  return result.data
}

export async function insertPost(post: Post) {
  return client.from<Post>(POSTS_TABLE).upsert(post)
}

export async function updatePost(post: Post) {
  return client.from<Post>(POSTS_TABLE).upsert(post)
}

export async function deletePost(post: Post) {
  return client.from<Post>(POSTS_TABLE).delete().match({ id: post.id })
}
