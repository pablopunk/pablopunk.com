import React from 'react'
import Head from 'next/head'
import progress from 'nprogress'
import Router from 'next/router'
import colors from './colors'

Router.onRouteChangeStart = url => {
  console.log(`Loading ${url}`)
  progress.start()
}

Router.onRouteChangeComplete = Router.onRouteChangeError = () =>
  progress.done()

export default () => (
  <div style={{ marginBottom: 20 }}>
    <Head>
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
    </Head>
    <div className='top-bar'>
      Made with{' '}
      <a target='_blank' href='https://github.com/zeit/next.js'>
        React
      </a>
    </div>
    <style jsx>{`
      .top-bar {
        font-style: italic;
        margin: 1em;
        font-size: 0.8em;
        opacity: 0.7;
        transition: opacity 0.4s ease;
        heigth: 5vh;
      }

      .top-bar a {
        color: ${colors.main};
      }

      @media (max-width: 768px) {
        .top-bar {
          opacity: 0;
          heigth: 0;
        }
      }
    `}</style>
  </div>
)
