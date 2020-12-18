import styled from 'styled-components'

export default styled.div`
  ul {
    padding: 0;
  }
  li {
    list-style: none;
    padding: var(--space-1);
    background-color: var(--color-bgDim);
    border: 1px solid var(--color-accent);

    box-shadow: 5px 5px 20px 2px var(--color-bgDim);
    p {
      margin: 1rem 0;
    }
    a {
      margin-left: 1rem;
    }

    margin-bottom: var(--space-1);
    transition: background-color var(--transition-time),
      color var(--transition-time), border var(--transition-time);
  }
`
