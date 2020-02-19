import styled from 'styled-components'
import { themes, transition } from './common/themes'

export default styled.ul`
  list-style: none;
  margin: 1rem;
  padding: 0;
  li {
    padding: 1rem;
    transition: border-left ${transition}, color ${transition};
    border-left: 2px solid ${themes.light.color2};
    body.dark & {
      border-left: 2px solid ${themes.dark.color2};
    }
    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
    p {
      margin: 1rem 0;
    }
    &:before {
      content: '-';
      position: absolute;
      margin-left: -2rem;
      color: ${themes.light.color2};
      body.dark & {
        color: ${themes.dark.color2};
      }
    }
  }
`
