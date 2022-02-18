import { Loading } from 'components/Loading'
import { FiDownloadCloud } from 'react-icons/fi'
import { GoRepo } from 'react-icons/go'
import { MdCameraAlt, MdPageview } from 'react-icons/md'
import { useRouter } from 'next/router'
import { _ } from 'locales'
import humanFormat from 'human-format'
import { openLink } from 'lib/utils'
import useSWR from 'swr'
import { AiOutlineStar, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { getUnsplashStats, getGithubStats } from './api/stats'
import { getPageStaticProps } from 'cms/middleware'
import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import { PageProps } from 'types/page'

const Stats = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-around p-4 m-4 border rounded-lg shadow-lg cursor-pointer bg-bg2"
    >
      {children}
    </div>
  )
}

const Stat = ({ children }) => {
  return <div className="flex items-center justify-center">{children}</div>
}

interface Props extends PageProps {
  initialData: any
}

const Dashboard: FunctionComponent<Props> = ({ initialData }) => {
  const { locale } = useRouter()
  const { data } = useSWR('/api/stats', (u) => fetch(u).then((r) => r.json()), {
    initialData,
  })

  return (
    <div className="flex items-center justify-center fill-height">
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Stats onClick={() => openLink('unsplash.com/@pablopunk')}>
            <h2>Unsplash</h2>
            <Stat>
              <MdCameraAlt />{' '}
              <strong className="ml-1 text-accent-alt">
                {humanFormat(data.unsplash?.photos || 0)}{' '}
              </strong>
              <span className="ml-1">{_('photos', locale)}</span>
            </Stat>
            <Stat>
              <MdPageview />{' '}
              <strong className="ml-1 text-accent-alt">
                {humanFormat(data.unsplash?.views || 9000000)}{' '}
              </strong>
              <span className="ml-1">{_('total views', locale)}</span>
            </Stat>
            <Stat>
              <FiDownloadCloud />{' '}
              <strong className="ml-1 text-accent-alt">
                {humanFormat(data.unsplash?.downloads || 0)}{' '}
              </strong>
              <span className="ml-1">{_('total downloads', locale)}</span>
            </Stat>
          </Stats>
          <Stats onClick={() => openLink('github.com/pablopunk')}>
            <h2>GitHub</h2>
            <Stat>
              <AiOutlineUsergroupAdd />{' '}
              <strong className="ml-1 text-accent-alt">
                {humanFormat(data.github?.followers || 0)}{' '}
              </strong>
              <span className="ml-1">{_('followers', locale)}</span>
            </Stat>
            <Stat>
              <GoRepo />{' '}
              <strong className="ml-1 text-accent-alt">
                {humanFormat(data.github?.public_repos || 0)}{' '}
              </strong>
              <span className="ml-1">{_('repos', locale)}</span>
            </Stat>
            <Stat>
              <AiOutlineStar />{' '}
              <strong className="ml-1 text-accent-alt">
                +{humanFormat(180 + (data.github?.stars_received || 0))}{' '}
              </strong>
              <span className="ml-1">{_('stars received', locale)}</span>
            </Stat>
          </Stats>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const sProps = await getPageStaticProps(ctx, 'dashboard')
  const [unsplash, github] = await Promise.all([
    getUnsplashStats(),
    getGithubStats(),
  ])

  if (!('props' in sProps) || 'notFound' in sProps) {
    return { notFound: true }
  }

  return {
    ...sProps,
    props: {
      ...sProps.props,
      initialData: { unsplash, github },
    },
  }
}

export default Dashboard
