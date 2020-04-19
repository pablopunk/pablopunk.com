import React from 'react'
import styled from 'styled-components'
import CenterFlex from '../components/layout/CenterFlex'
import Link from 'next/link'
import { themes } from '../components/utils/themes'
import { serverSideProps } from '../components/data/withCMS'
import Page, { IPageProps } from '../components/layout/Page'

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid ${themes.light.color2};
  body.dark & {
    border: 5px solid ${themes.dark.color2};
  }
`

interface IProps extends IPageProps {
  abstract
  profilePicture
  profilePictureHover
}

export default ({
  abstract = '',
  profilePicture = {},
  profilePictureHover = {},
  ...props
}: IProps) => {
  const [mouseoverImage, setMouseoverImage] = React.useState(false)
  return (
    <Page {...props}>
      <br />
      <CenterFlex>
        <div style={{ display: mouseoverImage ? 'none' : 'block' }}>
          <StyledImage
            src={profilePicture.url}
            alt={profilePicture.alt}
            title={profilePicture.alt}
            onMouseEnter={(ev) => {
              setMouseoverImage(true)
            }}
          />
        </div>
        <div style={{ display: mouseoverImage ? 'block' : 'none' }}>
          <StyledImage
            src={profilePictureHover.url}
            alt={profilePictureHover.alt}
            title={profilePictureHover.alt}
            onMouseLeave={(ev) => {
              setMouseoverImage(false)
            }}
          />
        </div>
        <div
          style={{ maxWidth: '500px' }}
          dangerouslySetInnerHTML={{ __html: abstract }}
        ></div>
      </CenterFlex>
    </Page>
  )
}

export const getServerSideProps = async (ctx) => serverSideProps(ctx, 'home')
