import styled from 'styled-components'
import { themes, basicColors, themeCss } from 'components/utils/themes'
import { smallMediaQuery } from 'components/utils/media-queries'

export default styled.div`
  border-radius: 5px;
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border 0.4s;

  border: 1px solid ${themes.light.bgDim};
  &:hover {
    border: 1px solid ${themes.light.color1};
  }

  body.dark & {
    border: 1px solid ${themes.dark.bgDim};
    &:hover {
      border: 1px solid ${themes.dark.color1};
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
