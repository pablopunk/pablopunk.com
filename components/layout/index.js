import { Component } from 'react'
import ReactGA from 'react-ga'
import Head from 'next/head'
import Header from './header'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export default class extends Component {
  componentDidMount () {
    ReactGA.initialize('UA-106008527-2')
    ReactGA.pageview(document.location.pathname)
  }

  render () {
    const title = this.props.title ? ` | ${this.props.title}` : ''

    return (
      <div>
        <Head>
          <title>Pablo Varela{title}</title>
          <link
            rel='shortcut icon'
            href='../static/images/favicon.ico'
            type='image/x-icon'
          />
          <meta
            name='viewport'
            content='width=device-width, user-scalable=no'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Amatic+SC|Raleway'
          />
        </Head>
        <Header />
        <main>{ this.props.children }</main>
        <style global jsx>{`
          body {
            font-family: ${fonts.body};
            margin: 0;
            padding: 0;
          }

          ul,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          a {
            color: ${colors.secondary};
            text-decoration: none;
          }

          a:hover {
            color: ${colors.main};
          }

          main {
            width: 100%;
            max-width: 1200px;
            margin: auto;
          }
       `}</style>
      </div>
    )
  }
}
