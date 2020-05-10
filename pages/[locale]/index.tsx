import React from 'react'
import styled from 'styled-components'
import TextLoop from 'react-text-loop'
import CenterFlex from '../../components/layout/CenterFlex'
import { themes } from '../../components/utils/themes'
import Page, { IPageProps } from '../../components/layout/Page'
import { staticProps, staticPaths } from '../../components/data/withCMS'

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

const H1 = styled.h1`
  font-size: 4rem;
  width: 100%;
  text-align: center;
  height: 5.25rem;
  overflow: hidden;
`

const initialLoop = 1000
const timeToShowLoop = 7000
const timeToIdleLoop = 4000

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
  const [freq, setFreq] = React.useState(initialLoop)

  React.useEffect(() => {
    if (freq === 0) {
      setTimeout(() => {
        setFreq(initialLoop)
      }, timeToIdleLoop)
    } else {
      setTimeout(() => {
        setFreq(0)
      }, timeToShowLoop)
    }
  })

  return (
    <Page {...props} path="">
      <CenterFlex column marginTop="10vh">
        <H1>
          <span>pablo</span>
          <TextLoop interval={freq} delay={1000}>
            <span>.pink</span>
            <span>varela</span>
            <span>punk</span>
          </TextLoop>
        </H1>
        <CenterFlex free marginTop="20px">
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
      </CenterFlex>
    </Page>
  )
}

export const getStaticProps = (ctx) => staticProps('home', ctx)
export const getStaticPaths = staticPaths
