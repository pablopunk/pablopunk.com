import { Section } from 'components/Section'
import { getAllPostsForLocale } from 'db/supabase/tables/posts'
import { Post } from 'db/supabase/types'
import { pageStaticProps } from 'middleware'
import { GetStaticProps } from 'next'
import React from 'react'
import { PageProps } from 'types/page'
import intlFormatDistance from 'date-fns/intlFormatDistance'
import { useRouter } from 'next/router'

interface Props extends PageProps {
  posts: Post[]
}

export default function Blog({ posts }: Props) {
  const { locale } = useRouter()

  return (
    <Section className="mt-2">
      <h1 className="text-2xl">Blog</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id} className="my-2">
            <a
              href={`/posts/${post.slug}`}
              className="flex bg-neutral-3 p-2 items-center justify-between rounded-lg hover:bg-neutral-4 hover:no-underline"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={post.image}
                  width={50}
                  height={50}
                  alt={post.title}
                  className="rounded-md object-cover w-[50px] h-[50px]"
                />
                <div className="flex flex-col gap-1">
                  <span>{post.title}</span>
                  <span className="italic opacity-80 text-sm">
                    {post.subtitle}
                  </span>
                </div>
              </div>
              <span className="text-xs italic opacity-60 whitespace-nowrap self-start">
                {intlFormatDistance(new Date(post.date), new Date(), {
                  locale,
                })}
              </span>
            </a>
          </li>
        ))}
      </ul>
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
