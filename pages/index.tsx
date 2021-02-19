import React from 'react'
import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'
import { _ } from 'lib/locales'
import HomeCard from 'components/pure/HomeCard'
import Tag from 'components/pure/Tag'
import { useRouter } from 'next/router'
import { ImTwitter, ImInstagram } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'

interface IProps {
  locale
  cards: Array<any>
}

const H1 = () => {
  return <h1 className="mb-3 text-2xl font-bold text-accent">Pablo Varela</h1>
}

const links = [
  {
    url: 'https://twitter.com/pablopunk',
    label: '@pablopunk',
    Icon: ImTwitter,
  },
  {
    url: 'https://instagram.com/pablopunk',
    label: '@pablopunk',
    Icon: ImInstagram,
  },
  {
    url: 'mailto:pablo@pablopunk.com',
    label: 'email',
    Icon: MdEmail,
  },
]

const Page = ({ cards }: IProps) => {
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
        <p>{_('Web developer. Working remotely.', locale)}</p>
        <p className="flex flex-col md:flex-row">
          {links.map((link) => (
            <a
              href={link.url}
              key={link.url}
              className="flex items-center justify-center first-border bg-bg2 text-fg px-2 py-1 rounded m-1 shadow-md"
            >
              <span className="mr-1">
                <link.Icon />
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </p>
      </article>
      <article className="text-xl text-center text-bold mt-4">
        {_('Here are some interesting links', locale)}:
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
              <Tag text={tag.name} color={tag.color.hex} className="rounded" />
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
