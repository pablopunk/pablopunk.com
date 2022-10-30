import Document, { Main, NextScript, Html, Head } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import darkModeCode from 'dark-mode-code'
import { i18n } from '@next.config'

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
          <script
            async
            type="text/javascript"
            src="https://lwt-snippet.surge.sh/maze-lwt.js"
          />
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
