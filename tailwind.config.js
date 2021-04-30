const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
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
