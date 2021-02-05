import React from 'react'
import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'
import { _ } from 'lib/locales'
import HomeCard from 'components/pure/HomeCard'
import Tag from 'components/pure/Tag'
import { useRouter } from 'next/router'

interface IProps {
  locale
  cards: Array<any>
  abstract: string
}

const H1 = () => {
  return <h1 className="mb-3 text-2xl font-bold text-accent">Pablo Varela</h1>
}

const Page = ({ abstract, cards }: IProps) => {
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
      <article className="flex flex-col items-center justify-center pt-6 text-lg leading-8">
        <H1 />
        <div
          className="text-center bg-bg2 w-full p-4 rounded border-4 border-bg2"
          dangerouslySetInnerHTML={{ __html: abstract }}
        ></div>
      </article>
      <article className="flex flex-wrap items-center justify-center m-5">
        <span
          onClick={() => showThisTagOnlySet(null)}
          className={`font-bold cursor-pointer text-fg m-2 ${
            showThisTagOnly ? '' : 'active'
          }`}
        >
          <Tag text={_('all', locale)} />
        </span>
        {allTags.map((tag) => {
          return (
            <span
              key={'filters' + tag.name}
              onClick={() => showThisTagOnlySet(tag.name)}
              className={`cursor-pointer m-2 ${
                showThisTagOnly === tag.name ? 'active' : ''
              }`}
            >
              <Tag text={tag.name} color={tag.color.hex} />
            </span>
          )
        })}
      </article>
      <article className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
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
