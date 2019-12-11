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
    bgContrast: '#bae8e8',
    fg: '#2d3436',
    fgStrong: '#1B1464',
    fgContrast: '#6c5ce7',
    fgContrast2: '#00cec9'
  },
  {
    bg: 'black',
    bgDim: '#636e72',
    bgContrast: '#464159',
    fg: 'white',
    fgStrong: '#ffeaa7',
    fgContrast: '#f67280',
    fgContrast2: '#8bbabb'
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
  }
  body {
    margin: 0;
    padding: 0;
    line-height: 2rem;
    font-family: Raleway, sans-serif;
    background-color: ${props => props.theme.bg};
    color: ${props => props.theme.fg};
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.fgContrast};
  }
  a:hover {
    color: ${props => props.theme.fgContrast2};
  }
  p {
    font-family: Zilla, serif;
  }
  h1 {
    color: ${props => props.theme.fgContrast2};
  }
  a:hover h1 {
    color: ${props => props.theme.fgContrast};
  }
  strong {
    color: ${props => props.theme.fgStrong};
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
  position: fixed;
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
          <stop offset="0.2" stopColor={theme.fgContrast} />
          <stop offset="0.6" stopColor={theme.fgContrast2} />
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
        onMouseEnter={() => setShowMessage(!showMessage)}
        onMouseLeave={() => setShowMessage(!showMessage)}
        onClick={ev => {
          const nextTheme = getNextTheme()
          setTheme(nextTheme)
          setShowMessage(showMessage) // rerender to get the new fg color in the message
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

const StyledBox = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: ${props => props.theme.bgContrast};
`

const StyledFooter = styled.footer`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.7rem;
`

export default ({ children }) => {
  const [theme, setTheme] = React.useState(currentTheme)
  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Meta />
      <ChangeThemeButton setTheme={setTheme} />
      <Inner>
        <Header />
        <Nav />
        <StyledMain>{children}</StyledMain>
        <StyledBox />
        <StyledFooter>© Pablo Varela {new Date().getFullYear()}</StyledFooter>
      </Inner>
    </ThemeProvider>
  )
}
