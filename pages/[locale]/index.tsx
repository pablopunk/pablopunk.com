import React from 'react'
import styled from 'styled-components'
import TextLoop from 'react-text-loop'
import withLayout from 'components/skeleton/withLayout'
import { staticProps, staticPaths } from 'components/data-fetch/withCMS'
import FixedCenter from 'components/containers/FixedCenter'
import Card from 'components/containers/Card'
import { smallMediaQuery } from 'components/utils/media-queries'
import { t } from 'lib/locales'
import { AiOutlineCode, AiOutlineMail, AiOutlineLinkedin } from 'react-icons/ai'
import { RiLandscapeLine } from 'react-icons/ri'
import { FiTwitter, FiCamera } from 'react-icons/fi'

function go(link: string) {
  window.open(`https://${link}`)
}

const StyledContent = styled.section`
  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    @media (${smallMediaQuery}) {
      grid-template-columns: 50% 50%;
    }
    li {
      margin: var(--space-1);
    }
  }
  h1 {
    margin-top: 0;
    text-align: center;
  }
  p {
    text-align: center;
  }
`

const initialLoopDelay = 0
const initialLoop = 800
const timeToShowLoop = 5000
const timeToIdleLoop = 3000

interface IProps {
  profilePicture
  profilePictureHover
  locale
}

const Page = ({
  profilePicture = {},
  profilePictureHover = {},
  locale,
  ...props
}: IProps) => {
  const [freq, setFreq] = React.useState(initialLoop)

  const links = [
    {
      id: 'email',
      icon: <AiOutlineMail />,
      label: t('Email', locale),
      url: 'mailto:me@pablo.im',
    },
    {
      id: 'code',
      icon: <AiOutlineCode />,
      label: t('Code', locale),
      url: 'https://github.com/pablopunk',
    },
    {
      id: 'twitter',
      icon: <FiTwitter />,
      label: t('Twitter', locale),
      url: 'https://twitter.com/pablopunkdev',
    },
    {
      id: 'drawings',
      icon: <RiLandscapeLine />,
      label: t('Drawings', locale),
      url: '/drawings',
    },
    {
      id: 'photos',
      icon: <FiCamera />,
      label: t('Photos', locale),
      url: '/photos',
    },
    {
      id: 'linkedin',
      icon: <AiOutlineLinkedin />,
      label: t('Linkedin', locale),
      url: 'https://linkedin.com/in/pablopunk',
    },
  ]

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
            <span>.im</span>
            <span>varela</span>
            <span>punk</span>
          </TextLoop>
        </h1>
        <article>
          <p>
            {t(
              "Hi there! My name is Pablo and I'm a remote web developer",
              locale
            )}
          </p>
          <ul>
            {links.map((l) => (
              <li key={l.id}>
                <Card onClick={() => go(l.url)}>
                  {l.icon}
                  <strong>{l.label}</strong>
                </Card>
              </li>
            ))}
          </ul>
        </article>
      </StyledContent>
    </FixedCenter>
  )
}

export const getStaticProps = (ctx) => staticProps('home', ctx)
export const getStaticPaths = staticPaths
export default withLayout(Page, '')
