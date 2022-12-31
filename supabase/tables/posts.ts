import client from '~/supabase/client'
import { Post } from '~/supabase/types'
import { POSTS_TABLE } from '~/supabase/tables'

export async function getAllPostsForLocale(locale: string, preview: boolean) {
  const result = await client
    .from<Post>(POSTS_TABLE)
    .select(
      'id, date, title, subtitle, locale, slug, translated_slug, body, image, status',
    )
    // TODO: add match for locale when it's supported
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
