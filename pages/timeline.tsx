import { pageStaticProps } from '@middleware'
import { Chrono, TimelineItem } from 'react-chrono'
import { useTranslation } from '@hooks/useTranslation'
import { timeBetween, timeSince, howOldAmI } from '@lib/utils'

const getImage = (item: string): TimelineItem['media'] => {
  return {
    type: 'IMAGE',
    source: { url: `/images/timeline/${item}.jpg` },
  }
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
const formatTimeBetween = (date1: Date, date2: Date) => capitalize(timeBetween(date1, date2))
const formatTimeSince = (date: Date) => capitalize(timeSince(date))

export default function Portfolio() {
  const { _ } = useTranslation()

  const items: TimelineItem[] = [
    {
      title: _('Aug 2021'),
      cardTitle: 'Maze',
      url: 'http://maze.co',
      cardSubtitle: _('Fullstack Developer. Product'),
      cardDetailedText: _(`${formatTimeSince(new Date(2021, 7))}. 100% Remote`),
      media: getImage('maze'),
    },
    {
      title: _('Feb 2021'),
      cardTitle: 'Prezly',
      url: 'http://prezly.com',
      cardSubtitle: _('NextJS Developer. Templates'),
      cardDetailedText: _(
        `${formatTimeBetween(new Date(2021, 1), new Date(2021, 7))}. 100% Remote`,
      ),
      media: getImage('prezly'),
    },
    {
      title: _('Jan 2018'),
      cardTitle: 'Sourcefabric',
      url: 'http://sourcefabric.org',
      cardSubtitle: _('Fullstack Developer. Superdesk'),
      cardDetailedText: _(
        `${formatTimeBetween(new Date(2018, 0), new Date(2021, 1))}. 100% Remote`,
      ),
      media: getImage('sourcefabric'),
    },
    {
      title: _('Jul 2017'),
      cardTitle: 'Keepcoding',
      url: 'https://keepcoding.io/casos-de-exito/trabajar-desarrollador-web-desde-casa/',
      cardSubtitle: _('Master in Fullstack Javascript'),
      cardDetailedText: _(
        `${formatTimeBetween(new Date(2017, 6), new Date(2018, 2))}. 100% Remote`,
      ),
      media: getImage('keepcoding'),
    },
    {
      title: _('Feb 2016'),
      cardTitle: 'Stang Decision Systems',
      url: 'http://stangds.com',
      cardSubtitle: _('Fullstack Developer. Hirescore'),
      cardDetailedText: _(
        `${formatTimeBetween(
          new Date(2016, 1),
          new Date(2018, 0),
        )}. 50% Remote / 50% Michigan`,
      ),
      media: getImage('stangds'),
    },
    {
      title: _('Jun 2015'),
      cardTitle: 'Universidade de Santiago de Compostela',
      url: 'https://www.usc.gal',
      cardSubtitle: _('Computer Science'),
      cardDetailedText: _(
        `${timeBetween(
          new Date(2011, 8),
          new Date(2015, 5),
        )}. Santiago de Compostela`,
      ),
      media: getImage('usc'),
    },
    {
      title: _('Jul 1993'),
      cardTitle: 'Ourense',
      url: 'https://www.google.com/search?q=ourense&tbm=isch',
      cardSubtitle: _('Born. That was fun.'),
      media: getImage('born'),
      cardDetailedText: _("I'm ") + howOldAmI() + _(' years old'),
    },
  ]
  return (
    <div className="flex flex-col mt-4 gap-4 items-center">
      <h1 className="text-3xl text-center">Timeline</h1>
      <div className="min-w-[600px]">
        <Chrono
          items={items}
          mode="VERTICAL"
          theme={{
            primary: 'var(--color-primary-7)',
            secondary: 'var(--color-primary-1)',
            cardBgColor: 'var(--color-neutral-2)',
            cardForeColor: 'var(--color-neutral-8)',
            titleColor: 'var(--color-neutral-9)',
            titleColorActive: 'var(--color-primary-7)',
            textColor: 'var(--color-neutral-10)',
          }}
          borderLessCards
          mediaHeight={160}
          cardHeight={0}
          hideControls
        />
      </div>
      <style jsx>{`
        div :global(img) {
          height: 100%;
          width: 100%;
          object-fit: cover;
          padding-bottom: 1rem;
        }
        div :global(.timeline-card-content > div),
        div :global(.timeline-card-content > div > p) {
          margin: 0;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        div :global(.rc-card-title),
        div :global(.rc-card-subtitle) {
          padding-left: 2rem;
          padding-right: 2rem;
        }
        * :global(div:has(p)) {
          margin: 0 !important;
          padding: 0 !important;
        }
        div :global(.rc-card-media) {
          padding: 0 !important;
        }
        div :global(.card-description) {
          padding-bottom: 2rem;
          font-style: italic;
          opacity: 0.8;
        }
      `}</style>
    </div>
  )
}

export const getStaticProps = pageStaticProps
