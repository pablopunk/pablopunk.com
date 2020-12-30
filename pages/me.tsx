import styled from 'styled-components'
import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'

const StyledGrid = styled.div`
  div {
    max-width: 600px;
    display: grid;
    grid-template-columns: 1fr 15fr;
    align-items: flex-start;
    grid-gap: 1.6rem;

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

interface IProps {
  content
}

const Page = ({ content }: IProps) => {
  content = content.replace('%years%', howOldAmI())

  return (
    <div className="flex items-center justify-center w-full text-lg fill-height">
      <StyledGrid>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </StyledGrid>
    </div>
  )
}

export const getStaticProps = (ctx) => staticProps('about', ctx)
export default withLayout(Page, 'me')
