import React from 'react'
import styled from 'styled-components'
import CenterFlex from '../../components/layout/CenterFlex'
import { themes } from '../../components/utils/themes'
import Page, { IPageProps } from '../../components/layout/Page'
import { staticProps, staticPaths } from '../../components/data/withCMS'
import { fetchData } from '../../lib/api'

const CustomImageHover = styled.div<{
  src: string
  srcHover: string
}>`
  display: block;
  min-width: 150px;
  min-height: 150px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid ${themes.light.color2};
  body.dark & {
    border: 5px solid ${themes.dark.color2};
  }

  background-size: cover;
  background-image: url(${(props) => props.src});
  &:hover {
    background-image: url(${(props) => props.srcHover});
  }

  transition: background-image 0.5s;
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
}: IProps) => (
  <Page {...props}>
    <br />
    <CenterFlex height="60vh" marginTop="20px">
      <CustomImageHover
        src={profilePicture.url}
        srcHover={profilePictureHover.url}
        title={profilePicture.alt}
      />
      <div
        style={{ maxWidth: '600px' }}
        dangerouslySetInnerHTML={{ __html: abstract }}
      />
    </CenterFlex>
  </Page>
)

export const getStaticProps = (ctx) => staticProps('home', ctx)
export const getStaticPaths = staticPaths
