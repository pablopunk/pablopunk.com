import React from 'react'
import Nav from './Nav'
import Meta from './Meta'
import Header from './Header'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

let currentTheme = 0

const themes = [
  {
    bg: 'white',
    bgDim: '#dfe6e9',
    fg: '#2d3436',
    fgStrong: '#1B1464',
    color1: '#6c5ce7',
    color2: '#00cec9'
  },
  {
    bg: 'black',
    bgDim: '#636e72',
    fg: 'white',
    fgStrong: '#f6e58d',
    color1: '#f67280',
    color2: '#c7ecee'
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
    z-index: 1;
    width: 100vw;
    overflow-x: hidden;
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
  h1 {
    color: ${props => props.theme.color2};
  }
  a:hover h1 {
    color: ${props => props.theme.color1};
  }
  strong {
    color: ${props => props.theme.fgStrong};
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

const TopLeftFloat = styled.div`
  position: relative;
  top: 10px;
  left: 10px;
`
const CustomButton = styled.button`
  border: none;
  background-color: ${props => props.theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
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

const ChangeThemeButton = ({ setTheme }) => {
  const [showMessage, setShowMessage] = React.useState(false)
  return (
    <TopLeftFloat>
      <CustomButton
        onMouseEnter={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
        onClick={ev => {
          const nextTheme = getNextTheme()
          setTheme(nextTheme)
          setShowMessage(false)
          currentTheme = nextTheme
        }}
      >
        <Wheel />
        {showMessage && (
          <span
            style={{
              lineHeight: wheelSize + 'px',
              fontSize: wheelSize + 'px',
              color: themes[currentTheme].fg
            }}
          >
            Change theme
          </span>
        )}
      </CustomButton>
    </TopLeftFloat>
  )
}

const StyledFooter = styled.footer`
  text-align: center;
  margin: 2rem 0 3rem;
  padding-top: 2rem;
  font-size: 1.7rem;
  border-top: 3px solid ${props => props.theme.bgDim};
`

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
      <ChangeThemeButton setTheme={setTheme} />
      <Inner>
        <Header />
        <Nav />
        <StyledMain ref={mainRef}>{children}</StyledMain>
        <StyledFooter>© Pablo Varela {new Date().getFullYear()}</StyledFooter>
      </Inner>
    </ThemeProvider>
  )
}
