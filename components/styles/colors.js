const colors = {
  bodyBg: { dark: '#0e141f', light: 'white' },
  bodyFont: { dark: '#dfe6e9', light: '#636e72' },
  link: { dark: '#ff7674', light: '#ff7674' },
  primary: { dark: '#00cec9', light: '#00cec9' }
}

export default function (theme = 'dark') {
  return Object.keys(colors).reduce((acc, curr) => ({ ...acc, [curr]: colors[curr][theme] }), {})
}

export function toggleTheme (theme = 'dark') {
  if (theme === 'dark') {
    window.location.search = '?theme=light'
  } else {
    window.location.search = ''
  }
}
