import Markdown from 'components/Markdown'
import { FunctionComponent } from 'react'
import type { AlignType } from 'storyblok/types'
import { handlePlaceholders } from 'storyblok/utils'

type Props = {
  text: string
  align?: AlignType
}

export const Paragraph: FunctionComponent<Props> = ({ text, align }) => {
  const finalText = handlePlaceholders(text)
  let style = 'my-3'

  switch (align) {
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
      <Markdown>{finalText}</Markdown>
    </div>
  )
}
