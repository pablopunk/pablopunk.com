import styled from 'styled-components'
import { themes, transition } from '../utils/themes'

export default styled.div`
  li {
    list-style: none;
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
    a {
      margin-left: 1rem;
    }
    &:before {
      content: '-';
      position: absolute;
      margin-left: -1rem;
      color: ${themes.light.color2};
      body.dark & {
        color: ${themes.dark.color2};
      }
    }
  }
`
