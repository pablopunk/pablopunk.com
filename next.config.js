const { locales } = require('./lib/locales')

module.exports = {
  env: {
    DATOCMS_API_TOKEN: process.env.DATOCMS_API_TOKEN,
  },
  i18n: {
    locales,
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/(es|en)/count.js',
        destination: 'https://gc.zgo.at/count.js',
        locale: false,
      },
      {
        source: '/(es|en)/goat',
        destination: 'https://pablopunk.goatcounter.com/count',
        locale: false,
      },
      {
        source: '/cv',
        destination: 'https://cv.pablopunk.com',
      },
      {
        source: '/books',
        destination:
          'https://www.notion.so/Books-9de297d7668e4498a9769421d29889b8',
      },
      {
        source: '/illustrations',
        destination:
          'https://www.notion.so/pablopunk/Drawings-0c241704f0ea48d39591ca3bf1483966',
      },
      {
        source: '/drawings',
        destination:
          'https://www.notion.so/pablopunk/Drawings-0c241704f0ea48d39591ca3bf1483966',
      },
      {
        source: '/photos',
        destination: 'https://www.pexels.com/@pablopunk',
      },
    ]
  },
}
