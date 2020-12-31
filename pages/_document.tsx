import Document, { Main, NextScript, Html, Head } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const darkModeAutoForTailwind = `
(function() {
  function setTheme(dark) {
     var html = document.getElementsByTagName('html')[0]
     var t = dark ? 'dark' : 'light'
     html.classList.add(dark ? 'dark' : 'light')
     html.classList.remove(dark ? 'light' : 'dark')
     localStorage.setItem('theme', t)
  }
  var q = window.matchMedia('(prefers-color-scheme: dark)');
  q.addListener(function(e) { setTheme(e.matches); })
  var themeLS
  try {
    themeLS = localStorage.getItem('theme')
  } catch(err) {}
  setTheme(themeLS ? themeLS === 'dark' : q.matches)
})()
`

export default class extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhaceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        locale: ctx.locale,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head>
          <script
            dangerouslySetInnerHTML={{ __html: darkModeAutoForTailwind }}
          ></script>
          <script data-goatcounter="/goat" async src="/count.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
