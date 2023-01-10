import { Section } from '~/components/Section'
import { getAllPostsForLocale } from 'models/supabase/tables/posts'
import { Post } from '~/models/post'
import { pageStaticProps } from '~/middleware'
import { GetStaticProps } from 'next'
import React from 'react'
import { PageProps } from '~/types/page'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Visits } from '~/components/Visits'
import Link from 'next/link'

interface Props extends PageProps {
  posts: Post[]
}

const FeaturedImage = ({ post }: { post: Post }) => (
  <img
    src={post.image}
    width="70px"
    alt={post.title}
    className="rounded-md object-cover w-[70px] flex shadow-md dark:border"
  />
)

const Post = ({ post }: { post: Post }) => (
  <Link
    href={`/posts/${post.slug}`}
    className="flex gap-2 p-2 items-center justify-between rounded-lg hover:bg-neutral-2 hover:no-underline"
  >
    <div className="flex gap-3 items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <span className="flex gap-2">
          <h2>{post.title}</h2>
          <div className="hidden md:flex">
            <Visits post={post} size="xs" />
          </div>
        </span>
        <span className="capitalize whitespace-nowrap text-xs text-neutral-7">
          {formatDistanceToNow(new Date(post.date))}
        </span>
        <span className="font-normal opacity-80 text-sm">{post.subtitle}</span>
      </div>
      <div className="hidden md:flex min-w-[70px]">
        <FeaturedImage post={post} />
      </div>
    </div>
  </Link>
)

const PostsList = ({ posts }: { posts: Post[] }) => (
  <ul>
    {posts?.map((post) => (
      <li key={post.id} className="my-2">
        <Post post={post} />
      </li>
    ))}
  </ul>
)

export default function Blog({ posts }: Props) {
  return (
    <Section className="mt-2">
      <h1 className="text-2xl">Blog</h1>
      <PostsList posts={posts} />
    </Section>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pageProps = await pageStaticProps(ctx)
  const posts = await getAllPostsForLocale(ctx.locale, ctx.preview)

  return {
    ...pageProps,
    props: {
      ...pageProps.props,
      posts,
    },
  }
}
