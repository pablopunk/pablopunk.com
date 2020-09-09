import Link from 'next/link'
import styled from 'styled-components'
import { smallMediaQuery } from 'components/utils/media-queries'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import { GiReceiveMoney } from 'react-icons/gi'

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  a {
    padding: 0 var(--space-1);
    font-size: 2.25rem;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    color: var(--color-accent2);
  }
  @media (hover: hover) {
    a:hover {
      color: var(--color-accent);
    }
  }
  a.current {
    color: var(--color-accent);
  }
  @media (${smallMediaQuery}) {
    justify-content: center;
    a {
      font-size: 1.6rem;
    }
    a.current {
      display: none;
    }
  }
`

const StyledBar = styled.div`
  position: relative;
  left: 0;
  z-index: 200;
  height: var(--nav-height);
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RightButtons = styled.div`
  display: flex;
  margin-right: var(--space-2);
  a {
    font-size: 2.4rem;
    margin-left: var(--space-2);
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
          <div key={link.id}>
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
          window['__toggleDarkMode']()
        }}
        title="Toggle light/dark colors"
      >
        <span className="show-dark">
          <RiMoonClearLine />
        </span>
        <span className="show-light">
          <RiSunLine />
        </span>
      </a>
      <a href="/donate" title="Donate">
        <GiReceiveMoney />
      </a>
    </RightButtons>
  </StyledBar>
)

export default Nav
