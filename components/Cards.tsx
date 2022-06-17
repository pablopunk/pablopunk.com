import { FunctionComponent } from 'react'
import { BlokComponent } from 'cms/BlokComponent'

type Props = {
  items: any[]
}

export const Cards: FunctionComponent<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 mb-8 md:grid-cols-2">
      {items.map((item) => (
        <div key={item._uid}>
          <BlokComponent blok={item} />
        </div>
      ))}
    </div>
  )
}
