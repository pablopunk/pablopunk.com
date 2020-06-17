import React from 'react'
import { staticPaths } from 'components/data/withCMS'
import { getAllPostsWithSlug, getPostBySlug } from 'lib/api'
import withLayout from 'components/layout/withLayout'
import { basicColors } from 'components/utils/themes'
import styled from 'styled-components'
import Link from 'next/link'
import { t } from 'lib/locales'
import { NextSeo } from 'next-seo'

const StyledArticle = styled.article`
  margin-top: var(--space-6);
  display: flex;
  flex-direction: column;
  align-items: center;

  ${basicColors('light')}

  body.dark & {
    ${basicColors('dark')}
  }

  p {
    max-width: 600px;
    text-align: justify;
  }

  figure,
  img {
    width: 100%;
    border-radius: var(--space-2);
  }

  figcaption {
    text-align: center;
    font-style: italic;
  }

  pre {
    font-family: 'SF Mono', Menlo, monospace;
    background-color: var(--color-bgDim);
    padding: var(--space-1) var(--space-2);
  }

  code {
    color: var(--color-accent);
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
              url: post.image.url,
              alt: post.image.alt,
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
        <small>
          <time>{formatDate(post.date)}</time>
        </small>
        <h1>{post.title}</h1>
        {post.image?.url && (
          <figure>
            <img src={post.image.url} alt={post.image.alt} />
            {post.image?.title && (
              <figcaption>
                <small>{post.image.title}</small>
              </figcaption>
            )}
          </figure>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
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
