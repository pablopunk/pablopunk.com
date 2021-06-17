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

const formatDate = (d) => new Date(d).toLocaleDateString().replace(/-/g, '/')

const Page = ({ post }) => {
  const { locale } = useRouter()

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        openGraph={{
          title: post.title,
          description: post.description,
          images: [
            {
              url: post.image.url,
              alt: post.image.alt,
            },
          ],
          site_name: 'pablopunk.com',
        }}
      />
      <Article>
        <Link href="/blog">
          <a className="flex items-center px-2 py-1 my-3 rounded shadow-md bg-bg2">
            <IoIosArrowBack />
            {_('Go back', locale)}
          </a>
        </Link>
        {post.image?.url ? (
          <figure>
            <Image
              src={post.image.url}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              placeholder="blur"
              blurDataURL={post.image.blurUpThumb}
            />
            <h1>{post.title}</h1>
          </figure>
        ) : (
          <h1>{post.title}</h1>
        )}
        <small>
          Pablo Varela - <time>{formatDate(post.date)}</time>
        </small>
        <div className="body" dangerouslySetInnerHTML={{ __html: post.body }} />
      </Article>
    </>
  )
}

export const getStaticProps = async ({ params, preview = false, locale }) => {
  const data = await getPostBySlug(params.slug, locale, preview)

  return {
    props: {
      ...data,
      post: data.post,
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
