import { Component } from 'react'
import ReactGA from 'react-ga'
import Head from 'next/head'
import Header from './header'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

const indexNavLink = {
  title: 'Home',
  href: '/'
}

export default class extends Component {
  componentDidMount () {
    ReactGA.initialize('UA-106008527-2')
    ReactGA.pageview(document.location.pathname)
  }

  render () {
    let { navLinks, title } = this.props

    title = this.props.title || 'Web Developer'
    title = ` | ${title}`

    if (navLinks) {
      navLinks = [indexNavLink, ...navLinks]
    }

    return (
      <div>
        <Head>
          <title>Pablo Varela{title}</title>
          <meta
            name='description'
            content="I'm a young programmer passionate about web development and remote work. I love open source, javascript, and building my own websites and tools."
          />
          <meta name='canonical' href='https://pablo.life' />
          <meta
            name='keywords'
            href='web developer, programmer, remote, remote work, freelancer, senior, full stack'
          />
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
          <link
            href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
            rel='stylesheet'
            integrity='sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN'
            crossOrigin='anonymous'
          />
        </Head>
        <Header navLinks={navLinks} />

        <main>{this.props.children}</main>

        <noscript id='deferred-styles'>
          <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
        </noscript>

        <script type='text/javascript' src='/static/async-css.js' />

        <style global jsx>{`
          *::selection {
            background-color: ${colors.selection};
          }

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
