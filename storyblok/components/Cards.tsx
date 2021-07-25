import { FunctionComponent } from 'react'
import { useVisible } from 'react-hooks-visible'
import { AnimatedCard } from './AnimatedCard'
import { BlokComponent } from './BlokComponent'

type Props = {
  items: any[]
}

export const Cards: FunctionComponent<Props> = ({ items }) => {
  const [elementRef, isVisible] = useVisible<HTMLDivElement>()

  return (
    <div
      className="grid grid-cols-1 gap-4 mt-4 mb-8 md:grid-cols-2"
      ref={elementRef}
    >
      {items.map((item, i) => (
        <div key={item._uid}>
          {isVisible ? (
            <AnimatedCard index={i}>
              <BlokComponent blok={item} />
            </AnimatedCard>
          ) : (
            <BlokComponent blok={item} />
          )}
        </div>
      ))}
    </div>
  )
}
