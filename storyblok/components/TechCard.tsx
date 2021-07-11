import { FunctionComponent } from 'react'
import type { LinkType } from 'storyblok/types'
import Link from 'next/link'
import { Icon } from './Icon'

type Props = {
  name: string
  icon: string
  link: LinkType
}

export const TechCard: FunctionComponent<Props> = ({ name, icon, link }) => (
  <Link href={link.url}>
    <a>
      <Icon name={icon} size="100px" />
      <h2>{name}</h2>
    </a>
  </Link>
)
