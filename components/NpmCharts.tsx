import React from 'react'
import fetch from 'isomorphic-unfetch'
import { AreaChart } from 'reaviz'
import humanFormat from 'human-format'
import { HiOutlineFolderDownload } from 'react-icons/hi'
import { _ } from 'locales'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const packages = [
  'nextjs-redirect',
  'miny',
  'vim-colors',
  'livesoccertv-parser',
]

export const fetchAllNpmData = () =>
  Promise.all(
    packages.map((p) =>
      fetch(
        `https://api.npmjs.org/downloads/range/2010-01-01:${
          new Date().toISOString().split('T')[0]
        }/${p}`,
      ).then((r) => r.json()),
    ),
  )

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

const totalDownloads = (downloads) =>
  humanFormat(downloads?.reduce((acc, curr) => acc + curr.downloads, 0) ?? 0, {
    decimals: 1,
  }).replace(' ', '')

const PackageStat = ({ package: packageName, downloads, locale }) => {
  if (downloads == null) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-center mt-4 whitespace-nowrap">
        <span className="mr-1 text-accent2">
          <HiOutlineFolderDownload />
        </span>
        <span className="mr-1">{totalDownloads(downloads)} </span>
        <span className="mr-1">{_('downloads for', locale)} </span>
        <a href={'https://npm.im/' + packageName}>
          <strong>{packageName}</strong>
        </a>
      </div>
      <AreaChart height={300} data={convertStatsToChartData({ downloads })} />
    </>
  )
}

export default function NpmCharts({ initialData }) {
  const { locale } = useRouter()
  const { data } = useSWR('npm-stats', fetchAllNpmData, { initialData })

  return (
    <>
      {data &&
        data.map((packageData) => (
          <div key={packageData.package} style={{ width: '100%' }}>
            <PackageStat {...packageData} locale={locale} />
          </div>
        ))}
    </>
  )
}
