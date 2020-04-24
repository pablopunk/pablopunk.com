import CenterFlex from '../components/layout/CenterFlex'
import { basicColors } from '../components/utils/themes'
import styled from 'styled-components'

const StyledDiv = styled.div`
  ${basicColors('light')}
  body.dark {
    ${basicColors('dark')}
  }
`

export default (...props) => (
  <CenterFlex height="90vh">
    <h1>404</h1>
  </CenterFlex>
)
