import styled from 'styled-components'
import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'
import Image from 'next/image'

const StyledGrid = styled.div`
  div {
    max-width: 600px;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 15fr;
    align-items: flex-start;
    grid-gap: 1.3rem;

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
  image
  content
}

const Page = ({ content, image }: IProps) => {
  content = content.replace('%years%', howOldAmI())

  return (
    <div className="flex flex-col items-center w-full my-2 text-lg">
      <div className="my-2">
        <Image
          src={image.url}
          alt={image.alt}
          width={700}
          height={588}
          className="rounded"
        />
      </div>
      <StyledGrid>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </StyledGrid>
    </div>
  )
}

export const getStaticProps = (ctx) => staticProps('about', ctx)
export default withLayout(Page, 'me')
