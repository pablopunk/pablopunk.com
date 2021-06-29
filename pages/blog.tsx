import React from 'react'
import { getPageStaticProps, getAllPosts } from 'storyblok/middleware'
import { PageProps } from 'types/page'
import { GetStaticProps } from 'next'
import useStoryblok from 'storyblok/hooks/useStoryblok'
import { BlokComponent } from 'storyblok/components/BlokComponent'
import { Articles } from 'storyblok/components/Articles'
import { PostType } from 'storyblok/types'

interface Props extends PageProps {
  locale: string
  posts: PostType[]
}

const Blog = ({ page, posts }: Props) => {
  const story = useStoryblok(page)

  return (
    <>
      {story.content.body.map((blok) => (
        <BlokComponent blok={blok} key={blok._uid} />
      ))}
      <Articles blok={{ items: posts }} />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const [sProps, posts] = await Promise.all([
    getPageStaticProps(ctx, 'blog'),
    getAllPosts(ctx),
  ])

  if (!('props' in sProps) || 'notFound' in sProps) {
    return { notFound: true }
  }

  return {
    ...sProps,
    props: {
      ...sProps.props,
      posts,
      locale: ctx.locale,
    },
  }
}

export default Blog
