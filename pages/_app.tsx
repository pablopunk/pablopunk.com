import { Layout } from 'components/Layout'
import { I18NProvider } from 'context/i18n'
import { SupabaseProvider } from 'db/supabase/client'
import { NextWebVitalsMetric } from 'next/app'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import SimpleReactLightbox from 'simple-react-lightbox'
import 'styles/global.css'
import 'tailwindcss/tailwind.css'
import { PageProps } from 'types/page'

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

const App = ({
  Component,
  pageProps,
}: {
  Component: any
  pageProps: PageProps
}) => {
  const { locale, push } = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window?.['goatcounter'] !== 'undefined') {
        window['goatcounter'].count({ path: url })
      }
    }

    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => Router.events.off('routeChangeComplete', handleRouteChange)
  }, [])

  useHotkeys('cmd+shift+d', (ev) => {
    ev.preventDefault()
    push('/dev', '/dev', { locale })
  })

  return (
    <>
      <SupabaseProvider>
        <I18NProvider translations={pageProps.translations} locale={locale}>
          <Layout {...pageProps}>
            <SimpleReactLightbox>
              <Component {...pageProps} />
            </SimpleReactLightbox>
          </Layout>
        </I18NProvider>
      </SupabaseProvider>
    </>
  )
}

export default App
