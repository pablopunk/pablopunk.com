import 'styles/radix-colors.css'
import 'tailwindcss/tailwind.css'
import 'styles/global.css'
import React, { useEffect } from 'react'
import Router from 'next/router'
import { Layout } from 'components/Layout'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SupabaseProvider } from 'db/supabase/client'
import { NextWebVitalsMetric } from 'next/app'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const url = process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT

  if (!url) {
    return
  }

  const body = JSON.stringify({
    route: window.__NEXT_DATA__.page,
    ...metric,
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
}

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

  return (
    <>
      <SupabaseProvider>
        <Layout {...pageProps}>
          <SimpleReactLightbox>
            <Component {...pageProps} />
          </SimpleReactLightbox>
        </Layout>
      </SupabaseProvider>
    </>
  )
}

export default App
