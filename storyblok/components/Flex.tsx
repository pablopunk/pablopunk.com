import { FunctionComponent } from 'react'
import { BlokComponent } from './BlokComponent'

type Props = {
  blok: {
    items: any[]
    size: 'sm' | 'md' | 'lg' | 'full'
  }
}

export const Flex: FunctionComponent<Props> = ({ blok }) => {
  const styles = 'flex justify-center items-center'
  let sizeStyle = 'w-full'

  switch (blok.size) {
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

  return (
    <div className={`${styles} ${sizeStyle}`}>
      {blok.items?.map((item) => (
        <div className="m-1" key={item._uid}>
          <BlokComponent blok={item} />
        </div>
      ))}
    </div>
  )
}
