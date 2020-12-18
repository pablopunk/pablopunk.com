import Card from 'components/containers/Card'
import { staticProps } from 'components/data-fetch/withCMS'
import CenterFlexColumns from 'components/containers/CenterFlexColumns'
import withLayout from 'components/skeleton/withLayout'
import SimpleList from 'components/containers/SimpleList'
import { smallMediaQuery } from 'components/utils/media-queries'
import React from 'react'
import styled from 'styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Grid from 'components/containers/Grid'
import Repos from 'components/data-fetch/Repos'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiNextDotJs, SiGraphql } from 'react-icons/si'
import NpmCharts from 'components/data-fetch/NpmCharts'
import { _ } from 'lib/locales'

const ExampleProject = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem 2rem;
  box-shadow: 5px 5px 20px 2px var(--color-bgDim);
  border: 1px solid var(--color-bgDim);

  background-color: var(--color-bgDim);
  border: 1px solid var(--color-accent);

  transition: border var(--transition-time), background var(--transition-time);

  figure {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    strong {
      color: var(--color-accent2);
    }

    img {
      border-radius: 4px;
      width: 150px;
      @media (${smallMediaQuery}) {
        width: 100%;
      }
    }
  }

  @media (${smallMediaQuery}) {
    flex-direction: column;
  }
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
  const iconSize = '100'
  return (
    <CenterFlexColumns>
      <section>
        <h2 style={{ textAlign: 'center' }}>{introHeader}</h2>
        <Grid columns={4} small={2}>
          <div className="negative">
            <Card onClick={(_) => go('reactjs.org')}>
              <FaReact size={iconSize} />
              <strong>ReactJS</strong>
            </Card>
          </div>
          <Card onClick={(_) => go('nextjs.org')}>
            <SiNextDotJs size={iconSize} />
            <strong>NextJS</strong>
          </Card>
          <div className="negative">
            <Card onClick={(_) => go('nodejs.org')}>
              <FaNodeJs size={iconSize} />
              <strong>NodeJS</strong>
            </Card>
          </div>
          <Card onClick={(_) => go('graphql.org')}>
            <SiGraphql size={iconSize} />
            <strong>GraphQL</strong>
          </Card>
        </Grid>
        <SimpleList>
          <ul>
            <div dangerouslySetInnerHTML={{ __html: abstract }}></div>
          </ul>
        </SimpleList>
      </section>
      <section>
        <h3 style={{ textAlign: 'center' }}>{exampleProjectsHeader}</h3>
        {allExampleProjects.map((project) => (
          <div key={project.name}>
            <FlexRows>
              <ExampleProject>
                <figure onClick={(_) => window.open(project.link)}>
                  <LazyLoadImage
                    src={project.picture.url}
                    alt={project.picture.alt}
                    placeholder={
                      <img
                        src={project.picture.blurUpThumb}
                        alt={project.picture.alt}
                      />
                    }
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
      <section style={{ width: '100%' }}>
        <CenterFlexColumns>
          <h3>{_('Popular npm packages', locale)}</h3>
          <NpmCharts locale={locale} />
        </CenterFlexColumns>
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
export default withLayout(Page, 'portfolio')
