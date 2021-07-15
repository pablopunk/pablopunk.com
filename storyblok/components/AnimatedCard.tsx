import { useSpring, animated } from 'react-spring'
import { useEffect } from 'react'
import { useVisible } from 'react-hooks-visible'

const ANIMATION_OFFSET = 100
export const AnimatedCard = ({ index, children, ...props }) => {
  const [cardRef, isVisible] = useVisible<HTMLDivElement>()
  const [cardEnterStyles, cardEnterAnimation] = useSpring(() => ({
    from: { y: -ANIMATION_OFFSET, opacity: 0 },
  }))
  const cardEnter = () => cardEnterAnimation.start({ to: { y: 0, opacity: 1 } })

  useEffect(() => {
    if (isVisible) {
      setTimeout(cardEnter, index * 70)
    }
  }, [isVisible])

  return (
    <animated.div style={cardEnterStyles} {...props} ref={cardRef}>
      {children}
    </animated.div>
  )
}
