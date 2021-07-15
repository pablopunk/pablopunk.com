import { useSpring, animated } from 'react-spring'
import { useVisible } from 'react-hooks-visible'
import { useEffect } from 'react'

const ANIMATION_OFFSET = 100
export const AnimatedCard = ({ index, children, ...props }) => {
  const [cardEnterStyles, cardEnterAnimation] = useSpring(() => ({
    from: { y: -ANIMATION_OFFSET, opacity: 0 },
  }))
  const cardEnter = () => cardEnterAnimation.start({ to: { y: 0, opacity: 1 } })
  const [cardRef, isVisible] = useVisible<HTMLDivElement>()

  useEffect(() => {
    if (isVisible) {
      setTimeout(cardEnter, index * 70)
    }
  }, [isVisible])

  return (
    <animated.div style={cardEnterStyles} ref={cardRef} {...props}>
      {children}
    </animated.div>
  )
}
