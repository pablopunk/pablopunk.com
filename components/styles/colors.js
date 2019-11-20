import sick from 'sick-colors'

const colors = {
  bodyBg: { dark: sick.background, light: sick.light.background },
  bodyFont: { dark: sick.foreground, light: sick.light.foreground },
  link: { dark: sick.green, light: sick.light.green },
  primary: { dark: sick.magenta, light: sick.light.cyan },
  title: { dark: sick.white, light: sick.light.magenta }
}

export default function(theme = 'dark') {
  return Object.keys(colors).reduce(
    (acc, curr) => ({ ...acc, [curr]: colors[curr][theme] }),
    {}
  )
}

export function toggleTheme(theme = 'dark') {
  if (theme === 'dark') {
    window.location.search = '?theme=light'
  } else {
    window.location.search = ''
  }
}
