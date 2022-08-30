import React from 'react'
import { Repos } from 'components/Repos'
import { NpmCharts, fetchAllNpmData } from 'components/NpmCharts'
import { _ } from '../locales'
import { PageProps } from 'types/page'
import { GetStaticProps } from 'next'
import { getFromCache } from 'db/redis'
import { getReposApiResponse } from './api/repos'
import { JAMStack } from 'components/JAMStack'

interface Props extends PageProps {
  locale: string
  initialData: {
    npm: any
    repos: any
  }
}

const Portfolio = ({ initialData, locale }: Props) => {
  return (
    <div className="mt-5">
      <h1>{_('The power of JAMStack', locale)}</h1>
      <p className="text-center mt-1">
        With JAMStack you get the best of dynamic React components and the speed
        of static HTML content
      </p>
      <JAMStack />
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
          noMargin
        />
        <Repos locale={locale} initialData={initialData.repos} />
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const npm = await getFromCache('npm', fetchAllNpmData)
  const repos = await getFromCache('repos', getReposApiResponse)

  return {
    props: {
      initialData: {
        npm,
        repos,
      },
      locale: ctx.locale,
    },
  }
}

export default Portfolio
