import 'tailwindcss/tailwind.css'

import React, { useEffect } from 'react'
import Router from 'next/router'
import { ThemeProvider } from 'next-themes'
import { createGlobalStyle } from 'styled-components'
import { blue, blueGray, teal, coolGray, fuchsia } from 'tailwindcss/colors'
import Layout from 'components/Layout'
import SimpleReactLightbox from 'simple-react-lightbox'

const GlobalStyle = createGlobalStyle`
  :root {
    --transition-time: 0.3s;
    --nav-height: 44px;
    --footer-height: 50px;

    --color-bg: ${blueGray['50']};
    --color-fg: ${blueGray['700']};
    --color-bg2: white;
    --color-accent: ${teal['500']};
    --color-accent2: ${blue['500']};
    --color-border: ${blueGray['200']};
  }
  html.dark {
    --color-bg: ${coolGray['900']};
    --color-fg: ${coolGray['100']};
    --color-bg2: ${coolGray['800']};
    --color-accent: ${fuchsia['300']};
    --color-accent2: ${teal['300']};
    --color-border: ${blueGray['800']};
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
    color: var(--color-fg);
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
    padding: 1rem 0;
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
        <Layout {...pageProps}>
          <SimpleReactLightbox>
            <Component {...pageProps} />
          </SimpleReactLightbox>
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
