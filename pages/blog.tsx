import React from 'react'
import { getPageStaticProps, getPosts } from 'storyblok/middleware'
import { PageProps } from 'types/page'
import { GetStaticProps } from 'next'
import useStoryblok from 'storyblok/hooks/useStoryblok'
import { BlokComponent } from 'storyblok/components/BlokComponent'
import { Articles } from 'storyblok/components/Articles'
import { PostType } from 'storyblok/types'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from 'storyblok/components/Button'
import { _ } from 'locales'

interface Props extends PageProps {
  locale: string
  posts: PostType[]
  total: number
}

const Blog = ({ page, locale, posts, total }: Props) => {
  const story = useStoryblok(page)
  const [displayedPosts, setDisplayedPosts] = useState(posts)
  const [thereAreMorePosts, setThereAreMorePosts] = useState(
    displayedPosts.length < total,
  )
  const [pagination, setPagination] = useState(2)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (displayedPosts.length === total) {
      setThereAreMorePosts(false)
    }
  }, [displayedPosts])

  const fetchMorePosts = () => {
    console.log('fetching')
    setLoading(true)

    if (thereAreMorePosts && !loading) {
      fetch(`/api/posts?locale=${locale}&page=${pagination}`)
        .then((r) => r.json())
        .then((results) => {
          setDisplayedPosts([...displayedPosts, ...results.posts])
          setPagination(pagination + 1)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <>
      {story.content.body.map((blok) => (
        <BlokComponent blok={blok} key={blok._uid} />
      ))}
      <Articles items={displayedPosts} />
      {thereAreMorePosts && (
        <div className="flex justify-center">
          <Button
            text={_(loading ? 'Loading' : 'Load more', locale)}
            onClick={fetchMorePosts}
            disabled={loading}
          />
        </div>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const [sProps, postsResults] = await Promise.all([
    getPageStaticProps(ctx, 'blog'),
    getPosts(1, ctx.preview, ctx.locale),
  ])

  if (!('props' in sProps) || 'notFound' in sProps) {
    return { notFound: true }
  }

  return {
    ...sProps,
    props: {
      ...sProps.props,
      posts: postsResults.posts,
      total: postsResults.total,
      locale: ctx.locale,
    },
  }
}

export default Blog
