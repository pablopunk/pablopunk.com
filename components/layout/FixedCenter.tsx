import styled from 'styled-components'
import { smallMediaQuery } from 'components/utils/media-queries'

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--footer-height) - var(--nav-height));
  @media (${smallMediaQuery}) {
    height: calc(100vh - var(--nav-height));
  }
`
