import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="I am a web developer currently working remotely from Pontevedra, Spain. I love web technologies, Javascript, React, NodeJS... I also love vim and bash. I use all those technologies to build stuff I enjoy using. Websites, APIs, CLI tools..."
          />
          <meta
            name="tags"
            content="web,developer,freelance,react,javascript,js,node,github,remote,scrum,hire,contractor,pablo,varela,pablopunk,punk,independent,spain,usa,work,job,website,project,production,fast,api,portfolio"
          />
          <link rel="canonical" href="http://pablo.pink/" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color="#4169e1"
          />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta
            name="msapplication-config"
            content="/static/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
