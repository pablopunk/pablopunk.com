import styled from 'styled-components'

const styledFillCss = `
  fill: var(--color-accent2);
  transition: fill var(--transition-time);

  .negative & {
    fill: var(--color-accent);
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
  stop-color: var(--color-accent);
  .negative & {
    stop-color: var(--color-accent2);
  }
`
export const StyledStopNegative = styled.stop`
  stop-color: var(--color-accent2);
  .negative & {
    stop-color: var(--color-accent);
  }
`
