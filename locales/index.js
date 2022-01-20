const es = require('./translations/es.json')

module.exports = {
  _(text, locale) {
    switch (locale) {
      case 'es':
        if (es[text]) {
          return es[text]
        }
      default:
        return text
    }
  },
  locales: ['en', 'es'],
  DEFAULT_LOCALE: 'en',
}
