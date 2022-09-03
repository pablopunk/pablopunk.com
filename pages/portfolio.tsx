import React from 'react'
import { Repos } from 'components/Repos'
import { NpmCharts, fetchAllNpmData } from 'components/NpmCharts'
import { PageProps } from 'types/page'
import { GetStaticProps } from 'next'
import { getFromCache } from 'db/redis'
import { getReposApiResponse } from './api/repos'
import { JAMStack } from 'components/JAMStack'
import { Section } from 'components/Section'
import { T } from 'components/T'
import { pageStaticProps } from 'middleware'

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
        <h1 className="text-3xl text-center">
          <T>
            The power of <b>JAMStack</b>
          </T>
        </h1>
        <p className="text-center mt-1 opacity-80">
          With JAMStack you get the best of dynamic React components and the
          speed of static HTML content
        </p>
        <JAMStack />
      </Section>
      <Section alt>
        <h2 className="text-xl">
          <T>Popular NPM packages</T>
        </h2>
        <NpmCharts initialData={initialData.npm} />
      </Section>
      <Section>
        <h2 className="text-xl">
          <T>Featured repos</T>
        </h2>
        <Repos initialData={initialData.repos} />
      </Section>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const npm = await getFromCache('npm', fetchAllNpmData)
  const repos = await getFromCache('repos', getReposApiResponse)
  const { props: pageProps } = await pageStaticProps(ctx)

  return {
    props: {
      ...pageProps,
      initialData: {
        npm,
        repos,
      },
      locale: ctx.locale,
    },
  }
}

export default Portfolio
