import CenterFlex from '../../components/layout/CenterFlex'
import styled from 'styled-components'
import Page, { IPageProps } from '../../components/layout/Page'
import { staticProps, staticPaths } from '../../components/data/withCMS'

const StyledGrid = styled.div`
  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr 15fr;
  align-items: flex-start;
  grid-gap: 20px;
`

const textFromParagraphTag = (html: string) =>
  html.replace(/<p>(.*)<\/p>/, '$1')

function flat(rows) {
  const output = []
  for (const row of rows) {
    output.push(textFromParagraphTag(row.column1))
    output.push(textFromParagraphTag(row.column2))
  }

  return output
}

interface IProps extends IPageProps {
  content
}

export default ({ content, ...props }: IProps) => (
  <Page {...props} path="me">
    <CenterFlex>
      <StyledGrid>
        {flat(content).map((item) => (
          <div key={item} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </StyledGrid>
    </CenterFlex>
  </Page>
)

export const getStaticProps = (ctx) => staticProps('about', ctx)
export const getStaticPaths = staticPaths
