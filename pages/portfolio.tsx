import React from 'react'
import Repos, { fetchAllReposData } from 'components/Repos'
import NpmCharts, { fetchAllNpmData } from 'components/NpmCharts'
import { _ } from '../locales'
import { getPageStaticProps } from 'cms/middleware'
import { PageProps } from 'types/page'
import { GetStaticProps } from 'next'
import { Title } from 'components/Title'
import { CMSPage } from 'components/CMSPage'

interface Props extends PageProps {
  locale: string
  initialData: {
    npm: any
    repos: any
  }
}

const Portfolio = ({ initialData, locale, page }: Props) => {
  return (
    <>
      <CMSPage page={page} />
      <section>
        <Title
          text={_('Popular NPM packages', locale)}
          size={'md'}
          heading={'h2'}
          align={'center'}
        />
        <NpmCharts initialData={initialData.npm} />
      </section>
      <section>
        <Title
          text={_('Featured repos', locale)}
          size={'md'}
          heading={'h2'}
          align={'center'}
        />
        <Repos locale={locale} initialData={initialData.repos} />
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const sProps = await getPageStaticProps(ctx, 'portfolio')

  if (!('props' in sProps) || 'notFound' in sProps) {
    return { notFound: true }
  }

  return {
    ...sProps,
    props: {
      ...sProps.props,
      initialData: {
        npm: await fetchAllNpmData(),
        repos: await fetchAllReposData(),
      },
      locale: ctx.locale,
    },
  }
}

export default Portfolio
