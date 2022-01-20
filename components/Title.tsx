import { FunctionComponent } from 'react'
import { AlignType } from 'cms/storyblok/types'

type Props = {
  text: string
  align?: AlignType
  size?: 'lg' | 'md' | 'sm'
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | null
  color?: 'accent' | 'accent2' | 'accent3' | 'accent-alt' | 'fg'
}

export const Title: FunctionComponent<Props> = ({
  align,
  size,
  color,
  text,
  heading,
}) => {
  let style = 'my-2 font-semibold'

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

  switch (size) {
    case 'sm':
      style = `${style} text-lg`
      break
    case 'md':
      style = `${style} text-2xl`
      break
    case 'lg':
      style = `${style} text-4xl mt-5`
      break
  }

  switch (color) {
    case 'accent':
      style = `${style} text-accent`
      break
    case 'accent2':
      style = `${style} text-accent2`
      break
    case 'accent3':
      style = `${style} text-accent3`
      break
    case 'accent-alt':
      style = `${style} text-accent-alt`
      break
    case 'fg':
      style = `${style} text-fg`
      break
  }

  switch (heading) {
    case 'h1':
      return <h1 className={style}>{text}</h1>
    case 'h2':
      return <h2 className={style}>{text}</h2>
    case 'h3':
      return <h3 className={style}>{text}</h3>
    case 'h4':
      return <h4 className={style}>{text}</h4>
    case 'h5':
      return <h5 className={style}>{text}</h5>
    case 'h6':
      return <h6 className={style}>{text}</h6>
  }

  return <h1 className={style}>{text}</h1>
}
