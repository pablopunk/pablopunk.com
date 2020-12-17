import React from 'react'
import styled from 'styled-components'
import TextLoop from 'react-text-loop'
import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'
import FixedCenter from 'components/containers/FixedCenter'
import Card from 'components/containers/Card'
import { smallMediaQuery } from 'components/utils/media-queries'
import { _ } from 'lib/locales'
import { AiOutlineCode, AiOutlineMail, AiOutlineBook } from 'react-icons/ai'
import { RiLandscapeLine } from 'react-icons/ri'
import { FiTwitter, FiCamera } from 'react-icons/fi'
import HomeCard from 'components/pure/HomeCard'

const StyledContent = styled.div`
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
  locale
  cards
}

const Page = ({ locale, cards, ...props }: IProps) => {
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

  cards = [...cards, ...cards, ...cards]

  const allTags = cards
    .map((card) => card.tags)
    .flat()
    .reduce(
      (acc, curr) =>
        acc.find((t) => t.name === curr.name) ? acc : [...acc, curr],
      []
    )

  return (
    <FixedCenter>
      <StyledContent>
        <h1>
          <span>pablo</span>
          <TextLoop interval={freq} delay={initialLoopDelay}>
            <span>punk</span>
            <span>varela</span>
            <span></span>
          </TextLoop>
        </h1>
        <article>
          <p>
            {_(
              "Hi there! My name is Pablo and I'm a remote web developer",
              locale
            )}
          </p>
        </article>
        <div>
          {cards.map((card) => (
            <React.Fragment key={card.title + Math.random().toString()}>
              <HomeCard {...card} />
            </React.Fragment>
          ))}
        </div>
      </StyledContent>
    </FixedCenter>
  )
}

export const getStaticProps = (ctx) => staticProps('home', ctx)
export default withLayout(Page, '')
