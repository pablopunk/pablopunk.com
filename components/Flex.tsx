import { FunctionComponent } from 'react'
import { BlokComponent } from 'cms/BlokComponent'
import classNames from 'classnames'

type Props = {
  items: any[]
  size: 'sm' | 'md' | 'lg' | 'full'
  justify: 'start' | 'center' | 'end' | 'between'
  align: 'start' | 'center' | 'end'
  direction: 'row' | 'column'
}

export const Flex: FunctionComponent<Props> = ({
  items,
  size,
  justify,
  align,
  direction,
}) => {
  if (items?.filter(Boolean)?.length < 1) {
    return null
  }

  const styles = 'flex flex-col md:flex-row gap-1'

  return (
    <div
      className={classNames(styles, {
        'md:flex-col': direction === 'column',
        'justify-start': justify === 'start',
        'justify-center': justify === 'center',
        'justify-end': justify === 'end',
        'justify-between': justify === 'between',
        'align-start': align === 'start',
        'align-center': align === 'center',
        'align-end': align === 'end',
        'max-w-[200px]': size === 'sm',
        'max-w-[400px]': size === 'md',
        'max-w-[600px]': size === 'lg',
        'w-full': size === 'full' || size == null,
      })}
    >
      {items?.map((item) => (
        <BlokComponent blok={item} key={item._uid} />
      ))}
    </div>
  )
}
