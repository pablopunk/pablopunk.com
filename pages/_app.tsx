import 'tailwindcss/tailwind.css'
import 'styles/global.css'
import React, { useEffect } from 'react'
import Router from 'next/router'
import Layout from 'components/Layout'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SupabaseProvider } from 'db/supabase/client'

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
