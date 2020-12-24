import React from 'react'
import withLayout from 'components/skeleton/withLayout'
import Loading from 'components/pure/Loading'
import { staticProps } from 'components/data-fetch/withCMS'
import { FiDownloadCloud } from 'react-icons/fi'
import { GoRepo } from 'react-icons/go'
import { MdPageview } from 'react-icons/md'
import { useRouter } from 'next/router'
import { _ } from 'lib/locales'
import humanFormat from 'human-format'
import Card from 'components/containers/Card'
import { go } from './portfolio'
import FixedCenter from 'components/containers/FixedCenter'
import useSWR from 'swr'
import Grid from 'components/containers/Grid'
import { AiOutlineStar, AiOutlineUsergroupAdd } from 'react-icons/ai'

function Dashboard() {
  const { locale } = useRouter()
  const { data } = useSWR('/api/stats', (u) => fetch(u).then((r) => r.json()))

  return (
    <FixedCenter>
      {data ? (
        <Grid columns={2} small={1}>
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
          <Card onClick={() => go('github.com/pablopunk')}>
            <h2>GitHub</h2>
            <p>
              <AiOutlineStar />{' '}
              <strong>+{humanFormat(data.github?.stars_received || 0)} </strong>
              {_('stars received', locale)}
            </p>
            <p>
              <AiOutlineUsergroupAdd />{' '}
              <strong>{humanFormat(data.github?.followers || 0)} </strong>
              {_('followers', locale)}
            </p>
            <p>
              <GoRepo />{' '}
              <strong>{humanFormat(data.github?.public_repos || 0)} </strong>
              {_('repos', locale)}
            </p>
          </Card>
        </Grid>
      ) : (
        <Loading />
      )}
    </FixedCenter>
  )
}

export default withLayout(Dashboard, 'dashboard')
export const getStaticProps = (ctx) => staticProps('home', ctx)
