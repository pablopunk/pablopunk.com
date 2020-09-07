import styled from "styled-components";

export default styled.div`
  border-radius: 5px;
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border var(--transition-time), background var(--transition-time),
    color var(--transition-time);
  box-shadow: 5px 5px 20px 2px rgba(0, 0, 0, 0.05);

  border: 1px solid var(--color-bgDim);
  &:hover {
    border: 1px solid var(--color-accent);
  }

  background-color: var(--color-bg);
  border: 1px solid var(--color-bgDim);

  strong {
    margin-top: 1rem;
    color: var(--color-accent);

    .negative & {
      color: var(--color-accent2);
    }
  }
`;
