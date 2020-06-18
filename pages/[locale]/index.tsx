import React from 'react'
import styled from 'styled-components'
import TextLoop from 'react-text-loop'
import { themes } from 'components/utils/themes'
import withLayout from 'components/layout/withLayout'
import { staticProps, staticPaths } from 'components/data/withCMS'
import { smallMediaQuery } from 'components/utils/media-queries'
import FixedCenter from 'components/layout/FixedCenter'

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

const StyledContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  article {
    margin: 2rem 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    ul {
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      max-width: 400px;
    }
    li {
      list-style: none;
      margin-right: var(--space-2);
      font-size: 2.25rem;
    }
  }
  @media (${smallMediaQuery}) {
    &,
    ul {
      flex-direction: column;
    }
  }
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

interface IProps {
  abstract
  profilePicture
  profilePictureHover
}

const Page = ({
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
    <FixedCenter>
      <H1>
        <span>pablo</span>
        <TextLoop interval={freq} delay={1000}>
          <span>.pink</span>
          <span>varela</span>
          <span>punk</span>
        </TextLoop>
      </H1>
      <StyledContent>
        <CustomImageHover
          src={profilePicture.url}
          srcHover={profilePictureHover.url}
          title={profilePicture.alt}
        />
        <article
          style={{ maxWidth: '600px' }}
          dangerouslySetInnerHTML={{ __html: abstract }}
        />
      </StyledContent>
    </FixedCenter>
  )
}

export const getStaticProps = (ctx) => staticProps('home', ctx)
export const getStaticPaths = staticPaths
export default withLayout(Page, '')
