import React, { useState, useEffect } from 'react'
import { getPageStaticProps, getPosts } from 'cms/middleware'
import { PageProps } from 'types/page'
import { GetStaticProps } from 'next'
import useStoryblok from 'cms/storyblok/hooks/useStoryblok'
import { BlokComponent } from 'cms/BlokComponent'
import { Articles } from 'components/Articles'
import { PostType } from 'cms/storyblok/types'
import { Button } from 'components/Button'
import { _ } from 'locales'
import { fetchMultipleNumberOfVisits } from 'db/goatcounter'
import useSWR from 'swr'

interface Props extends PageProps {
  locale: string
  posts: PostType[]
  visitsCounts: number[]
  total: number
}

const Blog = ({
  page,
  locale,
  posts,
  total,
  visitsCounts: visitsCountsInitial,
}: Props) => {
  const story = useStoryblok(page)
  const [displayedPosts, setDisplayedPosts] = useState(posts)
  const [thereAreMorePosts, setThereAreMorePosts] = useState(
    displayedPosts.length < total,
  )
  const [pagination, setPagination] = useState(2)
  const [loading, setLoading] = useState(false)
  const { data: visitsCounts, revalidate: revalidateVisits } = useSWR<number[]>(
    [displayedPosts],
    fetchMultipleNumberOfVisits,
    {
      initialData: visitsCountsInitial,
    },
  )

  useEffect(() => {
    if (displayedPosts.length === total) {
      setThereAreMorePosts(false)
    }
    revalidateVisits()
  }, [displayedPosts])

  const fetchMorePosts = () => {
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
    <div className="py-4">
      {story.content.body.map((blok) => (
        <BlokComponent blok={blok} key={blok._uid} />
      ))}
      <Articles items={displayedPosts} visits={visitsCounts} />
      {thereAreMorePosts && (
        <div className="flex justify-center">
          <Button
            text={_(loading ? 'Loading' : 'Load more', locale)}
            onClick={fetchMorePosts}
            disabled={loading}
          />
        </div>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const [sProps, postsResults] = await Promise.all([
    getPageStaticProps(ctx, 'blog'),
    getPosts(1, ctx.preview, ctx.locale),
  ])
  const visitsCounts = await fetchMultipleNumberOfVisits(postsResults.posts)

  if (!('props' in sProps) || 'notFound' in sProps) {
    return { notFound: true }
  }

  return {
    ...sProps,
    props: {
      ...sProps.props,
      posts: postsResults.posts,
      visitsCounts,
      total: postsResults.total,
      locale: ctx.locale,
    },
  }
}

export default Blog
