import React from 'react'
import styled from 'styled-components'
import TextLoop from 'react-text-loop'
import withLayout from 'components/layout/withLayout'
import { staticProps, staticPaths } from 'components/data/withCMS'
import { smallMediaQuery } from 'components/utils/media-queries'
import FixedCenter from 'components/layout/FixedCenter'

const StyledContent = styled.section`
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: var(--space-1);
    }
  }
  h1 {
    margin-top: 0;
  }
  p {
    max-width: 300px;
  }
`

const initialLoopDelay = 0
const initialLoop = 800
const timeToShowLoop = 5000
const timeToIdleLoop = 3000

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
      <StyledContent>
        <h1>
          <span>pablo</span>
          <TextLoop interval={freq} delay={initialLoopDelay}>
            <span>.pink</span>
            <span>varela</span>
            <span>punk</span>
          </TextLoop>
        </h1>
        <article dangerouslySetInnerHTML={{ __html: abstract }} />
      </StyledContent>
    </FixedCenter>
  )
}

export const getStaticProps = (ctx) => staticProps('home', ctx)
export const getStaticPaths = staticPaths
export default withLayout(Page, '')
