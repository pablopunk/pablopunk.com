const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      fg: 'var(--color-fg)',
      bg: 'var(--color-bg)',
      bg2: 'var(--color-bg2)',
      accent: 'var(--color-accent)',
      accent2: 'var(--color-accent2)',
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
