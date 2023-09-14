import { Page } from '~/components/Page'
import { I18NProvider } from 'hooks/context/i18n'
import { NextWebVitalsMetric } from 'next/app'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import SimpleReactLightbox from 'simple-react-lightbox'
import 'tailwindcss/tailwind.css'
import '~/styles/global.css'
import 'react-tippy/dist/tippy.css'
import { PageProps } from '~/types/page'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { countVisit } from 'models/goatcounter'
import { Database } from 'models/supabase/generated-types'
import { useBrowserSupabaseClient } from 'models/supabase/client/browser'

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
  const supabaseClient = useBrowserSupabaseClient()

  useEffect(() => {
    Router.events.on('routeChangeComplete', countVisit)
    return () => Router.events.off('routeChangeComplete', countVisit)
  }, [])

  useHotkeys('cmd+shift+d', (ev) => {
    ev.preventDefault()
    push('/dev', '/dev', { locale })
  })

  return (
    <>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <I18NProvider translations={pageProps.translations} locale={locale}>
          <Page {...pageProps}>
            <SimpleReactLightbox>
              <Component {...pageProps} />
            </SimpleReactLightbox>
          </Page>
        </I18NProvider>
      </SessionContextProvider>
    </>
  )
}

export default App
