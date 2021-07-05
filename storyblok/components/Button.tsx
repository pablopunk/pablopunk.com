import { FunctionComponent } from 'react'
import { ButtonType } from 'storyblok/types'
import Link from 'next/link'
import { Icon } from './Icon'

type Props = {
  blok: ButtonType
}

export const Button: FunctionComponent<Props> = ({ blok }) => (
  <Link href={blok.link?.url || ''}>
    <a
      title={blok.text}
      className="flex items-center justify-center px-2 py-1 text-xl font-semibold transition-all border rounded-md shadow-md cursor-pointer md:text-md text-fg hover:text-fg hover:shadow-lg bg-bg2 border-bg2"
    >
      <span className="mr-1">
        <Icon name={blok.icon} />
      </span>
      <span>{blok.text}</span>
    </a>
  </Link>
)
