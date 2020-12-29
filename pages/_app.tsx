import React, { useEffect } from 'react'
import Router from 'next/router'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --space-1: 0.75rem;
    --space-2: 1.25rem;
    --space-3: 2.5rem;
    --space-4: 3.5rem;
    --space-5: 4.5rem;
    --space-6: 6rem;

    --nav-height: 40px;
    --footer-height: 7vh;
    --transition-time: 0.3s;
  }
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  html,body {
    position: relative;
  }
  body {
    margin: 0;
    padding: 0;

    transition: background-color var(--transition-time), color var(--transition-time);
  }
  svg {
    vertical-align: middle;
  }
`
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
      <GlobalStyle />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
