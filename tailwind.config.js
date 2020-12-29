const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      pink: colors.pink,
      red: colors.red,
      indigo: colors.fuchsia,
      green: colors.teal,
      gray: colors.gray,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        a: { color: theme('colors.green.500') },
      })
    }),
  ],
}
