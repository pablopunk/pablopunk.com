import styled from 'styled-components'
import Page, { IPageProps, footerHeight } from 'components/layout/Page'
import { staticProps, staticPaths } from 'components/data/withCMS'
import { smallMediaQuery } from 'components/utils/media-queries'

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

const StyledContent = styled.div`
  height: ${100 - footerHeight}vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (${smallMediaQuery}) {
    height: 100%;
    margin-top: 50px;
  }
`

interface IProps extends IPageProps {
  content
}

export default ({ content, ...props }: IProps) => {
  content = content.replace('%years%', howOldAmI())

  return (
    <Page {...props} path="me">
      <StyledContent>
        <StyledGrid>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </StyledGrid>
      </StyledContent>
    </Page>
  )
}

export const getStaticProps = (ctx) => staticProps('about', ctx)
export const getStaticPaths = staticPaths
