import React, { useEffect } from 'react'
import Router from 'next/router'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import { createGlobalStyle } from 'styled-components'
import colors from 'tailwindcss/colors'

const GlobalStyle = createGlobalStyle`
  :root {
    --transition-time: 0.3s;

    --color-bg: ${colors.blueGray['50']};
    --color-fg: ${colors.blueGray['800']};
    --color-bg2: ${colors.blueGray['50']};
    --color-accent: ${colors.fuchsia['500']};
    --color-accent2: ${colors.teal['500']};
  }
  html.dark {
    --color-bg: ${colors.blueGray['900']};
    --color-fg: ${colors.blueGray['50']};
    --color-bg2: ${colors.indigo['900']};
    --color-accent: ${colors.teal['300']};
    --color-accent2: ${colors.fuchsia['400']};
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

    background-color: var(--color-bg);
    color: var(--color-fg);
    transition: background-color var(--transition-time), color var(--transition-time);
  }
  svg {
    vertical-align: middle;
  }
  a {
    color: var(--color-accent2);
    transition: background-color var(--transition-time), color var(--transition-time);
  }
  article {
    transition: background-color var(--transition-time), color var(--transition-time);
  }
  a:hover {
    color: var(--color-accent);
  }
  h1,h2,h3,h4 {
    color: var(--color-accent);
    font-weight: bold;
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
