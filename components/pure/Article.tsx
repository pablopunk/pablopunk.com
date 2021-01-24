import styled from 'styled-components'

export default styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: justify;
    margin: 1rem 0;
  }

  .body {
    width: 100%;
    max-width: 600px;
  }

  figure,
  img {
    width: 100%;
    border-radius: 1rem;
    position: relative;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
  }

  pre {
    font-family: 'SF Mono', Menlo, monospace;
    background-color: var(--color-bg2);
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
    overflow-x: scroll;
  }

  code {
    color: var(--color-accent2);
    font-family: 'SF Mono', Menlo, monospace;
    font-size: 85%;
  }

  strong {
    color: var(--color-accent);
  }

  em {
    color: var(--color-accent);
  }

  small {
    opacity: 0.8;
    margin: 1rem 0;
  }

  blockquote {
    position: relative;
    background-color: var(--color-bg2);
    padding: 0.4rem 1rem;
    margin: 1rem 0;
    border-left: 2px solid var(--color-accent);
  }
  blockquote:after {
    content: '🇪🇸';
    position: absolute;
    right: 2px;
    bottom: -8px;
    transform: rotate(-15deg);
    font-size: 2rem;
  }
`
