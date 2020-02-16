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
import Repos from '../components/Repos'
import { smallMediaQuery } from '../components/common/media-queries'
import { themes } from '../components/common/themes'

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

export default () => {
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
          <div className="negative">
            <Card onClick={_ => go('reactjs')}>
              <ReactLogo />
              <strong>ReactJS</strong>
            </Card>
          </div>
          <Card onClick={_ => go('nextjs')}>
            <NextLogo />
            <strong>NextJS</strong>
          </Card>
          <div className="negative">
            <Card onClick={_ => go('nodejs')}>
              <NodeLogo />
              <strong>NodeJS</strong>
            </Card>
          </div>
          <Card onClick={_ => go('graphql')}>
            <GraphQLLogo />
            <strong>GraphQL</strong>
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
          <Repos />
        </CenterFlexColumns>
      </section>
    </CenterFlexColumns>
  )
}
