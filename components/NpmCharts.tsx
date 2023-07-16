import React from 'react'
import humanFormat from 'human-format'
import { HiOutlineFolderDownload } from 'react-icons/hi'
import useSWR from 'swr'
import 'chartjs-adapter-date-fns'
import { Line } from 'react-chartjs-2'
import { useCssVar } from '~/hooks/useCssVar'
import * as R from 'ramda'
import { getJson, getMonthsAgoDate, getDaysAgoDate } from '~/lib/utils'
import { useTranslation } from '~/hooks/useTranslation'

const SSR = typeof window === 'undefined'

const packages = ['nextjs-redirect']

type Downloads = {
  downloads: number
  day: string // YYYY-MM-DD
}

type PackageStatObject = {
  downloads: Downloads[]
  start: string
  end: string
  package: string
}

const buildApiUrlForPackage = (packageName: string, from: Date, to: Date) =>
  (SSR ? 'https://api.npmjs.org' : '/api.npmjs.org') +
  `/downloads/range/${from.toISOString().split('T')[0]}:${
    to.toISOString().split('T')[0]
  }/${packageName}`

type AllPackagesData = Array<{
  packageName: string
  total: PackageStatObject
  recent: PackageStatObject
}>

export const fetchAllNpmData = (): Promise<AllPackagesData> => {
  const packageStats = (packageName: string, from: Date, to: Date) =>
    getJson<PackageStatObject>(buildApiUrlForPackage(packageName, from, to))
  const packageStatsWithTotal = (name: string) =>
    Promise.all([
      name,
      packageStats(name, getMonthsAgoDate(12 * 10), getDaysAgoDate(1)),
      packageStats(name, getMonthsAgoDate(4), getDaysAgoDate(1)),
    ])

  return Promise.all(packages.map(packageStatsWithTotal)).then((stats) =>
    stats.map(([packageName, total, recent]) => ({
      packageName,
      total,
      recent,
    })),
  )
}

const convertDownloadsToChartJS = ({
  downloads,
  color,
}: {
  downloads: Downloads[]
  color: string
}) => ({
  labels: R.pluck('day')(downloads),
  datasets: [
    {
      label: 'Downloads',
      data: R.pluck('downloads')(downloads),
      backgroundColor: 'transparent',
      borderColor: color,
      fill: false,
      // borderDash: [5, 5],
      tension: 0.1,
    },
  ],
})

const totalDownloads = (stat: PackageStatObject) =>
  humanFormat(
    stat.downloads?.reduce?.((acc, curr) => acc + curr.downloads, 0) ?? 0,
    {
      decimals: 1,
    },
  ).replace(' ', '')

const PackageStat = ({ package: packageName, downloads, total }) => {
  const { _ } = useTranslation()
  const color = useCssVar('--color-secondary-7')

  if (downloads == null) {
    return null
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center whitespace-nowrap">
        <span className="mr-1 text-secondary-8">
          <HiOutlineFolderDownload />
        </span>
        <span className="mr-1">{total} </span>
        <span className="mr-1">{_('downloads for')} </span>
        <a href={'https://npm.im/' + packageName}>
          <strong>{packageName}</strong>
        </a>
      </div>
      <Line
        data={convertDownloadsToChartJS({ downloads, color })}
        options={{
          plugins: {
            legend: { display: false },
            // decimation: { enabled: true, algorithm: 'lttb', samples: 100 },
          },
          elements: { point: { radius: 1 } },
          scales: {
            x: { type: 'time' },
          },
        }}
      />
    </>
  )
}

const removeWeekends = (data: PackageStatObject['downloads']) =>
  data.filter((entry) => {
    const dayOfWeek = new Date(entry.day).getDay()
    return dayOfWeek !== 0 && dayOfWeek !== 6 // 0 = Sunday, 6 = Saturday
  })

const mapStatsBetterForChart = (data: AllPackagesData[0]) => {
  return {
    ...data,
    recent: {
      ...data.recent,
      downloads: removeWeekends(data.recent.downloads),
    },
  }
}

export function NpmCharts({ initialData }: { initialData: AllPackagesData }) {
  const { data } = useSWR('npm-stats', fetchAllNpmData, { initialData })

  const dataButModifiedSoItLooksBetterInCharts = (data || []).map(
    mapStatsBetterForChart,
  )

  return (
    <>
      {dataButModifiedSoItLooksBetterInCharts.map((packageData) => (
        <div
          key={packageData.packageName}
          style={{ width: '100%' }}
          className="p-3 my-4 border-2 border-dashed rounded-md"
        >
          <PackageStat
            {...packageData.recent}
            total={totalDownloads(packageData.total)}
          />
        </div>
      ))}
    </>
  )
}
