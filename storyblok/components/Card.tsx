import { FunctionComponent } from 'react'
import HomeCard from 'components/pure/HomeCard'
import type { LinkType } from 'storyblok/types'

type Props = {
  blok: {
    title: string
    description: string
    image: any
    link: LinkType
    tags: string[]
  }
}

export const Card: FunctionComponent<Props> = ({ blok }) => (
  <HomeCard
    title={blok.title}
    description={blok.description}
    img={blok.image}
    link={blok.link.url}
    tags={blok.tags}
  />
)
