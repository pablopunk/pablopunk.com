import { Markdown } from 'components/Markdown'
import { FunctionComponent } from 'react'
import type { AlignType } from 'cms/storyblok/types'
import { handlePlaceholders } from 'cms/storyblok/utils'
import classNames from 'classnames'

type Props = {
  text: string
  align?: AlignType
  padding?: string
}

export const Paragraph: FunctionComponent<Props> = ({
  text,
  align,
  padding,
}) => {
  const finalText = handlePlaceholders(text)

  return (
    <div
      className={classNames('my-3', {
        'text-center': align === 'center',
        'text-right': align === 'right',
        'text-left': align === 'left',
        'px-2 py-1': padding === '1',
        'px-3 py-2': padding === '2',
        'px-4 py-3': padding === '3',
        'px-3 py-4': padding === '4',
      })}
    >
      <Markdown>{finalText}</Markdown>
    </div>
  )
}
