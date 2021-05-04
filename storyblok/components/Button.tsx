import { FunctionComponent } from 'react'
import { ButtonType } from 'storyblok/types'
import Link from 'next/link'
import { Icon } from './Icon'

type Props = {
  blok: ButtonType
}

export const Button: FunctionComponent<Props> = ({ blok }) => (
  <Link href={blok.link.url}>
    <a
      title={blok.text}
      className="flex items-center justify-evenly cursor-pointer text-accent hover:text-fg bg-bg2 shadow-md px-2 py-1 rounded-md transition-colors border border-bg2"
    >
      <span className="mr-1">
        <Icon name={blok.icon} />
      </span>
      <span>{blok.text}</span>
    </a>
  </Link>
)
