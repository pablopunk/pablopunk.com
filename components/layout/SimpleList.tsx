import styled from 'styled-components'
import { themes, transition, themeCss } from 'components/utils/themes'

export default styled.div`
  li {
    list-style: none;
    padding: var(--space-2);
    border-radius: var(--space-1);
    ${themeCss({
      bg: themes.light.bg,
      border: `1px solid ${themes.light.bgDim}`,
    })}

    body.dark & {
      ${themeCss({
        bg: themes.dark.bg,
        border: `1px solid ${themes.dark.bgDim}`,
      })}
    }

    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
    p {
      margin: 1rem 0;
    }
    a {
      margin-left: 1rem;
    }
    margin-bottom: var(--space-2);
  }
`
