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
`

export const getStaticProps = (ctx) => staticProps('stack', ctx)
export default withLayout(Stack, 'stack')
