import additionalTranslations from './additional-translations.json'

export function _(text: string, locale: string) {
  if (additionalTranslations[text]?.[locale]) {
    return additionalTranslations[text]?.[locale]
  }

  return text
}
