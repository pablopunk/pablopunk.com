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
    ]
  },
}
