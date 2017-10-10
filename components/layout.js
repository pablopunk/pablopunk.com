import {Component} from 'react'
import ReactGA from 'react-ga'
import Head from 'next/head'
import colors from './colors'
import Center from './center'

export default class extends Component {
  componentDidMount () {
    ReactGA.initialize('UA-106008527-2')
    ReactGA.pageview(document.location.pathname)
  }

  render () {
    return (
      <div>
        <Head>
          <title>Pablo Varela</title>
          <link rel='shortcut icon' href='../static/images/favicon.ico' type='image/x-icon' />
          <meta name='viewport' content='width=device-width, user-scalable=no' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Amatic+SC|Raleway' />
        </Head>
        <div className='top-bar'>
          Made with <a target='_blank' href='https://github.com/zeit/next.js'>Next.js</a> and hosted on <a target='_blank' href='https://zeit.co/now'>now</a>
        </div>
        <main>
          <Center height={90}>
            { this.props.children }
          </Center>
        </main>
        <style global jsx>{`
          body {
            font-family: 'Raleway', sans-serif;
            margin: 0;
            padding: 0;
          }

          ul, h1, h2, h3, h4, h5, h6 {
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

          .top-bar {
            font-style: italic;
            margin: 1em;
            font-size: .8em;
            opacity: .7;
            transition: opacity .4s ease;
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
  }
}
