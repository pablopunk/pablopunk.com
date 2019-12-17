import styled from 'styled-components'

export default styled.ul`
  list-style: none;
  margin: 1rem;
  padding: 0;
  li {
    padding: 1rem;
    border-left: 2px solid ${props => props.theme.color2};
    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
    p {
      margin: 1rem 0;
    }
    &:before {
      content: '-';
      position: absolute;
      margin-left: -2rem;
      color: ${props => props.theme.color2};
    }
  }
`
