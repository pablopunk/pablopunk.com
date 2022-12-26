import { useAppearedOnScreen } from '~/hooks/useFirstTimeVisible'
import { FunctionComponent, ReactElement } from 'react'

type Props = {
  Placeholder?: ReactElement
}

/**
 * This component won't render until it's been scrolled on screen.
 * BUT it can still render props.Placeholder whatever you pass to make up space for it.
 */
const RenderOnFirstAppearance: FunctionComponent<Props> = (props) => {
  const [elementRef, appearedOnScreen] = useAppearedOnScreen<HTMLDivElement>()
  return (
    <div ref={elementRef}>
      {appearedOnScreen && props.children}
      {!appearedOnScreen && props.Placeholder && (
        <div style={{ opacity: 0 }}>
          {/* this block is transparent but it "reserves" the
           /* space that it will take the above */}
          {props.Placeholder}
        </div>
      )}
    </div>
  )
}

export default RenderOnFirstAppearance
