import React from 'react'
import Head from 'next/head'
import progress from 'nprogress'
import FadeIn from 'react-fade-in'
import Router from 'next/router'
import Nav from './nav'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

Router.onRouteChangeStart = url => {
  console.log(`Loading ${url}`)
  progress.start()
}

Router.onRouteChangeComplete = Router.onRouteChangeError = () => progress.done()

export default ({ navLinks }) => (
  <div style={{ marginBottom: 20, fontFamily: fonts.mono }}>
    <Head>
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
    </Head>
    <div className='top-bar'>
      <a target='_blank' href='https://github.com/pablopunk/pablo.life'>
        View src/
      </a>
    </div>
    <FadeIn>
      <nav>
        <Nav links={navLinks} />
      </nav>
    </FadeIn>
    <style jsx>{`
      .top-bar {
        font-style: italic;
        margin: 1em;
        font-size: 0.8em;
        opacity: 0.7;
        transition: opacity 0.4s ease;
        height: 5vh;
      }

      nav {
        display: flex;
        justify-content: center;
        margin: .2em 1em;
      }

      a {
        color: ${colors.main};
      }

      a:hover {
        color: ${colors.secondary};
      }

      @media (max-width: 768px) {
        .top-bar {
          opacity: 0;
          height: 0;
        }
      }
    `}</style>
  </div>
)
