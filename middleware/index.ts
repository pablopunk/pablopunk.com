import { GetStaticPropsContext } from 'next'
import { PageProps } from 'types/page'
import { i18nStaticProps } from './i18n'

export async function pageStaticProps(ctx: GetStaticPropsContext): Promise<{
  props: PageProps
}> {
  const { translations } = await i18nStaticProps(ctx)

  return {
    props: {
      translations,
    },
  }
}
