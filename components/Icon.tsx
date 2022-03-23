import { FunctionComponent } from 'react'
import { ImTwitter, ImInstagram } from 'react-icons/im'
import { FaReact, FaNodeJs, FaCamera } from 'react-icons/fa'
import { SiNextDotJs, SiGraphql, SiGithub } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'
import { BiArrowBack, BiHeart, BiRss } from 'react-icons/bi'

type Props = {
  name: string
  size?: string
}

export const Icon: FunctionComponent<Props> = ({ name, size = '1em' }) => {
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
    case 'github':
      Component = SiGithub
      break
    case 'back':
      Component = BiArrowBack
      break
    case 'rss':
      Component = BiRss
      break
    case 'camera':
      Component = FaCamera
      break
    case 'heart':
      Component = () => <BiHeart className="text-red-500" />
      break
  }

  if (!Component) {
    return null
  }

  return <Component size={size} />
}
