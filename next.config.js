const { locales } = require('./lib/locales')

module.exports = {
  env: {
    DATOCMS_API_TOKEN: process.env.DATOCMS_API_TOKEN,
  },
  i18n: {
    locales,
    defaultLocale: 'en',
  },
}
