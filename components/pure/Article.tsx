import styled from 'styled-components'

export default styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--color-bg);

  p {
    text-align: justify;
  }

  .body {
    width: 100%;
    max-width: 600px;
  }

  figure,
  img {
    width: 100%;
    border-radius: var(--space-2);
    position: relative;
  }

  img {
    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
  }

  h1 {
    text-align: center;
  }

  pre {
    font-family: 'SF Mono', Menlo, monospace;
    background-color: var(--color-bgDim);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--space-1);
    box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);
    overflow-x: scroll;
  }

  code {
    color: var(--color-accent);
    font-family: 'SF Mono', Menlo, monospace;
    font-size: 85%;
  }

  strong {
    color: var(--color-accent);
  }

  em {
    color: var(--color-accent2);
  }

  small {
    opacity: 0.8;
  }
`
