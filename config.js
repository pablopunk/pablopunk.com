const {
  blueGray,
  coolGray,
  fuchsia,
  teal,
  blue,
} = require('tailwindcss/colors')

module.exports = {
  SITE_URL: 'https://pablopunk.com/',
  SITE_NAME: 'Pablo Varela | Freelance Web Developer',
  SITE_DESC:
    'Pablo Varela. Freelance Web Developer. Check out my work or contact me. You can also find me on popular social networks as @pablopunk.',
  SITE_IMAGE:
    'https://a.storyblok.com/f/113260/4108x3448/80929e8406/p1080612.jpg',
  THEME: {
    light: {
      bg: blueGray[50],
      fg: blueGray[700],
      bg2: 'white',
      accent: teal[500],
      accent2: blue[500],
      border: blueGray[200],
    },
    dark: {
      bg: blueGray[900],
      fg: blueGray[100],
      bg2: coolGray[800],
      accent: fuchsia[300],
      accent2: teal[300],
      border: blueGray[800],
    },
  },
}
