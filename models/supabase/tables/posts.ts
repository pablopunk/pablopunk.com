import { Post } from '~/models/post'
import { POSTS_TABLE } from 'models/supabase/tables'
import { getSupabaseServerClient } from '../client/server'
import type { GetServerSidePropsContext } from 'next'

export async function getAllPostsForLocale(
  ctx: GetServerSidePropsContext,
  _locale: string,
  preview: boolean,
) {
  const result = await getSupabaseServerClient(ctx)
    .from<Post>(POSTS_TABLE)
    .select(
      'id, date, title, subtitle, locale, slug, translated_slug, body, image, status',
    )
    // TODO: add locale when it's supported
    .match(preview ? {} : { status: 'live' })
    .order('date', { ascending: false })

  if (result.error) {
    console.error(result.error)
    return []
  }

  return result.data
}

export async function getPost(
  ctx: GetServerSidePropsContext,
  post: Partial<Post>,
) {
  const result = await getSupabaseServerClient(ctx)
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

export async function insertPost(ctx: GetServerSidePropsContext, post: Post) {
  return getSupabaseServerClient(ctx).from<Post>(POSTS_TABLE).upsert(post)
}

export async function updatePost(ctx: GetServerSidePropsContext, post: Post) {
  return getSupabaseServerClient(ctx).from<Post>(POSTS_TABLE).upsert(post)
}

export async function deletePost(ctx: GetServerSidePropsContext, post: Post) {
  return getSupabaseServerClient(ctx)
    .from<Post>(POSTS_TABLE)
    .delete()
    .match({ id: post.id })
}
