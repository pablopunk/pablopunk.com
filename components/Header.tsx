import Link from 'next/link'
import styled from 'styled-components'
import CenterFlex from './CenterFlex'
import { smallMediaQuery } from '../lib/utils'

const GiveMeSomeMargin = styled.div`
  margin: 60px 0;
  @media(${smallMediaQuery}) {
    margin: 0;
  }
`

export default () => (
  <CenterFlex>
    <GiveMeSomeMargin>
      <Link href="/">
        <a><h1>Pablo Varela</h1></a>
      </Link>
    </GiveMeSomeMargin>
  </CenterFlex>
)