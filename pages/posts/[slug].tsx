import React from 'react'
import { getAllPostsWithSlug, getPostBySlug } from 'lib/api'
import withLayout from 'components/skeleton/withLayout'
import Link from 'next/link'
import { _ } from 'lib/locales'
import { NextSeo } from 'next-seo'
import Article from 'components/pure/Article'
import { IoIosArrowBack } from 'react-icons/io'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { ExtendedStory } from '@prezly/sdk/dist/types'

const formatDate = (d) => new Date(d).toLocaleDateString().replace(/-/g, '/')

const Page = ({ post }: { post: ExtendedStory }) => {
  const { locale } = useRouter()

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.subtitle}
        openGraph={{
          title: post.title,
          description: post.subtitle,
          images: [
            {
              url: post.header_image,
              alt: post.title,
            },
          ],
          site_name: 'pablopunk.com',
        }}
      />
      <Article>
        <Link as={`/${locale}/blog`} href="/[locale]/blog">
          <a className="bg-bg2 px-2 py-1 my-3 rounded flex items-center shadow-md">
            <IoIosArrowBack />
            {_('Go back', locale)}
          </a>
        </Link>
        {post.oembed?.thumbnail_url ? (
          <figure>
            <Image
              src={post.oembed.thumbnail_url}
              alt={post.title}
              width={post.oembed.thumbnail_width}
              height={post.oembed.thumbnail_height}
            />
            <h1>{post.title}</h1>
          </figure>
        ) : (
          <h1>{post.title}</h1>
        )}
        <small>
          Pablo Varela - <time>{formatDate(post.published_at)}</time>
        </small>
        <div
          className="body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Article>
    </>
  )
}

export const getStaticProps = async ({ params, preview = false, locale }) => {
  const post = await getPostBySlug(params.slug, locale, preview)

  return {
    props: {
      post,
      locale,
    },
  }
}

export const getStaticPaths = async ({ locales }) => {
  const postsByLocale = {}

  for (const locale of locales) {
    const posts = await getAllPostsWithSlug(locale)
    postsByLocale[locale] = posts
  }

  const allPaths = { fallback: false, paths: [] }

  for (const locale in postsByLocale) {
    const posts = postsByLocale[locale]
    for (const post of posts) {
      allPaths.paths.push({
        locale,
        params: {
          slug: post.slug,
        },
      })
    }
  }

  return allPaths
}

export default withLayout(Page, 'blog')
