import Link from 'next/link'
import styled from 'styled-components'
import { smallMediaQuery } from '../lib/utils'
import CenterFlexColumns from './CenterFlexColumns'

const GiveMeSomeMargin = styled.div`
  margin: 60px 0;
  @media (${smallMediaQuery}) {
    margin: 0;
  }
`

export default () => (
  <GiveMeSomeMargin>
    <CenterFlexColumns>
      <Link href="/">
        <a>
          <h1>Pablo Varela</h1>
        </a>
      </Link>
      <span>Web developer</span>
    </CenterFlexColumns>
  </GiveMeSomeMargin>
)
