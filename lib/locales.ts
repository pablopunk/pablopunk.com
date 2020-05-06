import additionalTranslations from './additional-translations.json'

export default ['en', 'es']

export function t(text: string, locale: string) {
  if (additionalTranslations[text]?.[locale]) {
    return additionalTranslations[text]?.[locale]
  }

  return text
}
