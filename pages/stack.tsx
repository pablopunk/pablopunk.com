import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'
import styled from 'styled-components'

interface IProps {
  content: string
}

function Stack({ content }: IProps) {
  return (
    <>
      <StyledSection
        dangerouslySetInnerHTML={{ __html: content }}
      ></StyledSection>
    </>
  )
}

const StyledSection = styled.section`
  max-width: 700px;
  margin: 1rem auto;
  text-align: justify;
  h2 {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
  h3 {
    color: var(--color-fg);
    font-weight: bold;
    font-size: 1.3rem;
  }
  h3:before {
    content: '# ';
  }
  blockquote {
    position: relative;
    background-color: var(--color-bg2);
    padding: 0.4rem 1rem;
    margin: 0;
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
  p {
    margin: 1rem 0;
  }
`

export const getStaticProps = (ctx) => staticProps('stack', ctx)
export default withLayout(Stack, 'stack')
