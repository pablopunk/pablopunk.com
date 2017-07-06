import Head from 'next/head'

export default ({ children }) => (
  <div>
    <Head>
      <title>Pablo Varela</title>
      <link rel='shortcut icon' href='../static/images/favicon.ico' type='image/x-icon' />
      <meta name='viewport' content='width=device-width, user-scalable=no' />
      <link rel='stylesheet' href='../static/styles/layout.css' />
    </Head>
    <main>
      <div className='top-bar'>
        Made with <a target='_blank' href='https://github.com/zeit/next.js'>Next.js</a> and hosted in <a target='_blank' href='https://github.com/pablopunk/pablo.life/tree/gh-pages'>github pages</a>
      </div>
      { children }
    </main>
  </div>
)
