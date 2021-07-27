import { useSpring, animated } from 'react-spring'
import { useEffect } from 'react'

const ANIMATION_OFFSET = 100

export const AnimatedCard = ({ index, children, ...props }) => {
  const [cardEnterStyles, cardEnterAnimation] = useSpring(() => ({
    from: { y: -ANIMATION_OFFSET, opacity: 0 },
  }))
  const cardEnter = () => cardEnterAnimation.start({ to: { y: 0, opacity: 1 } })

  useEffect(() => {
    setTimeout(cardEnter, index * 70)
  }, [])

  return (
    <animated.div style={cardEnterStyles} {...props}>
      {children}
    </animated.div>
  )
}
