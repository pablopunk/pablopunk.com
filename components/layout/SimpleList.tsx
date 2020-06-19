import styled from 'styled-components'

export default styled.div`
  ul {
    padding: 0;
  }
  li {
    list-style: none;
    padding: var(--space-1);
    border-radius: var(--space-1);
    background-color: var(--color-bg);
    border: 1px solid var(--color-bgDim);

    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
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
