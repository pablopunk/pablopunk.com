import React from 'react'
import styled from 'styled-components'
import TextLoop from 'react-text-loop'
import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'
import Card from 'components/containers/Card'
import Grid from 'components/containers/Grid'
import { smallMediaQuery } from 'components/utils/media-queries'
import { _ } from 'lib/locales'
import { AiOutlineCode, AiOutlineMail, AiOutlineBook } from 'react-icons/ai'
import { RiLandscapeLine } from 'react-icons/ri'
import { FiTwitter, FiCamera } from 'react-icons/fi'
import HomeCard from 'components/pure/HomeCard'
import Tag from 'components/pure/Tag'
import { dark } from 'components/utils/themes'
import { useRouter } from 'next/router'

const StyledContent = styled.div`
  h1 {
    text-align: center;
  }
  p {
    text-align: center;
  }
  .filters {
    display: flex;
    justify-content: center;
    & > span > * {
      margin: 0 var(--space-1);
      cursor: pointer;
      &:hover,
      .active {
        border-bottom: 1px solid var(--color-accent);
      }
    }
  }
  .cards {
    @media (${smallMediaQuery}) {
      font-size: 1.5rem;
    }
  }
`

const initialLoopDelay = 0
const initialLoop = 800
const timeToShowLoop = 5000
const timeToIdleLoop = 3000

interface IProps {
  locale
  cards: Array<any>
  abstract: string
}

const Loop = () => {
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
    <h1>
      <span>pablo</span>
      <TextLoop interval={freq} delay={initialLoopDelay}>
        <span></span>
        <span>punk</span>
        <span>varela</span>
      </TextLoop>
    </h1>
  )
}

const Page = ({ abstract, cards, ...props }: IProps) => {
  const { locale } = useRouter()
  const [showThisTagOnly, showThisTagOnlySet] = React.useState(null)
  const allTags = cards
    .map((card) => card.tags)
    .flat()
    .reduce(
      (acc, curr) =>
        acc.find((t) => t.name === curr.name) ? acc : [...acc, curr],
      []
    )

  if (showThisTagOnly) {
    cards = cards.filter(
      (card) => !!card.tags.find((t) => t.name === showThisTagOnly)
    )
  }

  return (
    <StyledContent>
      <article>
        <Loop />
        <div dangerouslySetInnerHTML={{ __html: abstract }}></div>
      </article>
      <article className="filters">
        <span onClick={() => showThisTagOnlySet(null)}>
          <strong className={showThisTagOnly ? '' : 'active'}>
            <Tag text={_('all', locale)} />
          </strong>
        </span>
        {allTags.map((tag) => {
          return (
            <span
              key={'filters' + tag.name}
              onClick={() => showThisTagOnlySet(tag.name)}
              className={showThisTagOnly === tag.name ? 'active' : ''}
            >
              <Tag text={tag.name} color={tag.color.hex} />
            </span>
          )
        })}
      </article>
      <article className="cards">
        <Grid columns={2} small={1}>
          {cards.map((card) => (
            <React.Fragment key={card.title + Math.random().toString()}>
              <HomeCard {...card} />
            </React.Fragment>
          ))}
        </Grid>
      </article>
    </StyledContent>
  )
}

export const getStaticProps = (ctx) => staticProps('home', ctx)
export default withLayout(Page, '')
