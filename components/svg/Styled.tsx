import styled from 'styled-components'
import { themes, themeFill } from '../utils/themes'

const styledFillCss = `
  ${themeFill(themes.light.color2)}
  body.dark & {
    ${themeFill(themes.dark.color2)}
  }

  .negative & {
    ${themeFill(themes.light.color1)}
    body.dark & {
      ${themeFill(themes.dark.color1)}
    }
  }

`

export const StyledRect = styled.rect`
  ${styledFillCss}
`
export const StyledCircle = styled.circle`
  ${styledFillCss}
`
export const StyledPath = styled.path`
  ${styledFillCss}
`
export const StyledG = styled.g`
  ${styledFillCss}
`
export const StyledStop = styled.stop`
  stop-color: ${themes.light.color1};
  .negative & {
    stop-color: ${themes.light.color2};
  }
`
export const StyledStopNegative = styled.stop`
  stop-color: ${themes.dark.color2};
  .negative & {
    stop-color: ${themes.dark.color1};
  }
`
