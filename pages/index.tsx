import React from 'react'
import TextLoop from 'react-text-loop'
import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'
import Card from 'components/containers/Card'
import { smallMediaQuery } from 'components/utils/media-queries'
import { _ } from 'lib/locales'
import HomeCard from 'components/pure/HomeCard'
import Tag from 'components/pure/Tag'
import { dark } from 'components/utils/themes'
import { useRouter } from 'next/router'

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
    <h1 className="mb-3 text-2xl font-bold text-indigo-500">
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
    <>
      <article className="flex flex-col items-center mt-6 text-lg text-gray-700 leading-8">
        <Loop />
        <div
          className="text-center"
          dangerouslySetInnerHTML={{ __html: abstract }}
        ></div>
      </article>
      <article className="m-5 text-center">
        <span onClick={() => showThisTagOnlySet(null)}>
          <strong
            className={`cursor-pointer mx-2 ${showThisTagOnly ? '' : 'active'}`}
          >
            <Tag text={_('all', locale)} />
          </strong>
        </span>
        {allTags.map((tag) => {
          return (
            <span
              key={'filters' + tag.name}
              onClick={() => showThisTagOnlySet(tag.name)}
              className={`cursor-pointer mx-2 ${
                showThisTagOnly === tag.name ? 'active' : ''
              }`}
            >
              <Tag text={tag.name} color={tag.color.hex} />
            </span>
          )
        })}
      </article>
      <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <React.Fragment key={card.title + Math.random().toString()}>
            <HomeCard {...card} />
          </React.Fragment>
        ))}
      </article>
    </>
  )
}

export const getStaticProps = (ctx) => staticProps('home', ctx)
export default withLayout(Page, '')
