import React from 'react'
import Nav from 'components/layout/Nav'
import Meta from 'components/Meta'
import styled, { createGlobalStyle } from 'styled-components'
import { themes, basicColors, transition } from 'components/utils/themes'
import { StyledStop, StyledStopNegative } from 'components/svg/Styled'
import { themeCss } from 'components/utils/themes'
import { smallMediaQuery } from 'components/utils/media-queries'

const dottedBody = `
  background-position: 0 0, var(--space-3) var(--space-3);
  background-size: calc(var(--space-3) * 2) calc(var(--space-3) * 2);
  background-image: radial-gradient(${themes.light.fg}33 1px, transparent 1px), radial-gradient(${themes.light.fg}44 1px, transparent 1px);
  &.dark {
    background-image: radial-gradient(${themes.dark.fg}33 1px, transparent 1px), radial-gradient(${themes.dark.fg}44 1px, transparent 1px);
  }
`

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
    ${basicColors('light')}
    &.dark {
      ${basicColors('dark')}
    }
    ${dottedBody}

    --nav-height: 40px;
    --footer-height: 7vh;
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
    ${themeCss({ fg: themes.light.color1 })}
    body.dark & {
      ${themeCss({ fg: themes.dark.color1 })}
    }
  }
  a:hover {
    color: ${themes.light.color2};
    body.dark & {
      color: ${themes.dark.color2};
    }
  }
  p {
    ${themeCss({ fg: themes.light.fg })}
    body.dark & {
      ${themeCss({ fg: themes.dark.fg })}
    }
  }
  li {
    ${themeCss({ fg: themes.light.fg })}
    body.dark & {
      ${themeCss({ fg: themes.dark.fg })}
    }
  }
  h1,h2,h3,h4,h5,h6 {
    ${themeCss({ fg: themes.light.color2 })}
    body.dark & {
      ${themeCss({ fg: themes.dark.color2 })}
    }
  }
  a:hover h1 {
    color: ${themes.light.color1};
    body.dark & {
      color: ${themes.dark.color1};
    }
  }
  strong {
    font-weight: bold;
    ${themeCss({ fg: themes.light.fgStrong })}
    body.dark & {
      ${themeCss({ fg: themes.dark.fgStrong })}
    }
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

const StyledText = styled.span`
  padding: 0.3rem 1rem;
  border-radius: 5px;

  opacity: 0;
  border: none;
  &.show {
    opacity: 1;
    border: 1px solid ${themes.light.fg};
  }
  body.dark &.show {
    border: 1px solid ${themes.dark.bgDim};
  }

  color: ${themes.light.bg};
  background-color: ${themes.light.fg};
  body.dark & {
    color: ${themes.dark.bg};
    background-color: ${themes.dark.fg};
  }
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

export default (PageComponent, path?: string) => ({
  children,
  locale = 'en',
  nav,
  footer,
  metaTags,
  ...props
}: IPageProps) => (
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
