import React from 'react'
import Repos, { fetchAllReposData } from 'components/data-fetch/Repos'
import NpmCharts, { fetchAllNpmData } from 'components/data-fetch/NpmCharts'
import { _ } from '../lib/locales'
import { getPageStaticProps } from 'storyblok/middleware'
import { PageProps } from 'types/page'
import { GetStaticProps } from 'next'
import useStoryblok from 'storyblok/hooks/useStoryblok'
import { BlokComponent } from 'storyblok/components/BlokComponent'

interface Props extends PageProps {
  locale: string
  initialData: {
    npm: any
    repos: any
  }
}

const Portfolio = ({ initialData, locale, page }: Props) => {
  const story = useStoryblok(page)

  return (
    <>
      {story.content.body.map((blok) => (
        <BlokComponent blok={blok} key={blok._uid} />
      ))}
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

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const sProps = await getPageStaticProps('portfolio', ctx)

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
