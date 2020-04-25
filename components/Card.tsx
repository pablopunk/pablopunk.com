import styled from 'styled-components'
import { themes, basicColors, themeCss } from './utils/themes'
import { smallMediaQuery } from './utils/media-queries'

export default styled.div`
  border-radius: 5px;
  padding: 10px 20px;

  box-shadow: 20px 20px 60px ${themes.light.boxShadow},
    -20px -20px 60px ${themes.light.bg};

  body.dark & {
    box-shadow: none;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 20px 20px 60px #efefef, -20px -20px 60px #ffffff;
    cursor: pointer;
  }

  @media (${smallMediaQuery}) {
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }

  strong {
    margin-top: 1rem;

    ${themeCss({ fg: themes.light.color1 })}
    body.dark & {
      ${themeCss({ fg: themes.dark.color1 })}
    }

    .negative & {
      color: ${themes.light.color2};
      body.dark & {
        color: ${themes.dark.color2};
      }
    }
  }
`
