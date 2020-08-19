import React from 'react'
import Nav from 'components/layout/Nav'
import Meta from 'components/Meta'
import styled, { createGlobalStyle } from 'styled-components'
import { StyledStop, StyledStopNegative } from 'components/svg/Styled'
import { smallMediaQuery } from 'components/utils/media-queries'

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 10px;

    --space-1: 0.75rem;
    --space-2: 1.25rem;
    --space-3: 2.5rem;
    --space-4: 3.5rem;
    --space-5: 4.5rem;
    --space-6: 6rem;
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
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;

    --nav-height: 40px;
    --footer-height: 7vh;

    --color-bg: white;
    --color-bgDim: #f4f4f4;
    --color-fg: #454545;
    --color-fgStrong: black;
    --color-accent: #6961a4;
    --color-accent2: #5d908e;
    --color-bg-blur: #2d343444;
    --color-blendMode: multiply;

    --transition-time: 0.3s;

    color: var(--color-fg);
    background-color: var(--color-bg);

    transition: background-color var(--transition-time), color var(--transition-time);
  }
  body.dark {
   --color-bg: black;
   --color-bgDim: #141e3b;
   --color-fg: #bebebe;
   --color-fgStrong: white;
   --color-accent: #94b7ad;
   --color-accent2: #fdadad;
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
  nav: {
    changeThemeButtonDark: string
    changeThemeButtonLight: string
    donateText: string
  }
  footer: { copyright: string }
  metaTags
}

export default function withLayout(PageComponent, path?: string) {
  return function Layout({
    children,
    locale = 'en',
    nav,
    footer,
    metaTags,
    ...props
  }: IPageProps) {
    return (
      <>
        <GlobalStyle />
        <Meta {...metaTags} locale={locale} />
        <Nav {...nav} locale={locale} path={path} />
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
