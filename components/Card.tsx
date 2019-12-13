import styled from 'styled-components'

export default styled.div`
  box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: ${props => props.theme.bg};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  & > * {
    margin: 5px 0;
  }

  strong {
    color: ${props => props.theme.color1};
  }
`
