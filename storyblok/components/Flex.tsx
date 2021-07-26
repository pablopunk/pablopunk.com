import { FunctionComponent } from 'react'
import { BlokComponent } from './BlokComponent'

type Props = {
  items: any[]
  size: 'sm' | 'md' | 'lg' | 'full'
  justify: 'start' | 'center' | 'end' | 'between'
  align: 'start' | 'center' | 'end'
}

export const Flex: FunctionComponent<Props> = ({
  items,
  size,
  justify,
  align,
}) => {
  const styles = 'flex flex-col md:flex-row'
  let sizeStyle = 'w-full'
  let justifyStyle = 'justify-center'
  let alignStyle = 'align-center'

  switch (size) {
    case 'sm':
      sizeStyle = 'max-w-[200px]'
      break
    case 'md':
      sizeStyle = 'max-w-[400px]'
      break
    case 'lg':
      sizeStyle = 'max-w-[600px]'
      break
    case 'full':
    default:
      sizeStyle = 'w-full'
      break
  }

  switch (justify) {
    case 'start':
      justifyStyle = 'justify-start'
      break
    case 'center':
      justifyStyle = 'justify-center'
      break
    case 'end':
      justifyStyle = 'justify-end'
      break
    case 'between':
      justifyStyle = 'justify-between'
      break
  }

  switch (align) {
    case 'start':
      alignStyle = 'items-start'
      break
    case 'center':
      alignStyle = 'items-center'
      break
    case 'end':
      alignStyle = 'items-end'
      break
  }

  return (
    <div className={`${styles} ${sizeStyle} ${justifyStyle} ${alignStyle}`}>
      {items?.map((item) => (
        <div className="m-1" key={item._uid}>
          <BlokComponent blok={item} />
        </div>
      ))}
    </div>
  )
}
