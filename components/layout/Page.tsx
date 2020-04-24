import React from 'react'
import Nav from './Nav'
import Meta from '../Meta'
import styled, { createGlobalStyle } from 'styled-components'
import { themes, basicColors } from '../utils/themes'
import { StyledStop, StyledStopNegative } from '../svg/Styled'
import { themeCss } from '../utils/themes'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
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
    margin: 1rem 0;
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
    padding: 3rem 0;
    &:after {
        content: '';
        border-bottom: 1px solid ${themes.light.bgDim};
        body.dark & {
          border-bottom: 1px solid ${themes.dark.bgDim};
        }
        position: absolute;
        width: 100%;
        left: 0;
        padding-top: 3rem;
    }
    &:last-child:after {
      border: none;
    }
  }
`

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  font-size: 1.8rem;
`

const StyledMain = styled.main`
  padding: 0 2rem;
  margin-bottom: 50px;
`

const CustomButton = styled.button`
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  * {
    margin: 3px;
  }
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
const Tooltip = ({ children, right = false, message, show }) => {
  const transformation = show
    ? 'none'
    : right
    ? 'translateX(50vw)'
    : 'translateX(-50vw)'

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {right ? null : children}
      <div
        style={{
          display: 'inline-block',
          margin: '0 1rem',
          lineHeight: '16px',
          fontSize: '16px',
          transform: transformation,
          transition: 'transform 0.2s ease, opacity 0.9s ease',
          fontFamily:
            "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        }}
      >
        <StyledText className={show ? 'show' : ''}>{message}</StyledText>
      </div>
      {right ? children : null}
    </div>
  )
}

const ChangeThemeButton = ({ title }) => {
  const [mouseOver, setMouseOver] = React.useState(false)
  const moon = mouseOver ? 'show-light' : 'show-dark'
  const sun = mouseOver ? 'show-dark' : 'show-light'

  return (
    <CustomButton
      onClick={(_ev) => {
        // __toggleDarkMode
        window['__' + 'toggleDarkMode']()
        setMouseOver(false)
      }}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      <Tooltip message={title} show={mouseOver}>
        <a className={moon}>🌙</a>
        <a className={sun}>🌞</a>
      </Tooltip>
    </CustomButton>
  )
}

const StyledFooter = styled.footer`
  text-align: center;
  margin: 2rem 0 3rem;
  padding-top: 2rem;
  font-size: 1.7rem;
  border-top: 3px solid ${themes.light.bgDim};
  opacity: 0.7;
  ${basicColors('light')}
  body.dark & {
    ${basicColors('dark')}
  }
  a:hover {
    cursor: pointer;
  }
`

const DonateButton = ({ title }) => {
  const [mouseOver, setMouseOver] = React.useState(false)

  return (
    <CustomButton
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      onClick={() => window.open('/donate')}
    >
      <Tooltip message={title} right show={mouseOver}>
        <div style={{ fontSize: '2rem', marginRight: '1rem' }}>
          <a href="/donate">💳</a>
        </div>
      </Tooltip>
    </CustomButton>
  )
}

export interface IPageProps {
  children
  locale
  nav: { changeThemeText: string; donateText: string }
  footer
  metaTags
}

export default ({
  children,
  locale = 'en',
  nav,
  footer = {},
  metaTags,
}: IPageProps) => (
  <>
    <GlobalStyle />
    <Meta {...metaTags} locale={locale} />
    <Nav {...nav} locale={locale} />
    <Inner>
      <StyledMain>{children}</StyledMain>
      <StyledFooter>
        <div dangerouslySetInnerHTML={{ __html: footer.copyright }}></div>
        <p>
          <a
            onClick={() => {
              window['__' + 'toggleDarkMode']()
            }}
          >
            {nav.changeThemeText}
          </a>
        </p>
        <p>
          <a
            onClick={() => {
              window.open('/donate')
            }}
          >
            {nav.donateText}
          </a>
        </p>
      </StyledFooter>
    </Inner>
  </>
)
