import React, { FunctionComponent } from 'react'
import { PageProps } from 'types/page'
import { BlokComponent } from 'storyblok/components/BlokComponent'
import useStoryblok from 'storyblok/hooks/useStoryblok'

const Page: FunctionComponent<PageProps> = ({ page }) => {
  const story = useStoryblok(page)

  return (
    <>
      {story.content.body.map((blok) => (
        <BlokComponent blok={blok} key={blok._uid} />
      ))}
    </>
  )
}

export default Page
