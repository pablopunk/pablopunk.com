import React from 'react'
import Repos, { fetchAllReposData } from 'components/data-fetch/Repos'
import NpmCharts, { fetchAllNpmData } from 'components/data-fetch/NpmCharts'
import { _ } from '../lib/locales'
import { getPageStaticProps } from 'storyblok/middleware'

interface IProps {
  locale: string
  initialData: {
    npm: any
    repos: any
  }
}

const Portfolio = ({ initialData, locale }: IProps) => {
  return (
    <>
      <section>
        <h3 className="text-lg text-center">
          {_('Popular npm packages', locale)}
        </h3>
        <NpmCharts initialData={initialData.npm} />
      </section>
      <section>
        <div className="mb-8 text-lg text-center ">change this intro</div>
        <Repos locale={locale} initialData={initialData.repos} />
      </section>
    </>
  )
}

export const getStaticProps = async (ctx) => {
  const sProps = await getPageStaticProps('portfolio', ctx)

  return {
    ...sProps,
    props: {
      ...sProps.props,
      initialData: {
        npm: await fetchAllNpmData(),
        repos: await fetchAllReposData(),
      },
    },
  }
}

export default Portfolio
