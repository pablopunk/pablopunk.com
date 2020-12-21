import React from 'react'
import withLayout from 'components/skeleton/withLayout'
import useSWR from 'swr'
import Loading from 'components/pure/Loading'
import { staticProps } from 'components/data-fetch/withCMS'
import CenterFlexColumns from 'components/containers/CenterFlexColumns'
import { FiDownloadCloud } from 'react-icons/fi'
import { MdPageview } from 'react-icons/md'
import { useRouter } from 'next/router'
import { _ } from 'lib/locales'
import humanFormat from 'human-format'
import Grid from 'components/containers/Grid'
import Card from 'components/containers/Card'
import { go } from './portfolio'
import FixedCenter from 'components/containers/FixedCenter'

function Dashboard() {
  const { locale } = useRouter()
  const [data, dataSet] = React.useState(null)

  React.useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((_data) => {
        dataSet(_data)
      })
  }, [])

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
