import styled from 'styled-components'
import { themes } from './common/themes'

export default styled.div`
  box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: ${themes.light.bg};

  body.dark & {
    background-color: ${themes.dark.bg};
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  strong {
    color: ${themes.light.color1};
    body.dark & {
      color: ${themes.dark.color1};
    }

    .negative & {
      color: ${themes.light.color2};
      body.dark & {
        color: ${themes.dark.color2};
      }
    }
  }
`
