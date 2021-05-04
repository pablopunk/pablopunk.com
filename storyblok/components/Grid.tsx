import { FunctionComponent } from 'react'
import { BlokComponent } from './BlokComponent'

type Props = {
  blok: {
    items: any[]
    cols: string
    colsSm: string
  }
}

export const Grid: FunctionComponent<Props> = ({ blok }) => {
  const styles = 'grid'
  let cols = 'grid-cols-2'
  let colsSm = 'grid-cols-1'

  switch (parseInt(blok.cols)) {
    case 1:
      cols = 'md:grid-col-1'
      break
    case 2:
      cols = 'md:grid-cols-2'
      break
    case 3:
      cols = 'md:grid-cols-3'
      break
    case 4:
      cols = 'md:grid-cols-4'
      break
  }

  switch (parseInt(blok.colsSm)) {
    case 1:
      colsSm = 'grid-col-1'
      break
    case 2:
      colsSm = 'grid-cols-2'
      break
    case 3:
      colsSm = 'grid-cols-3'
      break
    case 4:
      colsSm = 'grid-cols-4'
      break
  }

  return (
    <div className={`${styles} ${cols} ${colsSm}`}>
      {blok.items?.map((item) => (
        <div className="m-1" key={item._uid}>
          <BlokComponent blok={item} />
        </div>
      ))}
    </div>
  )
}
