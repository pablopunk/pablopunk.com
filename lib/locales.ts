import es from './translations/es.json'

export function _(text: string, locale: string) {
  switch (locale) {
    case 'es':
      if (es[text]) {
        return es[text]
      }
    default:
      return text
  }
}
