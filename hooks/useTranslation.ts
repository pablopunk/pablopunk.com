import { I18NContext } from '~/context/i18n'
import { Translation } from '~/supabase/types'
import { i18n } from '~/next.config'
import { useContext } from 'react'
import { SITE_URL } from 'config'

let missingTranslations: { [key: string]: Translation } = {}
let scheduleTimeout: any
const scheduleRequestForMissingTranslations = () => {
  if (Object.keys(missingTranslations).length > 0 && scheduleTimeout) {
    clearTimeout(scheduleTimeout)
  }
  scheduleTimeout = setTimeout(() => {
    fetch(SITE_URL + '/api/dev/missing-translations', {
      method: 'POST',
      body: JSON.stringify({
        translations: Object.values(missingTranslations),
      }),
    }).then((r) => {
      if (r.status === 200) {
        missingTranslations = {}
      }
    })
  }, 3000)
}

const markTranslationAssMissing = (key: string, locale: string) => {
  missingTranslations[key + ':' + locale] = { key, locale }
  scheduleRequestForMissingTranslations()
}

export function useTranslation() {
  const { translations, locale } = useContext(I18NContext)

  return {
    _(key: string) {
      if (locale === i18n.defaultLocale) {
        return key
      }

      if (!key || !translations) {
        return key
      }

      const value = translations[key]

      if (!value) {
        markTranslationAssMissing(key, locale)
        return key
      }

      return value
    },
  }
}
