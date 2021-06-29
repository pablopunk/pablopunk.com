import React, { FunctionComponent } from 'react'
import { PageProps } from 'types/page'
import { BlokComponent } from 'storyblok/components/BlokComponent'
import useStoryblok from 'storyblok/hooks/useStoryblok'
import Article from 'components/pure/Article'

const Page: FunctionComponent<PageProps> = ({ page }) => {
  const story = useStoryblok(page)

  return (
    <>
      {/* story page */}
      {story.content?.body?.map((blok) => (
        <BlokComponent blok={blok} key={blok._uid} />
      ))}
      {/* story article */}
      {story.content?.content && <Article story={story} />}
    </>
  )
}

export default Page
