import React from 'react'
import withLayout from 'components/skeleton/withLayout'
import Loading from 'components/pure/Loading'
import { staticProps } from 'components/data-fetch/withCMS'
import { FiDownloadCloud } from 'react-icons/fi'
import { MdPageview } from 'react-icons/md'
import { useRouter } from 'next/router'
import { _ } from 'lib/locales'
import humanFormat from 'human-format'
import Card from 'components/containers/Card'
import { go } from './portfolio'
import FixedCenter from 'components/containers/FixedCenter'
import useSWR from 'swr'

function Dashboard() {
  const { locale } = useRouter()
  const { data } = useSWR('/api/stats', (u) => fetch(u).then((r) => r.json()))

  return (
    <FixedCenter>
      {data ? (
        <Card onClick={() => go('unsplash.com/@pablopunk')}>
          <h2>Unsplash</h2>
          <p>
            <FiDownloadCloud />{' '}
            <strong>
              {humanFormat(data.unsplash?.downloads?.total || 0)}{' '}
            </strong>
            {_('total downloads', locale)}
          </p>
          <p>
            <MdPageview />{' '}
            <strong>{humanFormat(data.unsplash?.views?.total || 0)} </strong>
            {_('total views', locale)}
          </p>
        </Card>
      ) : (
        <Loading />
      )}
    </FixedCenter>
  )
}

export default withLayout(Dashboard, 'dashboard')
export const getStaticProps = (ctx) => staticProps('home', ctx)
