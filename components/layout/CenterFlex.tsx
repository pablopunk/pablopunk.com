import styled from 'styled-components'
import { smallMediaQuery } from '../utils/media-queries'

const Component = styled.div<{
  height?: string
  marginTop?: string
}>`
  position: relative;
  display: flex;
  height: ${({ height }) => height};
  margin-top: ${({ marginTop }) => marginTop};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 1rem;
  }
  @media (${smallMediaQuery}) {
    flex-direction: column;
  }
`
Component.defaultProps = { height: 'inherit', marginTop: 'inherit' }

export default Component
