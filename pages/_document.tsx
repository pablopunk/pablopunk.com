import Document, { Main, NextScript, Html, Head } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { useRouter } from 'next/router'

const darkModeCode = `(function() {
  function setDarkMode(v) {
    window.__darkMode = v
    localStorage.setItem('dark', v ? 'yes' : 'no');
    document.body.className = v ? 'dark' : 'light';
  }
  var q = window.matchMedia('(prefers-color-scheme: dark)');
  q.addListener(function(e) { setDarkMode(e.matches); });
  var darkLS
  try { darkLS = localStorage.getItem('dark'); }
  catch (err) { }
  setDarkMode(darkLS ? darkLS === 'yes' : q.matches);
  window.__toggleDarkMode = function() {
    setDarkMode(!window.__darkMode);
  }
})();`

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
          <script data-goatcounter="/goat" async src="/count.js"></script>
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: darkModeCode }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
