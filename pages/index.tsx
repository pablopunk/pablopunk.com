import React from 'react'
import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'
import { _ } from 'lib/locales'
import HomeCard from 'components/pure/HomeCard'
import { useRouter } from 'next/router'
import { ImTwitter, ImInstagram } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'
import fg from 'smart-foreground'
import twColors from 'tailwindcss/colors'

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
    className: 'text-lightBlue-300',
  },
  {
    url: 'https://instagram.com/pablopunk',
    label: '@pablopunk',
    Icon: ImInstagram,
    className: 'text-rose-300',
  },
  {
    url: 'mailto:pablo@pablopunk.com',
    label: 'email',
    Icon: MdEmail,
    className: 'text-emerald-300',
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
      [{ name: _('all', locale), color: { hex: 'transparent' } }]
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
              className={
                link.className +
                ' flex items-center justify-center first-border bg-bg2 px-2 py-1 rounded m-1 shadow-md'
              }
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
      <article className="flex flex-wrap items-center justify-center m-5 w-2/3 mx-auto">
        {allTags.map((tag, i) => {
          return (
            <span
              key={'filters' + tag.name}
              onClick={() =>
                i === 0
                  ? showThisTagOnlySet(null)
                  : showThisTagOnlySet(tag.name)
              }
              className={`cursor-pointer m-2 ${
                showThisTagOnly === tag.name ? 'active' : ''
              }`}
            >
              <span
                style={{
                  backgroundColor: tag.color.hex,
                  color: fg(tag.color.hex, [
                    twColors.blueGray['50'],
                    twColors.blueGray['800'],
                  ]),
                }}
                className="rounded py-1 px-2"
              >
                {tag.name}
              </span>
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
