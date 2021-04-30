import { staticProps } from 'components/data-fetch/withCMS'
import withLayout from 'components/skeleton/withLayout'
import React from 'react'
import styled from 'styled-components'
import Repos, { fetchAllReposData } from 'components/data-fetch/Repos'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiNextDotJs, SiGraphql } from 'react-icons/si'
import NpmCharts, { fetchAllNpmData } from 'components/data-fetch/NpmCharts'
import { _ } from '../lib/locales'
import ExampleProjectComponent from 'components/pure/ExampleProjectComponent'
import { ExampleProject } from '@/datocms/types'

interface IProps {
  introHeader: string
  abstract: string
  exampleProjectsHeader: string
  githubReposIntroduction: string
  allExampleProjects: Array<ExampleProject>
  locale: string
  initialData: {
    npm: any
    repos: any
  }
}

const iconSize = '100'

const BigIcon = ({ children, href }) => (
  <a
    className="flex flex-col items-center justify-center px-4 py-2 m-4 text-lg shadow-lg bg-bg2 hover:bg-bg rounded-md"
    href={href}
  >
    {children}
  </a>
)

const StyledAbstract = styled.div`
  font-size: 1.25rem;
  text-align: center;
  ul {
    li {
      border-left: 4px solid var(--color-accent);
      margin: 1rem 0;
      padding: 0.4rem 1rem;
      background-color: var(--color-bg2);
      text-align: left;
    }
  }
`

const Page = ({
  introHeader,
  abstract,
  exampleProjectsHeader,
  githubReposIntroduction,
  allExampleProjects,
  initialData,
  locale,
}: IProps) => {
  return (
    <>
      <section className="flex flex-col items-center">
        <h2 className="m-4 text-2xl text-center">{introHeader}</h2>
        <div className="justify-center mx-auto grid grid-cols-2 md:grid-cols-4">
          <BigIcon href="https://reactjs.org">
            <FaReact size={iconSize} />
            <strong className="text-center text-accent">ReactJS</strong>
          </BigIcon>
          <BigIcon href="https://nextjs.org">
            <SiNextDotJs size={iconSize} className="text-accent" />
            <strong>NextJS</strong>
          </BigIcon>
          <BigIcon href="https://nodejs.org">
            <FaNodeJs size={iconSize} />
            <strong className="text-accent">NodeJS</strong>
          </BigIcon>
          <BigIcon href="https://graphql.org">
            <SiGraphql size={iconSize} className="text-accent" />
            <strong>GraphQL</strong>
          </BigIcon>
        </div>
        <StyledAbstract>
          <div dangerouslySetInnerHTML={{ __html: abstract }}></div>
        </StyledAbstract>
      </section>
      <section className="flex flex-col items-center w-full mx-auto">
        <h3 className="text-xl mb-5">{exampleProjectsHeader}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto">
          {allExampleProjects.map((project) => (
            <div key={project.link}>
              <ExampleProjectComponent project={project} />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-lg text-center">
          {_('Popular npm packages', locale)}
        </h3>
        <NpmCharts initialData={initialData.npm} />
      </section>
      <section>
        <div
          className="mb-8 text-lg text-center "
          dangerouslySetInnerHTML={{ __html: githubReposIntroduction }}
        ></div>
        <Repos locale={locale} initialData={initialData.repos} />
      </section>
    </>
  )
}

export const getStaticProps = async (ctx) => {
  const sProps = await staticProps('portfolio', ctx)

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
export default withLayout(Page, 'portfolio')
