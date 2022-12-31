import React from 'react'
import { Repos } from '~/components/Repos'
import { NpmCharts, fetchAllNpmData } from '~/components/NpmCharts'
import { PageProps } from '~/types/page'
import { GetStaticProps } from 'next'
import { getFromCache } from '~/redis'
import { getReposApiResponse } from './api/repos'
import { Section } from '~/components/Section'
import { T } from '~/components/T'
import { pageStaticProps } from '~/middleware'

interface Props extends PageProps {
  locale: string
  initialData: {
    npm: any
    repos: any
  }
}

const Portfolio = ({ initialData }: Props) => {
  return (
    <>
      <Section>
        <h2 className="text-xl font-bold">
          <T>Popular NPM packages</T>
        </h2>
        <NpmCharts initialData={initialData.npm} />
      </Section>
      <Section>
        <h2 className="text-xl font-bold">
          <T>Featured repos</T>
        </h2>
        <Repos initialData={initialData.repos} />
      </Section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const npm = await getFromCache('npm', fetchAllNpmData)
  const repos = await getFromCache('repos', getReposApiResponse)
  const pageProps = await pageStaticProps(ctx)

  if ('redirect' in pageProps || 'notFound' in pageProps) {
    return pageProps
  }

  return {
    props: {
      ...pageProps.props,
      initialData: {
        npm,
        repos,
      },
      locale: ctx.locale,
    },
  }
}

export default Portfolio
