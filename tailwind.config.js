module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.tsx', './components/**/*.tsx', './storyblok/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fg: 'var(--color-fg)',
        bg: 'var(--color-bg)',
        bg2: 'var(--color-bg2)',
        accent: 'var(--color-accent)',
        accent2: 'var(--color-accent2)',
      },
      gridTemplateColumns: {
        '2-auto': 'auto auto',
        '3-auto': 'auto auto auto',
        '4-auto': 'auto auto auto auto',
      },
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: 'var(--color-border)',
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
