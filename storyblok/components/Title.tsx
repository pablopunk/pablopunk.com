import { FunctionComponent } from 'react'
import { AlignType } from 'storyblok/types'

type Props = {
  blok: {
    text: string
    align: AlignType
    size: 'lg' | 'md' | 'sm'
    heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }
}

export const Title: FunctionComponent<Props> = ({ blok }) => {
  let style = 'text-lg'

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

  switch (blok.size) {
    case 'sm':
      style = `${style} text-md`
      break
    case 'md':
      style = `${style} text-lg`
      break
    case 'lg':
      style = `${style} text-xl`
      break
  }

  switch (blok.heading) {
    case 'h1':
      return <h1 className={style}>{blok.text}</h1>
    case 'h2':
      return <h2 className={style}>{blok.text}</h2>
    case 'h3':
      return <h3 className={style}>{blok.text}</h3>
    case 'h4':
      return <h4 className={style}>{blok.text}</h4>
    case 'h5':
      return <h5 className={style}>{blok.text}</h5>
    case 'h6':
      return <h6 className={style}>{blok.text}</h6>
  }

  return <h1 className={style}>{blok.text}</h1>
}
