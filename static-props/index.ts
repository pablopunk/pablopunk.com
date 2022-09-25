import { GetStaticPropsContext } from 'next'
import { PageProps } from 'types/page'
import { i18nStaticProps } from './i18n'

export async function pageStaticProps(ctx: GetStaticPropsContext): Promise<{
  props: PageProps
}> {
  return {
    props: {
      ...(await i18nStaticProps(ctx)),
    },
  }
}
