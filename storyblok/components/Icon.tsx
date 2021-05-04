import { FunctionComponent } from 'react'
import { ImTwitter, ImInstagram } from 'react-icons/im'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiNextDotJs, SiGraphql } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'

type Props = {
  name: string
  size?: string
}

export const Icon: FunctionComponent<Props> = ({ name, size = '1rem' }) => {
  let Component = null
  switch (name) {
    case 'twitter':
      Component = ImTwitter
      break
    case 'instagram':
      Component = ImInstagram
      break
    case 'email':
      Component = MdEmail
      break
    case 'react':
      Component = FaReact
      break
    case 'nodejs':
      Component = FaNodeJs
      break
    case 'nextjs':
      Component = SiNextDotJs
      break
    case 'graphql':
      Component = SiGraphql
      break
  }

  return <Component size={size} />
}
