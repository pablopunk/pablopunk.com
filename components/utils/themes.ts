export const themes = {
  light: {
    bg: 'white',
    bgDim: 'rgba(0,0,0,0.075)',
    fg: '#2d3436',
    fgStrong: 'black',
    color1: '#6c5ce7',
    color2: '#00cec9',
    blendMode: 'multiply',
  },
  dark: {
    bg: '#010314',
    bgDim: 'rgba(255,255,255,0.15)',
    fg: '#dadada',
    fgStrong: 'white',
    color1: '#f67280',
    color2: '#81ecec',
    blendMode: 'screen',
  },
}

export const transition = '2.5s'

export const themeCss = ({ fg = null, bg = null }) => {
  const css = `
    ${
      fg == null
        ? ''
        : `
      color: ${fg};
    `
    }
    ${
      bg == null
        ? ''
        : `
      background-color: ${bg};
    `
    }
  `

  return (
    css +
    `
    transition: color ${transition}, background-color ${transition};
    `
  )
}

export const basicColors = (theme: 'light' | 'dark') =>
  themeCss({
    fg: themes[theme].fg,
    bg: themes[theme].bg,
  })

export const themeFill = (color: string) => `
  fill: ${color};
  transition: fill ${transition};
`
