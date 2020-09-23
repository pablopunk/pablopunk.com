import React from 'react'
import Nav from 'components/skeleton/Nav'
import Meta from 'components/skeleton/Meta'
import styled, { createGlobalStyle } from 'styled-components'
import { smallMediaQuery } from 'components/utils/media-queries'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Caviar';
    src: url('/fonts/CaviarDreams.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto-Light.ttf') format('truetype');
  }
  :root {
    font-size: 10px;

    --space-1: 0.75rem;
    --space-2: 1.25rem;
    --space-3: 2.5rem;
    --space-4: 3.5rem;
    --space-5: 4.5rem;
    --space-6: 6rem;

    --font-fancy: Caviar;
  }
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  html,body {
    position: relative;
    overflow-x: hidden;
    z-index: 1;
    width: 100vw;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, Roboto, BlinkMacSystemFont, sans-serif;

    --nav-height: 40px;
    --footer-height: 7vh;

    --color-bg: white;
    --color-bgDim: #f4f4f4;
    --color-fg: #454545;
    --color-fgStrong: black;
    --color-accent: #05899E;
    --color-accent2: #5A84AE;
    --color-bg-blur: #2d343444;
    --color-blendMode: multiply;

    --transition-time: 0.3s;

    color: var(--color-fg);
    background-color: var(--color-bg);

    transition: background-color var(--transition-time), color var(--transition-time);
  }
  body.dark {
   --color-bg: #06191D;
   --color-bgDim: #141e3b;
   --color-fg: #bebebe;
   --color-fgStrong: white;
   --color-accent: #A2FADE;
   --color-accent2: #BEE5FD;
   --color-bg-blur: #2d343477;
   --color-blendMode: screen;
  }
  body.dark .show-dark {
    display: block;
  }
  body.dark .show-light {
    display: none;
  }
  body:not(.dark) .show-light {
    display: block;
  }
  body:not(.dark) .show-dark {
    display: none;
  }
  a {
    text-decoration: none;
    color: var(--color-accent);
  }
  a:hover {
    color: var(--color-accent2);
  }
  li {
    color: var(--color-fg);
  }
  h1,h2,h3,h4,h5,h6 {
    color: var(--color-accent2);
    font-family: var(--font-fancy);
  }
  a:hover h1 {
    color: var(--color-accent);
  }
  strong {
    font-weight: bold;
    color: --color-fgStrong;
  }
  section {
    padding: var(--space-3) 0;
  }
  svg {
    vertical-align: middle;
  }
`

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  font-size: 1.8rem;
  @media (${smallMediaQuery}) {
    font-size: 2.3rem;
  }
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: calc(100vh - var(--nav-height));
`

const StyledMain = styled.main`
  padding: 0 2rem;
  flex: 1 0 auto;
`

const StyledFooter = styled.footer`
  flex-shrink: 0;

  height: var(--footer-height);
  font-size: 1.7rem;
  opacity: 0.5;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  a:hover {
    cursor: pointer;
  }
  p {
    margin: 0;
  }

  div {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (${smallMediaQuery}) {
    display: none;
  }
`

interface IPageProps {
  children
  locale
  nav: { main: Array<{ text: string; link: string }> }
  allDonateLinks: Array<{ link: string; label: string }>
  footer: { copyright: string }
  metaTags
}

export default function withLayout(PageComponent, path?: string) {
  return function Layout({
    children,
    locale = 'en',
    nav,
    allDonateLinks,
    footer,
    metaTags,
    ...props
  }: IPageProps) {
    return (
      <>
        <GlobalStyle />
        <Meta {...metaTags} locale={locale} />
        <Nav
          {...nav}
          allDonateLinks={allDonateLinks}
          locale={locale}
          path={path}
        />
        <Inner>
          <StyledMain>
            <PageComponent {...props} locale={locale} />
          </StyledMain>
          <StyledFooter>
            <div dangerouslySetInnerHTML={{ __html: footer.copyright }}></div>
          </StyledFooter>
        </Inner>
      </>
    )
  }
}
