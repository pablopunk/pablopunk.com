import styled from 'styled-components'
import { smallMediaQuery } from 'components/utils/media-queries'

export default styled.div<{ columns?: number; small?: number }>`
  display: grid;
  grid-template-columns: ${(props) =>
    new Array(props.columns || 4).fill('1fr').join(' ')};
  grid-gap: 20px;
  @media (${smallMediaQuery}) {
    grid-template-columns: ${(props) =>
      new Array(props.small || 2).fill('1fr').join(' ')};
    justify-content: center;
  }
  margin-top: 2rem;
  margin-bottom: 4rem;
`
