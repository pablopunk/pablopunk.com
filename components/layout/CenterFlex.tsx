import styled from 'styled-components'
import { smallMediaQuery } from '../utils/media-queries'
import { footerHeight } from './Page'

const Component = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 1rem;
  }
  height: ${100 - footerHeight}vh;
  @media (${smallMediaQuery}) {
    flex-direction: column;
    height: 100%;
    margin-top: 100px;
  }
`

export default Component
