import Page from '../components/Page'

App.getInitialProps = async ({ req }) => {
  return {
    ssr: req != null
  }
}

export default function App({ Component, pageProps, ssr }) {
  return (
    <Page ssr={ssr}>
      <Component {...pageProps} />
    </Page>
  )
}
