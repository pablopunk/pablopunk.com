import Link from 'next/link'
import styled from 'styled-components'
import CenterFlex from './CenterFlex'

export default () => (
  <CenterFlex style={{ margin: '90px 0' }}>
    <Link href="/">
      <a><h1>Pablo Varela</h1></a>
    </Link>
  </CenterFlex>
)