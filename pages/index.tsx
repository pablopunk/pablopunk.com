import styled from 'styled-components'
import CenterFlex from '../components/layout/CenterFlex'
import Link from 'next/link'
import { themes } from '../components/utils/themes'
import { serverSideProps } from '../components/data/withCMS'

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid ${themes.light.color2};
  body.dark & {
    border: 5px solid ${themes.dark.color2};
  }
`
export default ({ abstract, profilePicture }) => (
  <CenterFlex>
    <StyledImage
      src={profilePicture.url}
      alt={profilePicture.alt}
      title={profilePicture.alt}
    />
    <div
      style={{ maxWidth: '500px' }}
      dangerouslySetInnerHTML={{ __html: abstract }}
    ></div>
  </CenterFlex>
)

export const getServerSideProps = async (ctx) => serverSideProps(ctx, 'home')
