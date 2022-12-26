import React from 'react'
import humanFormat from 'human-format'
import { HiOutlineFolderDownload } from 'react-icons/hi'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { useCssVar } from '~/hooks/useCssVar'
import * as R from 'ramda'
import { getJson } from '~/lib/utils'
import { useTranslation } from '~/hooks/useTranslation'

const SSR = typeof window === 'undefined'

const packages = ['nextjs-redirect']

const apiURLForPackage = (packageName) =>
  (SSR ? 'https://api.npmjs.org' : '/api.npmjs.org') +
  `/downloads/range/2010-01-01:${
    new Date().toISOString().split('T')[0]
  }/${packageName}`

export const fetchAllNpmData = () =>
  Promise.all(R.map(getJson, R.map(apiURLForPackage, packages)))

const convertDownloadsToChartJS = ({ downloads, color }) => ({
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

const totalDownloads = (downloads) =>
  humanFormat(downloads?.reduce((acc, curr) => acc + curr.downloads, 0) ?? 0, {
    decimals: 1,
  }).replace(' ', '')

const PackageStat = ({ package: packageName, downloads }) => {
  const { _ } = useTranslation()
  const color = useCssVar('--color-secondary-9')

  if (downloads == null) {
    return null
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center whitespace-nowrap">
        <span className="mr-1 text-secondary-8">
          <HiOutlineFolderDownload />
        </span>
        <span className="mr-1">{totalDownloads(downloads)} </span>
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
            decimation: { enabled: true, algorithm: 'lttb', samples: 5 },
          },
          elements: { point: { radius: 0 } },
          scales: {
            x: { type: 'time' },
          },
        }}
      />
    </>
  )
}

export function NpmCharts({ initialData }) {
  const { locale } = useRouter()
  const { data } = useSWR('npm-stats', fetchAllNpmData, { initialData })

  return (
    <>
      {data &&
        data.map((packageData) => (
          <div
            key={packageData.package}
            style={{ width: '100%' }}
            className="p-3 my-4 border-2 border-dashed rounded-md"
          >
            <PackageStat {...packageData} locale={locale} />
          </div>
        ))}
    </>
  )
}
