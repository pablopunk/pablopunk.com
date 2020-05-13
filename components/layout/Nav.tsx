import Link from 'next/link'
import Router from 'next/router'
import styled, { keyframes } from 'styled-components'
import { smallMediaQuery } from 'components/utils/media-queries'
import { themes, basicColors, themeCss } from 'components/utils/themes'

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  a {
    padding: 1rem;
    font-size: 2.25rem;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    ${themeCss({ fg: themes.light.color2 })}
    body.dark & {
      ${themeCss({ fg: themes.dark.color2 })}
    }
  }
  @media (hover: hover) {
    a:hover {
      color: ${themes.light.color1};
      body.dark & {
        color: ${themes.dark.color1};
      }
    }
  }
  a.current {
    ${themeCss({ fg: themes.light.color1 })}
    body.dark & {
      ${themeCss({ fg: themes.dark.color1 })}
    }
  }
  @media (${smallMediaQuery}) {
    justify-content: center;
    a {
      font-size: 1.2rem;
    }
    a.current {
      display: none;
    }
  }
`

const StyledBar = styled.div`
  position: absolute;
  top: 1rem;
  left: 0;
  z-index: 200;
  height: 2.3rem;
  width: 100vw;
  padding: 1rem 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RightButtons = styled.div`
  display: flex;
  margin-right: 1rem;
  a {
    font-size: 2.4rem;
    margin-left: 1rem;
    cursor: pointer;
  }
  @media (hover: hover) {
    a:hover {
      opacity: 0.7;
    }
  }
`

const Nav = ({
  main = [],
  changeThemeButtonDark,
  changeThemeButtonLight,
  donateText,
  locale,
  path,
}) => (
  <StyledBar>
    <StyledNav>
      {main.map((link) => {
        let current = link.link === path

        return (
          <div key={link.id} style={{ position: 'relative' }}>
            <Link
              href={'/[locale]/' + link.link}
              as={`/${locale}/${link.link}`}
            >
              <a className={current ? 'current' : ''}>{link.text}</a>
            </Link>
          </div>
        )
      })}
    </StyledNav>
    <RightButtons>
      <a
        onClick={() => {
          window['__' + 'toggleDarkMode']()
        }}
        title="Toggle light/dark colors"
      >
        <span className="show-dark">{changeThemeButtonDark}</span>
        <span className="show-light">{changeThemeButtonLight}</span>
      </a>
      <a href="/donate" title="Donate">
        {donateText}
      </a>
    </RightButtons>
  </StyledBar>
)

export default Nav
