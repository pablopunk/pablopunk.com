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

const FlexRows = styled.div`
  display: flex;
  flex-direction: row;
  * {
    margin: 0.8rem 0.4rem;
  }
  p {
    font-size: 2.1rem;
    text-align: justify;
  }
  @media (${smallMediaQuery}) {
    flex-direction: column;
    p {
      text-align: left;
    }
  }
`

const ProjectImg = styled.img`
  width: 150px;
  @media (${smallMediaQuery}) {
    width: 100%;
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
    <Page {...props} path="portfolio">
      <CenterFlexColumns>
        <section>
          <h2 style={{ textAlign: 'center' }}>{introHeader}</h2>
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
          <h3 style={{ textAlign: 'center' }}>{exampleProjectsHeader}</h3>
          {allExampleProjects.map((project) => (
            <div key={project.name}>
              <FlexRows>
                <Card onClick={(_) => window.open(project.link)}>
                  <ProjectImg
                    src={project.picture.url}
                    alt={project.picture.alt}
                  />
                  <strong>{project.name}</strong>
                </Card>
                <CenterFlexColumns>
                  <div
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </CenterFlexColumns>
              </FlexRows>
            </div>
          ))}
        </section>
        <section>
          <CenterFlexColumns>
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{ __html: githubReposIntroduction }}
            ></div>
            <Repos locale={props.locale} />
          </CenterFlexColumns>
        </section>
      </CenterFlexColumns>
    </Page>
  )
}

export const getStaticProps = (ctx) => staticProps('portfolio', ctx)
export const getStaticPaths = staticPaths
