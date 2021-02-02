import styled from 'styled-components'

export default styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  p {
    text-align: justify;
    margin: 1rem 0;
  }

  .body {
    width: 100%;
  }

  figure,
  img {
    max-width: 100%;
    border-radius: 1rem;
    position: relative;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  h3 {
    color: var(--color-fg);
    font-weight: bold;
    font-size: 1.3rem;
    text-align: left;
    margin-top: 1rem;
  }

  h3:before {
    content: '# ';
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
    align-self: center;
  }

  blockquote {
    position: relative;
    background-color: var(--color-bg2);
    padding: 0.4rem 1rem;
    margin: 1rem 0;
    border-left: 2px solid var(--color-accent);
    width: 100%;
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
