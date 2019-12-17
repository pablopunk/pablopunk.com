import React from 'react'
import Nav from './Nav'
import Meta from './Meta'
import Header from './Header'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

let currentTheme = 1

const themes = [
  {
    bg: 'white',
    bgDim: '#dfe6e9',
    fg: '#2d3436',
    fgStrong: 'black',
    color1: '#6c5ce7',
    color2: '#00cec9',
    blendMode: 'multiply'
  },
  {
    bg: 'black',
    bgDim: 'rgba(255,255,255,0.15)',
    fg: '#dadada',
    fgStrong: 'white',
    color1: '#f67280',
    color2: '#81ecec',
    blendMode: 'screen'
  }
]

const getNextTheme = () => {
  let nextTheme = currentTheme + 1
  if (nextTheme >= themes.length) {
    nextTheme = 0
  }

  return nextTheme
}

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
    background-color: ${props => props.theme.bg};
    color: ${props => props.theme.fg};
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.color1};
  }
  a:hover {
    color: ${props => props.theme.color2};
  }
  p {
    font-family: Zilla, serif;
  }
  h1,h2,h3,h4,h5,h6 {
    color: ${props => props.theme.color2};
  }
  a:hover h1 {
    color: ${props => props.theme.color1};
  }
  strong {
    color: ${props => props.theme.fgStrong};
    font-weight: bold;
  }
  section {
    padding: 3rem 0;
    &:after {
        content: '';
        border-bottom: 1px solid ${props => props.theme.bgDim};
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
  background-color: ${props => props.theme.bgDim};
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

const Wheel = () => {
  const [wheelTheme, setWheelTheme] = React.useState(currentTheme)
  const theme = themes[wheelTheme]

  return (
    <svg
      width={wheelSize}
      height={wheelSize}
      viewBox={`0 0 ${wheelSize} ${wheelSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseOver={() => setWheelTheme(getNextTheme())}
      onMouseOut={() => setWheelTheme(currentTheme)}
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
        >
          <stop offset="0.3" stopColor={theme.color1} />
          <stop offset="0.5" stopColor="white" />
          <stop offset="0.7" stopColor={theme.color2} />
        </linearGradient>
      </defs>
    </svg>
  )
}

const Tooltip = ({ children, right = false, message }) => {
  const [showMessage, setShowMessage] = React.useState(false)

  const transformation = showMessage
    ? 'none'
    : right
    ? 'translateX(50vw)'
    : 'translateX(-50vw)'

  return (
    <div
      onMouseEnter={_ => setShowMessage(true)}
      onMouseLeave={_ => setShowMessage(false)}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {right ? null : children}
      <div
        style={{
          display: 'inline-block',
          margin: '0 1rem',
          lineHeight: wheelSize + 'px',
          fontSize: wheelSize + 'px',
          color: themes[currentTheme].fg,
          transform: transformation,
          opacity: showMessage ? 1 : 0,
          transition: 'transform 0.2s ease, opacity 0.9s ease'
        }}
      >
        {message}
      </div>
      {right ? children : null}
    </div>
  )
}

const ChangeThemeButton = ({ setTheme }) => (
  <CustomButton
    onClick={_ev => {
      const nextTheme = getNextTheme()
      setTheme(nextTheme)
      currentTheme = nextTheme
    }}
  >
    <Tooltip message="Change theme">
      <Wheel />
    </Tooltip>
  </CustomButton>
)

const StyledFooter = styled.footer`
  text-align: center;
  margin: 2rem 0 3rem;
  padding-top: 2rem;
  font-size: 1.7rem;
  border-top: 3px solid ${props => props.theme.bgDim};
  color: ${props => props.theme.fg};
  opacity: 0.7;
`

const DonateButton = () => (
  <Tooltip message="Donate" right>
    <div style={{ fontSize: '2rem', marginRight: '1rem' }}>
      <a href="//paypal.me/pablopunk/5">💳</a>
    </div>
  </Tooltip>
)

export default ({ children, ssr }) => {
  const [theme, setTheme] = React.useState(currentTheme)
  const mainRef = React.useRef(null)
  const scrollToMain = () => window.scrollTo(0, mainRef.current.offsetTop)

  React.useEffect(() => {
    if (!ssr) {
      // only scroll to main tag on client navigation
      scrollToMain()
    }
  })

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Meta />
      <TopBar>
        <ChangeThemeButton setTheme={setTheme} />
        <DonateButton />
      </TopBar>
      <Inner>
        <Header />
        <Nav />
        <StyledMain ref={mainRef}>{children}</StyledMain>
        <StyledFooter>© Pablo Varela {new Date().getFullYear()}</StyledFooter>
      </Inner>
    </ThemeProvider>
  )
}
