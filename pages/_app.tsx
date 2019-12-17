import App from 'next/app'
import Page from '../components/Page'

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext)

  return {
    ssr: appContext.req != null,
    ...appProps
  }
}

export default function MyApp({ Component, pageProps, ssr }) {
  return (
    <Page ssr={ssr}>
      <Component {...pageProps} />
    </Page>
  )
}
