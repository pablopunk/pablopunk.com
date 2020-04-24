import React from 'react'
import CenterFlex from '../../components/layout/CenterFlex'
import styled, { ThemeContext } from 'styled-components'
import ReactLogo from '../../components/svg/react'
import NextLogo from '../../components/svg/nextjs'
import NodeLogo from '../../components/svg/node'
import GraphQLLogo from '../../components/svg/graphql'
import Card from '../../components/Card'
import SimpleList from '../../components/layout/SimpleList'
import CenterFlexColumns from '../../components/layout/CenterFlexColumns'
import Repos from '../../components/data/Repos'
import { smallMediaQuery } from '../../components/utils/media-queries'
import { themes } from '../../components/utils/themes'
import Page, { IPageProps } from '../../components/layout/Page'
import { staticProps, staticPaths } from '../../components/data/withCMS'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  @media (${smallMediaQuery}) {
    grid-template-columns: 1fr 1fr;
    justify-content: center;
  }
  margin-top: 2rem;
  margin-bottom: 4rem;
`

const BorderTopOnSmallMedia = styled.div`
  @media (${smallMediaQuery}) {
    border-top: 2px solid ${themes.light.bgDim};
    body.dark &  {
      border-top: 2px solid ${themes.dark.bgDim};
    }
    padding: 2rem 0 0;
    margin: 2rem 0 0;
  }
`

function go(link: string) {
  window.open(`https://${link}`)
}

interface IProps extends IPageProps {
  introHeader
  abstract
  exampleProjectsHeader
  githubReposIntroduction
  allExampleProjects
}

export default ({
  introHeader,
  abstract,
  exampleProjectsHeader,
  githubReposIntroduction,
  allExampleProjects,
  ...props
}: IProps) => {
  return (
    <Page {...props}>
      <CenterFlexColumns>
        <section>
          <CenterFlex>
            <h2>{introHeader}</h2>
          </CenterFlex>
          <StyledGrid>
            <div className="negative">
              <Card onClick={(_) => go('reactjs.org')}>
                <ReactLogo />
                <strong>ReactJS</strong>
              </Card>
            </div>
            <Card onClick={(_) => go('nextjs.org')}>
              <NextLogo />
              <strong>NextJS</strong>
            </Card>
            <div className="negative">
              <Card onClick={(_) => go('nodejs.org')}>
                <NodeLogo />
                <strong>NodeJS</strong>
              </Card>
            </div>
            <Card onClick={(_) => go('graphql.org')}>
              <GraphQLLogo />
              <strong>GraphQL</strong>
            </Card>
          </StyledGrid>
          <SimpleList>
            <div dangerouslySetInnerHTML={{ __html: abstract }}></div>
          </SimpleList>
        </section>
        <section>
          <CenterFlex>
            <h3>{exampleProjectsHeader}</h3>
          </CenterFlex>
          {allExampleProjects.map((project) => (
            <BorderTopOnSmallMedia key={project.name}>
              <CenterFlex>
                <Card onClick={(_) => window.open(project.link)}>
                  <img
                    width="150"
                    src={project.picture.url}
                    alt={project.picture.alt}
                  />
                  <strong>{project.name}</strong>
                </Card>
                <CenterFlexColumns>
                  <div
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  ></div>
                </CenterFlexColumns>
              </CenterFlex>
            </BorderTopOnSmallMedia>
          ))}
        </section>
        <section>
          <CenterFlexColumns>
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{ __html: githubReposIntroduction }}
            ></div>
            <Repos />
          </CenterFlexColumns>
        </section>
      </CenterFlexColumns>
    </Page>
  )
}

export const getStaticProps = (ctx) => staticProps('portfolio', ctx)
export const getStaticPaths = staticPaths
