import Document, { Main, NextScript, Html, Head } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import darkModeCode from 'dark-mode-code'
import { i18n } from '~/next.config'

const htmlHello = `
console.log(\`%c
<>
Hi! I'm Pablo, the owner of this website.
What are you doing here? Is there something wrong?
You can contact me at pablo@pablopunk.com
Or open an issue/PR at github.com/pablopunk/pablopunk.com
</>\n
\`, "color:royalblue");
`
const lwtScript = `
  (function (m, a, z, e) {
    var s, t;
    try {
      t = m.sessionStorage.getItem('maze-us');
    } catch (err) {}

    if (!t) {
      t = new Date().getTime();
      try {
        m.sessionStorage.setItem('maze-us', t);
      } catch (err) {}
    }

    s = a.createElement('script');
    s.src = z + '?t=' + t + '&apiKey=' + e;
    s.async = true;
    a.getElementsByTagName('head')[0].appendChild(s);
    m.mazeUniversalSnippetApiKey = e;
  })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '897eab31-050d-4b0c-8bc7-043ad0447d19');
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
      <Html lang={this.props.locale || i18n.defaultLocale}>
        <Head>
          <script data-goatcounter="/goat" async src="/count.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: darkModeCode }}></script>
          <script dangerouslySetInnerHTML={{ __html: htmlHello }} />
        </body>
      </Html>
    )
  }
}
