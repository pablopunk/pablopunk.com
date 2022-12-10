import { Section } from '@components/Section'
import { getAllPostsForLocale } from '@db/supabase/tables/posts'
import { Post } from '@db/supabase/types'
import { pageStaticProps } from '@middleware'
import { GetStaticProps } from 'next'
import React from 'react'
import { PageProps } from '@types/page'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Visits } from '@components/Visits'

interface Props extends PageProps {
  posts: Post[]
}

const FeaturedImage = ({ post }: { post: Post }) => (
  <img
    src={post.image}
    width="70px"
    alt={post.title}
    className="rounded-md object-cover w-[70px]"
  />
)

const Post = ({ post }: { post: Post }) => (
  <a
    href={`/posts/${post.slug}`}
    className="flex gap-2 bg-neutral-2 p-2 items-center justify-between rounded-lg hover:bg-neutral-3 dark:border hover:no-underline"
  >
    <div className="flex gap-3 items-center">
      <div className="hidden md:flex min-w-[70px]">
        <FeaturedImage post={post} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="flex gap-2">
          <h2>{post.title}</h2>
          <div className="hidden md:flex">
            <Visits post={post} size="xs" />
          </div>
        </span>
        <span className="italic opacity-80 text-sm">{post.subtitle}</span>
      </div>
    </div>
    <div className="flex flex-col justify-between text-xs italic opacity-50 self-start">
      <span className="whitespace-nowrap">
        {formatDistanceToNow(new Date(post.date))}
      </span>
    </div>
  </a>
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
  const { data: posts, error } = await getAllPostsForLocale(
    ctx.locale,
    ctx.preview,
  )

  if (error) {
    console.error(error)
  }

  return {
    ...pageProps,
    props: {
      ...pageProps.props,
      posts,
    },
  }
}
