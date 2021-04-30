import Markdown from 'react-markdown'
import { FunctionComponent } from 'react'

type Props = {
  blok: {
    text: string
  }
}

export const Paragraph: FunctionComponent<Props> = ({ blok }) => (
  <Markdown>{blok.text}</Markdown>
)
