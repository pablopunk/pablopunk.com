import { FunctionComponent } from 'react'
import { AlignType } from 'cms/storyblok/types'
import classNames from 'classnames'

type Props = {
  text: string
  align?: AlignType
  size?: 'lg' | 'md' | 'sm'
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | null
  noMargin?: boolean
}

export const Title: FunctionComponent<Props> = ({
  align,
  size,
  text,
  heading,
  noMargin,
}) => {
  const styles = classNames('font-semibold', {
    'my-2': noMargin !== true,
    'text-lg': size === 'lg',
    'text-2xl': size === 'md',
    'text-4xl': size === 'lg',
    'text-left': align === 'left',
    'text-right': align === 'right',
    'text-center': align === 'center',
  })

  switch (heading) {
    case 'h1':
      return <h1 className={styles}>{text}</h1>
    case 'h2':
      return <h2 className={styles}>{text}</h2>
    case 'h3':
      return <h3 className={styles}>{text}</h3>
    case 'h4':
      return <h4 className={styles}>{text}</h4>
    case 'h5':
      return <h5 className={styles}>{text}</h5>
    case 'h6':
      return <h6 className={styles}>{text}</h6>
  }

  return <h1 className={styles}>{text}</h1>
}
