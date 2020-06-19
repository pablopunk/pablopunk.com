import Card from 'components/Card'
import Repos from 'components/data/Repos'
import { staticPaths, staticProps } from 'components/data/withCMS'
import CenterFlexColumns from 'components/layout/CenterFlexColumns'
import withLayout from 'components/layout/withLayout'
import SimpleList from 'components/layout/SimpleList'
import GraphQLLogo from 'components/svg/graphql'
import NextLogo from 'components/svg/nextjs'
import NodeLogo from 'components/svg/node'
import ReactLogo from 'components/svg/react'
import { smallMediaQuery } from 'components/utils/media-queries'
import React from 'react'
import styled from 'styled-components'

const ExampleProject = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem 2rem;
  border-radius: 5px;
  box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-bgDim);

  background-color: var(--color-bg);
  border: 1px solid var(--color-bgDim);

  transition: border var(--transition-time), background var(--transition-time);

  figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    strong {
      color: var(--color-color2);
    }

    img {
      border-radius: 4px;
    }
  }

  @media (${smallMediaQuery}) {
    flex-direction: column;
  }
`

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

interface IProps {
  introHeader: string
  abstract: string
  exampleProjectsHeader: string
  githubReposIntroduction: string
  allExampleProjects: Array<any>
  locale: string
}

const Page = ({
  introHeader,
  abstract,
  exampleProjectsHeader,
  githubReposIntroduction,
  allExampleProjects,
  locale,
}: IProps) => {
  return (
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
              <ExampleProject>
                <figure onClick={(_) => window.open(project.link)}>
                  <ProjectImg
                    src={project.picture.url}
                    alt={project.picture.alt}
                  />
                  <strong>{project.name}</strong>
                </figure>
                <CenterFlexColumns>
                  <div
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </CenterFlexColumns>
              </ExampleProject>
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
          <Repos locale={locale} />
        </CenterFlexColumns>
      </section>
    </CenterFlexColumns>
  )
}

export const getStaticProps = (ctx) => staticProps('portfolio', ctx)
export const getStaticPaths = staticPaths
export default withLayout(Page, 'portfolio')
