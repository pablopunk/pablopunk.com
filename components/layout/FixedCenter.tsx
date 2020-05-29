import styled from 'styled-components'
import { footerHeight } from 'components/layout/Page'
import { smallMediaQuery } from 'components/utils/media-queries'

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${100 - footerHeight}vh;
`
