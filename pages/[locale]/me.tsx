import CenterFlex from 'components/layout/CenterFlex'
import styled from 'styled-components'
import Page, { IPageProps } from 'components/layout/Page'
import { staticProps, staticPaths } from 'components/data/withCMS'

const StyledGrid = styled.div`
  div {
    max-width: 600px;
    display: grid;
    grid-template-columns: 1fr 15fr;
    align-items: flex-start;
    grid-gap: 20px;

    p {
      margin: 0;
    }
  }
`

function howOldAmI() {
  const now = new Date()
  const iHadABirthDayThisYear = now.getMonth() >= 6 && now.getDate() >= 9
  const yearsSinceIWasBorn = now.getFullYear() - 1993

  return iHadABirthDayThisYear ? yearsSinceIWasBorn : yearsSinceIWasBorn - 1
}

interface IProps extends IPageProps {
  content
}

export default ({ content, ...props }: IProps) => {
  content = content.replace('%years%', howOldAmI())

  return (
    <Page {...props} path="me">
      <CenterFlex>
        <StyledGrid>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </StyledGrid>
      </CenterFlex>
    </Page>
  )
}

export const getStaticProps = (ctx) => staticProps('about', ctx)
export const getStaticPaths = staticPaths
