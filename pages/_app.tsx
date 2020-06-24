import React, { useEffect } from 'react'
import Router from 'next/router'

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url) =>
      window['goatcounter'].count({ path: url })

    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => Router.events.off('routeChangeComplete', handleRouteChange)
  }, [])
  return <Component {...pageProps} />
}

export default App
