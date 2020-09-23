import React, { useEffect } from 'react'
import Router from 'next/router'
import 'rodal/lib/rodal.css'

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window?.['goatcounter'] !== 'undefined') {
        window['goatcounter'].count({ path: url })
      }
    }

    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => Router.events.off('routeChangeComplete', handleRouteChange)
  }, [])
  return <Component {...pageProps} />
}

export default App
