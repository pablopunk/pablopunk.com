import React from 'react'
import Nav from './Nav'
import Meta from './Meta'
import Header from './Header'
import styled, { createGlobalStyle } from 'styled-components'
import { themes, basicColors } from './common/themes'
import { StyledStop, StyledStopNegative } from './svg/Styled'
import { themeCss } from './common/themes'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Raleway;
    src: url('/fonts/Raleway/Raleway-Regular.ttf');
  }
  @font-face {
    font-family: Zilla;
    src: url('/fonts/Zilla_Slab/ZillaSlab-Regular.ttf');
  }
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
    font-family: Raleway, sans-serif;
    ${basicColors('light')}
    &.dark {
      ${basicColors('dark')}
    }
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
    font-family: Zilla, serif;
    margin: .7rem 0;
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
  font-size: 2rem;
`

const StyledMain = styled.main`
  padding: 0 2rem;
  margin: 100px 0 50px;
`

const TopBar = styled.div`
  position: fixed;
  z-index: 1;
  background-color: ${themes.light.bgDim};
  body.dark & {
    background-color: ${themes.dark.bgDim};
  }
  width: 100%;
  height: 40px;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const wheelSize = 16

const Wheel = ({ mouseOver }) => (
  <svg
    width={wheelSize}
    height={wheelSize}
    viewBox={`0 0 ${wheelSize} ${wheelSize}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="url(#paint0_linear)" />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="16.25"
        y1="8"
        x2="-0.25"
        y2="8"
        gradientUnits="userSpaceOnUse"
        className={mouseOver ? 'negative' : ''}
      >
        <StyledStop offset="0.3" />
        <stop offset="0.5" stopColor="white" />
        <StyledStopNegative offset="0.7" />
      </linearGradient>
    </defs>
  </svg>
)

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
          lineHeight: wheelSize + 'px',
          fontSize: wheelSize + 'px',
          transform: transformation,
          transition: 'transform 0.2s ease, opacity 0.9s ease'
        }}
      >
        <StyledText className={show ? 'show' : ''}>{message}</StyledText>
      </div>
      {right ? children : null}
    </div>
  )
}

const ChangeThemeButton = () => {
  const [mouseOver, setMouseOver] = React.useState(false)

  return (
    <CustomButton
      onClick={_ev => {
        // __toggleDarkMode
        window['__' + 'toggleDarkMode']()
      }}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      <Tooltip message="Change theme" show={mouseOver}>
        <Wheel mouseOver={mouseOver} />
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
  ${basicColors('light')}
  body.dark & {
    ${basicColors('dark')}
  }
  opacity: 0.7;
`

const DonateButton = () => {
  const [mouseOver, setMouseOver] = React.useState(false)

  return (
    <CustomButton
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      onClick={() => window.open('/donate')}
    >
      <Tooltip message="Donate" right show={mouseOver}>
        <div style={{ fontSize: '2rem', marginRight: '1rem' }}>
          <a href="/donate">💳</a>
        </div>
      </Tooltip>
    </CustomButton>
  )
}

export default ({ children }) => {
  const scrollRef = React.useRef(null)
  // const scrollToRef = () => window.scrollTo(0, scrollRef.current.offsetTop)

  /* React.useEffect(() => { */
  /*   if (!ssr) { */
  /*     scrollToRef() */
  /*   } */
  /* }) */

  return (
    <>
      <GlobalStyle />
      <Meta />
      <TopBar>
        <ChangeThemeButton />
        <DonateButton />
      </TopBar>
      <Inner>
        <Header />
        <Nav />
        <div ref={scrollRef}>
          <StyledMain>{children}</StyledMain>
        </div>
        <StyledFooter>
          © Pablo Varela {new Date().getFullYear()} |{' '}
          <a href="https://github.com/pablopunk/pablo.pink/">See source</a>
        </StyledFooter>
      </Inner>
    </>
  )
}
