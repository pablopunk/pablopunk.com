const cssColors = (selection = []) => {
  const result = {}

  for (const color of selection) {
    for (let i = 1; i <= 10; i++) {
      const shade = `${color}-${i}`
      result[shade] = `var(--color-${shade})`
    }
  }

  return result
}

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.tsx', './components/**/*.tsx', './storyblok/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...cssColors(['primary', 'secondary', 'neutral']),
        danger: 'var(--color-danger)',
      },
      gridTemplateColumns: {
        '2-auto': 'auto auto',
        '3-auto': 'auto auto auto',
        '4-auto': 'auto auto auto auto',
      },
      transitionProperty: {
        width: 'max-width, opacity, margin',
      },
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: 'var(--color-neutral-4)',
    }),
    spacing: {
      0: '0',
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '40px',
      7: '48px',
      8: '56px',
      9: '64px',
      10: '72px',
      11: '88px',
      12: '104px',
      13: '120px',
      14: '424px',
      15: '512px',
      16: '600px',
      17: '688px',
      18: '776px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
