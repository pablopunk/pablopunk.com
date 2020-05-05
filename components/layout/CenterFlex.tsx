import styled from 'styled-components'
import { smallMediaQuery } from '../utils/media-queries'
import { footerHeight } from './Page'

interface IProps {
  column?: boolean
  free?: boolean
  marginTop?: string
}

const Component = styled.div<IProps>`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
  & > * {
    margin: 1rem;
  }
  ${(props) => (props.free ? '' : `height: ${100 - footerHeight}vh;`)}
  @media (${smallMediaQuery}) {
    flex-direction: column;
    height: 100%;
    margin-top: ${(props) => props.marginTop ?? '100px'};
  }
`

export default Component
