import React from 'react'
import { staticPaths } from 'components/data/withCMS'
import { getAllPostsWithSlug, getPostBySlug } from 'lib/api'
import withLayout from 'components/layout/withLayout'
import { basicColors } from 'components/utils/themes'
import styled from 'styled-components'

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
  }

  figure,
  img {
    width: 100%;
  }
`

const Page = ({ post }) => {
  return (
    <>
      <StyledArticle>
        <h1>{post.title}</h1>
        <figure>
          <img src={post.image.url} alt={post.image.alt} />
        </figure>
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
