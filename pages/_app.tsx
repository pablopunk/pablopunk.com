import 'tailwindcss/tailwind.css'

import React, { useEffect } from 'react'
import Router from 'next/router'
import { createGlobalStyle } from 'styled-components'
import Layout from 'components/Layout'
import SimpleReactLightbox from 'simple-react-lightbox'
import { THEME } from 'config'

const GlobalStyle = createGlobalStyle`
  :root {
    --transition-time: 0.3s;
    --nav-height: 44px;
    --footer-height: 50px;

    --color-bg: ${THEME.light.bg};
    --color-fg: ${THEME.light.fg};
    --color-bg2: ${THEME.light.bg2};
    --color-accent: ${THEME.light.accent};
    --color-accent2: ${THEME.light.accent2};
    --color-border: ${THEME.light.border};
  }
  body.dark {
    --color-bg: ${THEME.dark.bg};
    --color-fg: ${THEME.dark.fg};
    --color-bg2: ${THEME.dark.bg2};
    --color-accent: ${THEME.dark.accent};
    --color-accent2: ${THEME.dark.accent2};
    --color-border: ${THEME.dark.border};
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
      <Layout {...pageProps}>
        <SimpleReactLightbox>
          <Component {...pageProps} />
        </SimpleReactLightbox>
      </Layout>
    </>
  )
}

export default App
