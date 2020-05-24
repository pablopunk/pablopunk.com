export const themes = {
  light: {
    bg: 'white',
    bgDim: '#f8f8f8',
    fg: '#2d3436',
    fgStrong: 'black',
    color1: '#6c5ce7',
    color2: '#00cec9',
    blendMode: 'multiply',
  },
  dark: {
    bg: 'black',
    bgDim: '#050505',
    fg: '#dadada',
    fgStrong: 'white',
    color1: '#f67280',
    color2: '#81ecec',
    blendMode: 'screen',
  },
}

export const transition = '0.4s'

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
