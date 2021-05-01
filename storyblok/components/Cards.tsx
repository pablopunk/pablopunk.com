import { FunctionComponent } from 'react'
import { BlokComponent } from './BlokComponent'

type Props = {
  blok: {
    items: any[]
  }
}

export const Cards: FunctionComponent<Props> = ({ blok }) => (
  <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    {blok.items.map((item) => (
      <BlokComponent blok={item} key={item._uid} />
    ))}
  </div>
)
