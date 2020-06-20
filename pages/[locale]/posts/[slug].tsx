import React from 'react'
import { staticPaths } from 'components/data/withCMS'
import { getAllPostsWithSlug, getPostBySlug } from 'lib/api'
import withLayout from 'components/layout/withLayout'
import styled from 'styled-components'
import Link from 'next/link'
import { t } from 'lib/locales'
import { NextSeo } from 'next-seo'
import { smallMediaQuery } from 'components/utils/media-queries'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PlaceholderImage from 'components/PlaceholderImage'

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--color-bg);

  p {
    text-align: justify;
  }

  .body {
    width: 100%;
    max-width: 600px;
  }

  figure,
  img {
    width: 100%;
    border-radius: var(--space-2);
  }

  img {
    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
  }

  pre {
    font-family: 'SF Mono', Menlo, monospace;
    background-color: var(--color-bgDim);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--space-1);
    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
    overflow-x: scroll;
  }

  code {
    color: var(--color-accent);
    font-family: Menlo, monospace;
    font-size: 85%;
  }

  strong {
    color: var(--color-accent);
  }

  em {
    color: var(--color-accent2);
  }

  small {
    opacity: 0.8;
  }

  h1 {
    text-align: center;
  }
`

const FakeImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: var(--color-bgDim);
`

const formatDate = (d) => new Date(d).toLocaleDateString()

const Page = ({ post, locale, ...rest }) => {
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
              url: post.image.responsiveImage.src,
              alt: post.image.responsiveImage.alt,
            },
          ],
          site_name: 'pablo.pink',
        }}
      />
      <Link as={`/${locale}/blog`} href="/[locale]/blog">
        <a>
          <span style={{ marginRight: '1rem' }}>⬅️</span>
          <span>{t('Go back', locale)}</span>
        </a>
      </Link>
      <StyledArticle>
        {post.image?.responsiveImage?.src && (
          <figure>
            <LazyLoadImage
              src={post.image.responsiveImage.src}
              alt={post.image.responsiveImage.alt}
              title={post.image.responsiveImage.title}
              placeholder={
                <PlaceholderImage
                  height="300px"
                  width="100%"
                  bg={post.image.responsiveImage.bgColor}
                />
              }
            />
          </figure>
        )}
        <small>
          Pablo Varela - <time>{formatDate(post.date)}</time>
        </small>
        <h1>{post.title}</h1>
        <div className="body" dangerouslySetInnerHTML={{ __html: post.body }} />
      </StyledArticle>
    </>
  )
}

export const getStaticProps = async ({ params, preview = false }) => {
  const data = await getPostBySlug(params.slug, params.locale, preview)

  return {
    props: {
      ...data,
      post: data.post,
      locale: params.locale,
    },
  }
}

export const getStaticPaths = async () => {
  const localePaths = await staticPaths()
  const postsByLocale: any = {}

  for (const p of localePaths.paths) {
    const posts = await getAllPostsWithSlug(p.params.locale)
    postsByLocale[p.params.locale] = posts
  }

  const allPaths = { fallback: false, paths: [] }

  for (const locale in postsByLocale) {
    const posts = postsByLocale[locale]
    for (const post of posts) {
      allPaths.paths.push({
        params: {
          locale,
          slug: post.slug,
        },
      })
    }
  }

  return allPaths
}

export default withLayout(Page, 'blog')
