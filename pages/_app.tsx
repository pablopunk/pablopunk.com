import 'tailwindcss/tailwind.css'

import React, { useEffect } from 'react'
import Router from 'next/router'
import { ThemeProvider } from 'next-themes'
import { createGlobalStyle } from 'styled-components'
import colors from 'tailwindcss/colors'

const GlobalStyle = createGlobalStyle`
  :root {
    --transition-time: 0.3s;
    --nav-height: 44px;
    --footer-height: 50px;

    --color-bg: ${colors.blueGray['50']};
    --color-fg: ${colors.blueGray['800']};
    --color-bg2: ${colors.blueGray['100']};
    --color-accent: ${colors.indigo['900']};
    --color-accent2: ${colors.violet['600']};
  }
  html.dark {
    --color-bg: ${colors.coolGray['900']};
    --color-fg: ${colors.coolGray['50']};
    --color-bg2: ${colors.blueGray['800']};
    --color-accent: ${colors.teal['200']};
    --color-accent2: ${colors.fuchsia['200']};
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
  a:hover {
    color: var(--color-accent);
  }
  article {
    transition: background-color var(--transition-time), color var(--transition-time);
  }
  h1,h2,h3,h4 {
    color: var(--color-accent);
    font-weight: bold;
  }
  .fill-height {
    height: 100%;
    min-height: calc(100vh - var(--footer-height) - var(--nav-height));
    @media(max-width: 640px) {
      min-height: calc(100vh - var(--nav-height));
    }
  }
  section {
    padding: 2rem 0;
    position: relative;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
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
