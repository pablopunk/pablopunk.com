import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import { smallMediaQuery } from '../utils/media-queries'
import { themes, basicColors, themeCss } from '../utils/themes'

const StyledNav = styled.nav`
  position: absolute;
  top: 0;
  z-index: 200;
  width: 100%;
  height: 2.25rem;
  margin: 1rem;
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
    &:hover {
      color: ${themes.light.color1};
      body.dark & {
        color: ${themes.dark.color1};
      }
    }
  }
  @media (${smallMediaQuery}) {
    justify-content: center;
    a {
      font-size: 1.5rem;
    }
  }
`

const Nav = ({ main = [], locale }) => (
  <StyledNav>
    {main.map((link) => (
      <div key={link.id} style={{ position: 'relative' }}>
        <Link href={'/[locale]/' + link.link} as={`/${locale}/${link.link}`}>
          <a>{link.text}</a>
        </Link>
      </div>
    ))}
  </StyledNav>
)

export default Nav
