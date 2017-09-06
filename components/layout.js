import {Component} from 'react'
import ReactGA from 'react-ga'
import Head from 'next/head'

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
          <link rel='stylesheet' href='../static/styles/layout.css' />
        </Head>
        <div className='top-bar'>
          Made with <a target='_blank' href='https://github.com/zeit/next.js'>Next.js</a> and hosted on <a target='_blank' href='https://zeit.co/now'>now</a>
        </div>
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}
