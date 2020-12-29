import { staticProps } from 'components/data-fetch/withCMS'
import withLayout from 'components/skeleton/withLayout'
import { smallMediaQuery } from 'components/utils/media-queries'
import React from 'react'
import styled from 'styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Repos from 'components/data-fetch/Repos'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiNextDotJs, SiGraphql } from 'react-icons/si'
import NpmCharts from 'components/data-fetch/NpmCharts'
import { _ } from 'lib/locales'

export function go(link: string) {
  window.open(`https://${link}`)
}

interface IProps {
  introHeader: string
  abstract: string
  exampleProjectsHeader: string
  githubReposIntroduction: string
  allExampleProjects: Array<any>
  locale: string
}

const iconSize = '100'

const BigIcon = ({ children, href }) => (
  <a
    className="flex flex-col items-center justify-center px-4 py-2 m-4 text-lg border border-green-500 hover:border-indigo-500"
    href={href}
  >
    {children}
  </a>
)

const Page = ({
  introHeader,
  abstract,
  exampleProjectsHeader,
  githubReposIntroduction,
  allExampleProjects,
  locale,
}: IProps) => {
  return (
    <>
      <section className="flex flex-col items-center">
        <h2 className="m-4 text-2xl text-center">{introHeader}</h2>
        <div className="justify-center mx-auto grid grid-cols-4 sm:grid-col-2">
          <BigIcon href="https://reactjs.org">
            <FaReact size={iconSize} />
            <strong className="text-center text-indigo-500">ReactJS</strong>
          </BigIcon>
          <BigIcon href="https://nextjs.org">
            <SiNextDotJs size={iconSize} className="text-indigo-500" />
            <strong>NextJS</strong>
          </BigIcon>
          <BigIcon href="https://nodejs.org">
            <FaNodeJs size={iconSize} />
            <strong className="text-indigo-500">NodeJS</strong>
          </BigIcon>
          <BigIcon href="https://graphql.org">
            <SiGraphql size={iconSize} className="text-indigo-500" />
            <strong>GraphQL</strong>
          </BigIcon>
        </div>
        <div dangerouslySetInnerHTML={{ __html: abstract }}></div>
      </section>
      <section className="flex flex-col items-center w-full mx-auto">
        <h3 className="text-xl">{exampleProjectsHeader}</h3>
        {allExampleProjects.map((project) => (
          <div
            key={project.name}
            className="flex items-center justify-center px-4 py-6 m-3 mx-auto border border-green-500"
          >
            <figure
              onClick={(_) => window.open(project.link)}
              className="flex flex-col items-center flex-shrink-0 mr-4 cursor-pointer"
            >
              <LazyLoadImage
                src={project.picture.url}
                alt={project.picture.alt}
                width="150px"
                placeholder={
                  <img
                    src={project.picture.blurUpThumb}
                    alt={project.picture.alt}
                    width="150px"
                  />
                }
              />
              <strong className="mt-3 text-indigo-500">{project.name}</strong>
            </figure>
            <div
              className="text-xl text-justify"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
        ))}
      </section>
      <section style={{ width: '100%' }}>
        <h3>{_('Popular npm packages', locale)}</h3>
        <NpmCharts locale={locale} />
      </section>
      <section>
        <div
          style={{ textAlign: 'center' }}
          dangerouslySetInnerHTML={{ __html: githubReposIntroduction }}
        ></div>
        <Repos locale={locale} />
      </section>
    </>
  )
}

export const getStaticProps = (ctx) => staticProps('portfolio', ctx)
export default withLayout(Page, 'portfolio')
