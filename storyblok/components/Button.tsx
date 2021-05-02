import { FunctionComponent } from 'react'
import { ImTwitter, ImInstagram } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'
import { LinkType, ButtonType } from 'storyblok/types'

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case 'twitter':
      return <ImTwitter />
    case 'instagram':
      return <ImInstagram />
    case 'email':
      return <MdEmail />
    default:
      return null
  }
}

type Props = {
  blok: ButtonType
}

export const Button: FunctionComponent<Props> = ({ blok }) => (
  <button
    title={blok.text}
    className="flex items-center justify-evenly cursor-pointer text-accent hover:text-fg bg-bg2 shadow-md px-2 py-1 rounded-md transition-colors border border-bg2"
  >
    <span className="mr-1">
      <Icon name={blok.icon} />
    </span>
    <span>{blok.text}</span>
  </button>
)
