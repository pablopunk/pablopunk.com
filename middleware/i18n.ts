import { getAllTranslationsForLocale } from '~/db/supabase/tables/i18n'
import { GetStaticPropsContext } from 'next'
import { PageProps } from '~/types/page'

export async function i18nStaticProps(ctx: GetStaticPropsContext) {
  const translationsArray = await getAllTranslationsForLocale(ctx.locale)
  const translationsMap: PageProps['translations'] = translationsArray.reduce(
    (acc, curr) => {
      // @ts-ignore
      acc[curr.key] = curr.value
      return acc
    },
    {} as PageProps['translations'],
  )

  return {
    translations: translationsMap,
  }
}
