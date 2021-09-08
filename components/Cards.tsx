import { FunctionComponent } from 'react'
import { AnimatedCard } from './AnimatedCard'
import { BlokComponent } from 'cms/BlokComponent'
import { useAppearedOnScreen } from 'hooks/useFirstTimeVisible'

type Props = {
  items: any[]
}

export const Cards: FunctionComponent<Props> = ({ items }) => {
  const [elementRef, appearedOnScreen] = useAppearedOnScreen<HTMLDivElement>()

  return (
    <div
      className="grid grid-cols-1 gap-4 mt-4 mb-8 md:grid-cols-2"
      ref={elementRef}
    >
      {items.map((item, i) => (
        <div key={item._uid}>
          {appearedOnScreen ? (
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
