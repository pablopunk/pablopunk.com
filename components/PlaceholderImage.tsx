import React from 'react'
import styled from 'styled-components'

export default styled.div<{
  width
  height
  bg
}>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bg};
`
