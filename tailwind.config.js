const colors = require('tailwindcss/colors')

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
      indigo: colors.violet,
      green: colors.teal,
      gray: colors.gray,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
