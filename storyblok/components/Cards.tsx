import { FunctionComponent } from 'react'
import { BlokComponent } from './BlokComponent'

type Props = {
  blok: {
    items: any[]
  }
}

export const Cards: FunctionComponent<Props> = ({ blok }) => (
  <div className="grid grid-cols-1 gap-4 mt-3 mb-8 md:grid-cols-2">
    {blok.items.map((item) => (
      <BlokComponent blok={item} key={item._uid} />
    ))}
  </div>
)
