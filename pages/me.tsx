import { NextSeo } from 'next-seo'
import CenterFlex from '../components/layout/CenterFlex'
import styled from 'styled-components'
import { serverSideProps } from '../components/data/withCMS'

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

export default ({ content }) => (
  <CenterFlex>
    <NextSeo
      title="Pablo Varela | About me. Experience and Education"
      description="Some things about me. Where I worked, where I work, my education, etc."
    />
    <StyledGrid>
      {flat(content).map((item) => (
        <div key={item} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </StyledGrid>
  </CenterFlex>
)

export const getServerSideProps = async (ctx) => serverSideProps(ctx, 'about')
