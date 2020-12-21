import React from 'react'
import withLayout from 'components/skeleton/withLayout'
import CenterFlexColumns from 'components/containers/CenterFlexColumns'
import { staticProps } from 'components/data-fetch/withCMS'
import styled from 'styled-components'

interface IProps {
  content: string
}

function Stack({ content }: IProps) {
  return (
    <CenterFlexColumns>
      <StyledSection
        dangerouslySetInnerHTML={{ __html: content }}
      ></StyledSection>
    </CenterFlexColumns>
  )
}

const StyledSection = styled.section`
  h3:before {
    content: '# ';
  }
  blockquote {
    background-color: var(--color-bgDim);
    padding: var(--space-1) var(--space-2);
    margin: 0;
    border-left: 2px solid var(--color-accent);
  }
  blockquote:after {
    content: '🇪🇸';
    position: absolute;
    top: 5px;
    left: 10px;
    transform: rotate(-15deg);
    font-size: 3rem;
  }
`

export const getStaticProps = (ctx) => staticProps('stack', ctx)
export default withLayout(Stack, 'stack')
