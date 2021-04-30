import { FunctionComponent } from 'react'
import { ImTwitter, ImInstagram } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'

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
  blok: {
    text?: string
    type?: 'social'
    icon?: string
  }
}

export const Button: FunctionComponent<Props> = ({ blok }) => (
  <button title={blok.text} className="flex items-center justify-evenly">
    <span className="mr-1">
      <Icon name={blok.icon} />
    </span>
    <span>{blok.text}</span>
  </button>
)
