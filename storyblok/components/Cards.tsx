import { FunctionComponent } from 'react'
import { BlokComponent } from './BlokComponent'

type Props = {
  items: any[]
}

export const Cards: FunctionComponent<Props> = ({ items }) => (
  <div className="grid grid-cols-1 gap-4 mt-4 mb-8 md:grid-cols-2">
    {items.map((item) => (
      <BlokComponent blok={item} key={item._uid} />
    ))}
  </div>
)
