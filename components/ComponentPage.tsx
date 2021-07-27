import React, { FunctionComponent } from 'react'
import { PageProps } from 'types/page'
import { BlokComponent } from 'cms/BlokComponent'
import useStoryblok from 'cms/storyblok/hooks/useStoryblok'
import Article from 'components/Article'
import { useRouter } from 'next/router'
import Loading from 'components/Loading'

export const ComponentPage: FunctionComponent<PageProps> = ({ page }) => {
  const story = useStoryblok(page)
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <span className="flex items-center justify-center w-full">
        <Loading />
      </span>
    )
  }

  return (
    <>
      {/* story page */}
      {story.content?.body?.map((blok) => (
        <BlokComponent blok={blok} key={blok._uid} />
      ))}
      {/* story article */}
      {story.content?.content && (
        <Article story={story} translated={page.content.translated} />
      )}
    </>
  )
}
