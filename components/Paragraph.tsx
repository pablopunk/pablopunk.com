import { Markdown } from 'components/Markdown'
import { FunctionComponent } from 'react'
import type { AlignType } from 'cms/storyblok/types'
import { handlePlaceholders } from 'cms/storyblok/utils'
import { ThemeColor } from 'styles/types'
import classNames from 'classnames'

type Props = {
  text: string
  align?: AlignType
  color?: ThemeColor
  bg?: ThemeColor
  padding?: string
}

export const Paragraph: FunctionComponent<Props> = ({
  text,
  align,
  color,
  bg,
  padding,
}) => {
  const finalText = handlePlaceholders(text)

  return (
    <div
      className={classNames('my-3', {
        'text-accent': color === 'accent',
        'text-accent2': color === 'accent2',
        'text-accent3': color === 'accent3',
        'text-accent-alt': color === 'accent-alt',
        'text-bg': color === 'bg',
        'text-bg2': color === 'bg2',
        'bg-accent': bg === 'accent',
        'bg-accent2': bg === 'accent2',
        'bg-accent3': bg === 'accent3',
        'bg-accent-alt': bg === 'accent-alt',
        'bg-bg': bg === 'bg',
        'bg-bg2': bg === 'bg2',
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
