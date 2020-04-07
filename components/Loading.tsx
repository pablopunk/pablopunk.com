import React from 'react'
import { StyledCircle } from './svg/Styled'

const minRadius = 10
const maxRadius = 20
const size = maxRadius * 2
const step = 0.15

export default () => {
  const [radius, setRadius] = React.useState(minRadius + 1)
  const [growing, setGrowing] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      if (radius <= minRadius) {
        setRadius(radius + step)
        setGrowing(true)
      } else if (radius >= maxRadius) {
        setRadius(radius - step)
        setGrowing(false)
      } else if (growing) {
        setRadius(radius + step)
      } else if (!growing) {
        setRadius(radius - step)
      }
    }, 10)
  })

  return (
    <svg height={size} width={size}>
      <StyledCircle cx={maxRadius} cy={maxRadius} r={radius} />
      <g className="negative">
        <StyledCircle cx={maxRadius} cy={maxRadius} r={minRadius - 1} />
      </g>
    </svg>
  )
}
