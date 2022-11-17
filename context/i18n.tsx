import { i18n } from '@next.config'
import { createContext } from 'react'
import { PageProps } from '@types/page'

export const I18NContext = createContext({
  translations: {},
  locale: i18n.defaultLocale,
})

export const I18NProvider = ({
  translations,
  locale,
  children,
}: {
  translations: PageProps['translations']
  locale: string
  children: any
}) => {
  return (
    <I18NContext.Provider value={{ translations, locale }}>
      {children}
    </I18NContext.Provider>
  )
}
