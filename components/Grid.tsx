import { FunctionComponent } from 'react'
import { BlokComponent } from 'cms/BlokComponent'

type Props = {
  items: any[]
  cols: string
  colsSm: string
}

export const Grid: FunctionComponent<Props> = ({ items, cols, colsSm }) => {
  const styles = 'grid gap-2 place-content-center'
  let colsStyles = 'grid-cols-2-auto'
  let colsSmStyles = 'grid-cols-1'

  switch (parseInt(cols)) {
    case 1:
      colsStyles = 'md:grid-col-1'
      break
    case 2:
      colsStyles = 'md:grid-cols-2-auto'
      break
    case 3:
      colsStyles = 'md:grid-cols-3-auto'
      break
    case 4:
      colsStyles = 'md:grid-cols-4'
      break
  }

  switch (parseInt(colsSm)) {
    case 1:
      colsSmStyles = 'grid-col-1'
      break
    case 2:
      colsSmStyles = 'grid-cols-2-auto'
      break
    case 3:
      colsSmStyles = 'grid-cols-3-auto'
      break
    case 4:
      colsSmStyles = 'grid-cols-4'
      break
  }

  return (
    <div className={`${styles} ${colsStyles} ${colsSmStyles}`}>
      {items?.map((item) => (
        <div key={item._uid}>
          <BlokComponent blok={item} />
        </div>
      ))}
    </div>
  )
}
