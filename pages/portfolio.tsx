import React from 'react'
import { NextSeo } from 'next-seo'
import CenterFlex from '../components/CenterFlex'
import styled, { ThemeContext } from 'styled-components'
import ReactLogo from '../components/svg/react'
import NextLogo from '../components/svg/nextjs'
import NodeLogo from '../components/svg/node'
import GraphQLLogo from '../components/svg/graphql'
import Card from '../components/Card'
import SimpleList from '../components/SimpleList'
import CenterFlexColumns from '../components/CenterFlexColumns'
import { smallMediaQuery } from '../lib/utils'

const links = {
  graphql: 'https://graphql.org',
  nextjs: 'https://nextjs.org',
  nodejs: 'https://nodejs.org',
  reactjs: 'https://reactjs.org',
  superdesk: 'https://superdesk.org',
  vimcolors: 'https://vimcolors.org',
  ladjs: 'https://lad.sh'
}

function go(where: keyof typeof links) {
  window.open(links[where])
}

const repos: Array<{
  name: string
  user?: string
  stars: string | number
  description: string
}> = [
  {
    name: 'lad',
    user: 'ladjs',
    stars: '1.7k',
    description: 'Lad scaffolds a Koa webapp and API framework for Node.js'
  },
  {
    name: 'chronocube',
    stars: 57,
    description:
      "Simple desktop/web app to track and manage your Rubik's cube solve times."
  },
  {
    name: 'bashy',
    stars: 37,
    description: 'Extremely fast and simple git prompt for bash'
  },
  {
    name: 'iga',
    stars: 5,
    description:
      'Zero config typescript/es6 server with the filesystem as a router'
  },
  {
    name: 'serve-bar',
    stars: 4,
    description: 'Drag & Drop to share files/folders in your local network'
  }
]

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
    border-top: 2px solid ${props => props.theme.bgDim};
    padding: 2rem 0 0;
    margin: 2rem 0 0;
  }
`

export default () => {
  const theme = React.useContext(ThemeContext)

  return (
    <CenterFlexColumns>
      <NextSeo
        title="Pablo Varela | Porfolio of my work"
        description="Some examples of my work and technologies I use daily, both for personal and professional projects and."
      />
      <section>
        <CenterFlex>
          <h2>Latest and greatest technologies</h2>
        </CenterFlex>
        <StyledGrid>
          <Card onClick={_ => go('reactjs')}>
            <ReactLogo fill={theme.color1}></ReactLogo>
            <strong style={{ color: theme.color2 }}>ReactJS</strong>
          </Card>
          <Card onClick={_ => go('nextjs')}>
            <NextLogo fill={theme.color2}></NextLogo>
            <strong style={{ color: theme.color1 }}>NextJS</strong>
          </Card>
          <Card onClick={_ => go('nodejs')}>
            <NodeLogo fill={theme.color1}></NodeLogo>
            <strong style={{ color: theme.color2 }}>NodeJS</strong>
          </Card>
          <Card onClick={_ => go('graphql')}>
            <GraphQLLogo fill={theme.color2}></GraphQLLogo>
            <strong style={{ color: theme.color1 }}>GraphQL</strong>
          </Card>
        </StyledGrid>
        <p>
          I use the latest technologies to build{' '}
          <strong>high quality scalable websites</strong>.
        </p>
        <SimpleList>
          <li>
            <strong>⚡ Built for performance</strong>: Instant response time and
            cached data.
          </li>
          <li>
            <strong>💄 Stylish</strong>: Custom and stylish UI with great UX.
          </li>
          <li>
            <strong>☔ Reliable</strong>: Zero downtime and backups thanks to
            cloud providers.
          </li>
        </SimpleList>
      </section>
      <section>
        <CenterFlex>
          <h3>Some examples of my work:</h3>
        </CenterFlex>
        <BorderTopOnSmallMedia>
          <CenterFlex>
            <Card onClick={_ => go('superdesk')}>
              <img
                width="150"
                src="/images/screenshots/superdesk.jp2"
                alt="Superdesk screenshot"
              />
              <strong>Superdesk</strong>
            </Card>
            <CenterFlexColumns>
              <p>
                I'm part of the team at{' '}
                <a href="https://sourcefabric.org">Sourcefabric</a> that
                develops the best open source tools for journalism. Superdesk is
                a state-of-the-art digital newsroom system.
              </p>
              <p>
                It combines headless CMS functionality with powerful workflow
                features for an end-to-end news creation, production, curation
                and distribution platform.
              </p>
            </CenterFlexColumns>
          </CenterFlex>
        </BorderTopOnSmallMedia>
        <BorderTopOnSmallMedia>
          <CenterFlex>
            <Card onClick={_ => go('ladjs')}>
              <img
                width="150"
                src="/images/screenshots/lad.jp2"
                alt="Ladjs screenshot"
              />
              <strong>LadJS</strong>
            </Card>
            <CenterFlexColumns>
              <p>
                I'm part of the core team that develops{' '}
                <a href={links.ladjs}>LadJS</a>. A new NodeJS framework with all
                the tools you need to build a full stack website.
              </p>
              <p>
                Lad is full of features but it's extremely configurable. For
                example it ships with Pug as the template engine but you can
                easily plug in React, Vue, Angular, etc
              </p>
            </CenterFlexColumns>
          </CenterFlex>
        </BorderTopOnSmallMedia>
        <BorderTopOnSmallMedia>
          <CenterFlex>
            <Card onClick={_ => go('vimcolors')}>
              <img
                width="150"
                src="/images/screenshots/vimcolors.jp2"
                alt="Vimcolors screenshot"
              />
              <strong>Vimcolors.org</strong>
            </Card>
            <CenterFlexColumns>
              <p>
                <a href="https://vimcolors.org">Vimcolors</a> is an online tool
                to create custom color schemes for the text editor{' '}
                <strong>vim</strong> with ease.
              </p>
              <p>
                It takes the hard task of manually tweaking every single color
                for all the possible fields of your text editor and converts it
                on a simple and fun visual experience with a real-time preview.
              </p>
            </CenterFlexColumns>
          </CenterFlex>
        </BorderTopOnSmallMedia>
      </section>
      <section>
        <CenterFlexColumns>
          <h4>More at my GitHub</h4>
          <p>
            On <a href="https://github.com/pablopunk">my github</a> you can find
            more projects like:
          </p>
          <SimpleList>
            {repos.map(repo => (
              <li key={repo.name}>
                <a
                  href={`https://github.com/${repo.user || 'pablopunk'}/${
                    repo.name
                  }`}
                >
                  /{repo.name}
                </a>{' '}
                ⭐{repo.stars}
                <p>{repo.description}</p>
              </li>
            ))}
          </SimpleList>
        </CenterFlexColumns>
      </section>
    </CenterFlexColumns>
  )
}
