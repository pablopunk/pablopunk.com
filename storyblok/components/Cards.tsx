import { FunctionComponent } from 'react'
import { AnimatedCard } from './AnimatedCard'
import { BlokComponent } from './BlokComponent'

type Props = {
  items: any[]
}

export const Cards: FunctionComponent<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 mb-8 md:grid-cols-2">
      {items.map((item, i) => (
        <div key={item._uid}>
          <AnimatedCard index={i}>
            <BlokComponent blok={item} />
          </AnimatedCard>
        </div>
      ))}
    </div>
  )
}
