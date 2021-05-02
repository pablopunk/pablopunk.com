import Markdown from 'react-markdown'
import { FunctionComponent } from 'react'
import type { AlignType } from 'storyblok/types'

type Props = {
  blok: {
    text: string
    align?: AlignType
  }
}

export const Paragraph: FunctionComponent<Props> = ({ blok }) => {
  let style = 'my-3'

  switch (blok.align) {
    case 'left':
      style = `${style} text-left`
      break
    case 'right':
      style = `${style} text-right`
      break
    case 'center':
      style = `${style} text-center`
      break
  }

  return (
    <div className={style}>
      <Markdown>{blok.text}</Markdown>
    </div>
  )
}
