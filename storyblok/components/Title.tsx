import { FunctionComponent } from 'react'
import { AlignType } from 'storyblok/types'

type Props = {
  blok: {
    text: string
    align: AlignType
  }
}

export const Title: FunctionComponent<Props> = ({ blok }) => {
  let style = ''

  switch (blok.align) {
    case 'left':
      style = 'text-left'
      break
    case 'right':
      style = 'text-right'
      break
    case 'center':
      style = 'text-center'
      break
  }

  return <h1 className={style}>{blok.text}</h1>
}
