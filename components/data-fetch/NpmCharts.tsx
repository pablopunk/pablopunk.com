import React from 'react'
import fetch from 'isomorphic-unfetch'
import { AreaChart } from 'reaviz'
import humanFormat from 'human-format'
import { HiOutlineFolderDownload } from 'react-icons/hi'
import { _ } from 'lib/locales'

const packages = ['nextjs-redirect', 'miny', 'livesoccertv-parser']

function convertStatsToChartData(stats) {
  if (stats?.downloads == null) {
    return []
  }

  const max = Math.max(...stats.downloads.map((s) => parseInt(s.downloads)))
  const min = max / 11

  return stats?.downloads
    .map((stat) => ({
      key: new Date(stat.day),
      data: stat.downloads,
    }))
    .filter((s) => s.data > min)
}

const totalDownloads = (stats) =>
  humanFormat(
    stats?.downloads?.reduce((acc, curr) => acc + curr.downloads, 0) ?? 0,
    { decimals: 1 }
  ).replace(' ', '')

const PackageStat = ({ name, locale }) => {
  const [stats, statsSet] = React.useState(null)

  React.useEffect(() => {
    fetch(
      `https://api.npmjs.org/downloads/range/2010-01-01:${
        new Date().toISOString().split('T')[0]
      }/${name}`
    )
      .then((r) => r.json())
      .then(statsSet)
  }, [])

  if (stats == null) {
    return null
  }

  return (
    <div>
      <div>
        <span>
          <HiOutlineFolderDownload /> {totalDownloads(stats)}{' '}
        </span>
        {_('downloads for', locale)}{' '}
        <a href={'https://npm.im/' + name}>
          <strong>{name}</strong>
        </a>
      </div>
      <AreaChart height={300} data={convertStatsToChartData(stats)} />
      <style jsx>{`
        div {
          width: 100%;
          text-align: center;
          margin-bottom: var(--space-2);
        }
        span {
          color: var(--color-accent2);
        }
      `}</style>
    </div>
  )
}

export default function NpmCharts({ locale }) {
  return (
    <>
      {packages.map((p) => (
        <div key={p} style={{ width: '100%' }}>
          <PackageStat name={p} locale={locale} />
        </div>
      ))}
    </>
  )
}
