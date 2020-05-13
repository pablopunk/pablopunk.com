import styled from 'styled-components'
import { smallMediaQuery } from 'components/utils/media-queries'
import { footerHeight } from 'components/layout/Page'

interface IProps {
  column?: boolean
  free?: boolean
  marginTop?: string
  alwaysFill?: boolean
  onlyBig?: boolean
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
  ${(props) =>
    props.alwaysFill
      ? ''
      : `
      @media (${smallMediaQuery}) {
        flex-direction: column;
        ${props.alwaysFill ? '' : 'height: 100%;'}
        margin-top: ${props.marginTop ?? '100px'};
      }
    `}
    ${(props) =>
      props.onlyBig
        ? `
      @media(${smallMediaQuery}) {
        display: block
      }
      `
        : ''}
`

export default Component
