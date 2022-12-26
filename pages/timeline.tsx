import { pageStaticProps } from '~/middleware'
import { useTranslation } from '~/hooks/useTranslation'
import { timeBetween, timeSince, howOldAmI } from '~/lib/utils'
import { Section } from '~/components/Section'

const getImage = (item: string) => `/images/timeline/${item}.jpg`
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
const formatTimeBetween = (date1: Date, date2: Date) => capitalize(timeBetween(date1, date2))
const formatTimeSince = (date: Date) => capitalize(timeSince(date))

export default function Timeline() {
  const { _ } = useTranslation()

  const items = [
    {
      date: _('Aug 2021'),
      title: 'Maze',
      url: 'http://maze.co',
      description: _('Fullstack Developer. Product'),
      duration: _(`${formatTimeSince(new Date(2021, 7))}. 100% Remote`),
      image: getImage('maze'),
    },
    {
      date: _('Feb 2021'),
      title: 'Prezly',
      url: 'http://prezly.com',
      description: _('NextJS Developer. Templates'),
      duration: _(
        `${formatTimeBetween(new Date(2021, 1), new Date(2021, 7))}. 100% Remote`,
      ),
      image: getImage('prezly'),
    },
    {
      date: _('Jan 2018'),
      title: 'Sourcefabric',
      url: 'http://sourcefabric.org',
      description: _('Fullstack Developer. Superdesk'),
      duration: _(
        `${formatTimeBetween(new Date(2018, 0), new Date(2021, 1))}. 100% Remote`,
      ),
      image: getImage('sourcefabric'),
    },
    {
      date: _('Jul 2017'),
      title: 'Keepcoding',
      url: 'https://keepcoding.io/casos-de-exito/trabajar-desarrollador-web-desde-casa/',
      description: _('Master in Fullstack Javascript'),
      duration: _(
        `${formatTimeBetween(new Date(2017, 6), new Date(2018, 2))}. 100% Remote`,
      ),
      image: getImage('keepcoding'),
    },
    {
      date: _('Feb 2016'),
      title: 'Stang Decision Systems',
      url: 'http://stangds.com',
      description: _('Fullstack Developer. Hirescore'),
      duration: _(
        `${formatTimeBetween(
          new Date(2016, 1),
          new Date(2018, 0),
        )}. 50% Remote / 50% Michigan`,
      ),
      image: getImage('stangds'),
    },
    {
      date: _('Jun 2015'),
      title: 'Universidade de Santiago de Compostela',
      url: 'https://www.usc.gal',
      description: _('Computer Science'),
      duration: _(
        `${timeBetween(
          new Date(2011, 8),
          new Date(2015, 5),
        )}. Santiago de Compostela`,
      ),
      image: getImage('usc'),
    },
    {
      date: _('Jul 1993'),
      title: 'Ourense',
      url: 'https://www.google.com/search?q=ourense&tbm=isch',
      description: _('Born. That was fun.'),
      image: getImage('born'),
      duration: _("I'm ") + howOldAmI() + _(' years old'),
    },
  ];

  return (
    <Section>
      <ul className='relative max-w-[400px] mx-auto py-2'>
        {items.map((item) => (
          <li key={item.image} className="pl-3 relative first:mt-0 mt-5 flex flex-col gap-2">
            <div className='font-bold text-sm'>{item.date}</div>
            <a href={item.url}>
              <h2>{item.title}</h2>
              <img src={item.image} alt={item.title} width="100%" className='object-cover w-[400px]' />
            </a>
            <p className='text-sm opacity-70 italic'>{item.description}</p>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          border-left: 3px solid var(--color-neutral-3);
        }
        /* fix box-shadow bleeding on top */
        ul:before {
          content: '';
          height: 20px;
          top: -20px;
          width: 100%;
          position: absolute;
        }
        li:before {
          position: absolute;
          left: 0;
          top: 8px;
          content: '';
          width: 10px;
          height: 5px;
          background-color: var(--color-neutral-3);
        }
      `}</style>
    </Section>
  )
}

export const getStaticProps = pageStaticProps
