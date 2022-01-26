import { FunctionComponent } from 'react'
import { BlokComponent } from 'cms/BlokComponent'
import classNames from 'classnames'

type Props = {
  items: any[]
  size: 'sm' | 'md' | 'lg' | 'full'
  justify: 'start' | 'center' | 'end' | 'between'
  align: 'start' | 'center' | 'end'
  direction: 'row' | 'column'
  stack: boolean
  gap: string
}

export const Flex: FunctionComponent<Props> = ({
  items,
  size,
  justify,
  align,
  direction,
  stack,
  gap = '1',
}) => {
  if (items?.filter(Boolean)?.length < 1) {
    return null
  }

  const styles = 'flex md:flex-row'

  return (
    <div
      className={classNames(styles, {
        'flex-col': stack,
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
        'gap-0': gap === '0',
        'gap-1': gap === '1',
        'gap-2': gap === '2',
        'gap-3': gap === '3',
        'gap-4': gap === '4',
        'gap-5': gap === '5',
        'gap-6': gap === '6',
        'gap-7': gap === '7',
      })}
    >
      {items?.map((item) => (
        <BlokComponent blok={item} key={item._uid} />
      ))}
    </div>
  )
}
