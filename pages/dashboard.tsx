import withLayout from 'components/skeleton/withLayout'
import Loading from 'components/pure/Loading'
import { staticProps } from 'components/data-fetch/withCMS'
import { FiDownloadCloud } from 'react-icons/fi'
import { GoRepo } from 'react-icons/go'
import { MdPageview } from 'react-icons/md'
import { useRouter } from 'next/router'
import { _ } from 'lib/locales'
import humanFormat from 'human-format'
import { go } from 'utils/helpers'
import useSWR from 'swr'
import { AiOutlineStar, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { getUnsplashStats, getGithubStats } from './api/stats'

const Stats = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-around p-4 m-4 rounded-lg shadow-lg cursor-pointer"
    >
      {children}
    </div>
  )
}

const Stat = ({ children }) => {
  return <div className="flex items-center justify-center">{children}</div>
}

function Dashboard({ initialData }) {
  const { locale } = useRouter()
  const { data } = useSWR('/api/stats', (u) => fetch(u).then((r) => r.json()), {
    initialData,
  })

  return (
    <div className="flex items-center justify-center fill-height">
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Stats onClick={() => go('unsplash.com/@pablopunk')}>
            <h2>Unsplash</h2>
            <Stat>
              <FiDownloadCloud />{' '}
              <strong className="ml-1 text-accent2">
                {humanFormat(data.unsplash?.downloads?.total || 0)}{' '}
              </strong>
              <span className="ml-1">{_('total downloads', locale)}</span>
            </Stat>
            <Stat>
              <MdPageview />{' '}
              <strong className="ml-1 text-accent2">
                {humanFormat(data.unsplash?.views?.total || 0)}{' '}
              </strong>
              <span className="ml-1">{_('total views', locale)}</span>
            </Stat>
          </Stats>
          <Stats onClick={() => go('github.com/pablopunk')}>
            <h2>GitHub</h2>
            <Stat>
              <AiOutlineStar />{' '}
              <strong className="ml-1 text-accent2">
                +{humanFormat(180 + (data.github?.stars_received || 0))}{' '}
              </strong>
              <span className="ml-1">{_('stars received', locale)}</span>
            </Stat>
            <Stat>
              <AiOutlineUsergroupAdd />{' '}
              <strong className="ml-1 text-accent2">
                {humanFormat(data.github?.followers || 0)}{' '}
              </strong>
              <span className="ml-1">{_('followers', locale)}</span>
            </Stat>
            <Stat>
              <GoRepo />{' '}
              <strong className="ml-1 text-accent2">
                {humanFormat(data.github?.public_repos || 0)}{' '}
              </strong>
              <span className="ml-1">{_('repos', locale)}</span>
            </Stat>
          </Stats>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default withLayout(Dashboard, 'dashboard')
export const getStaticProps = async (ctx) => {
  const staticP = await staticProps('home', ctx)
  const [unsplash, github] = await Promise.all([
    getUnsplashStats(),
    getGithubStats(),
  ])

  return {
    ...staticP,
    props: {
      ...staticP.props,
      initialData: { unsplash, github },
    },
  }
}
