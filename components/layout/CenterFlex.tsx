import styled from 'styled-components'
import { smallMediaQuery } from '../utils/media-queries'

export default styled.div`
  position: relative;
  display: flex;
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
