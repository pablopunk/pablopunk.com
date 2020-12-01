import React from 'react'
import { getAllPostsWithSlug, getPostBySlug } from 'lib/api'
import withLayout from 'components/skeleton/withLayout'
import Link from 'next/link'
import { _ } from 'lib/locales'
import { NextSeo } from 'next-seo'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Article from 'components/pure/Article'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useRouter } from 'next/router'

const { i18n } = require('../../next.config')

const formatDate = (d) => new Date(d).toLocaleDateString().replace(/-/g, '/')

const Page = ({ post, ...rest }) => {
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
      <br />
      <Link as={`/${locale}/blog`} href="/[locale]/blog">
        <a>
          <IoMdArrowRoundBack />
          <span>{_('Go back', locale)}</span>
        </a>
      </Link>
      <Article>
        {post.image?.url ? (
          <figure>
            <LazyLoadImage
              src={post.image.url}
              alt={post.image.alt}
              title={post.image.title}
              placeholder={
                <img src={post.image.blurUpThumb} alt={post.image.alt} />
              }
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
