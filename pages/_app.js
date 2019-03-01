import { parse } from 'url'
import React from 'react'
import App, { Container } from 'next/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import colors from '../components/styles/colors'

// Create fontawesome library
library.add(fas, fab)

class Layout extends React.Component {
  render () {
    const { children } = this.props
    return <div className='layout'>
      <main>
        { children }
      </main>
    </div>
  }
}

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props

    return <Container>
      <Layout>
        <Component {...pageProps} />
        <style global jsx>{`
          body, html {
            margin: 0;
            padding: 0;
            font-family: Lora;
            background-color: ${colors.bodyBg};
            color: ${colors.bodyFont};
          }
          a {
            text-decoration: none;
            color: ${colors.link};
            font-family: 'Titillium Web';
          }
          a:hover {
            color: ${colors.primary};
          }
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            list-style: none;
          }
          p {
            font-size: 1.2em;
          }
          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .row {
            width: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .col-1,
          .col-2,
          .col-3,
          .col-4,
          .col-5,
          .col-6,
          .col-7,
          .col-8,
          .col-9,
          .col-10 {
            display: inline-block;
          }
          @media screen and (min-width: 900px) {
            .row {
              flex-direction: row;
            }
            .col-1 {
              width: 10%;
            }
            .col-2 {
              width: 20%;
            }
            .col-3 {
              width: 30%;
            }
            .col-4 {
              width: 40%;
            }
            .col-5 {
              width: 50%;
            }
            .col-6 {
              width: 60%;
            }
            .col-7 {
              width: 70%;
            }
            .col-8 {
              width: 80%;
            }
            .col-9 {
              width: 90%;
            }
            .col-10 {
              width: 100%;
            }
          }
        `}</style>
      </Layout>
    </Container>
  }
}
