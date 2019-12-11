import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    bg: string
    bgDim: string
    bgContrast: string
    fg: string
    fgStrong: string
    fgContrast: string
    fgContrast2: string
  }
}
