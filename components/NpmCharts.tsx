import React from 'react'
import fetch from 'isomorphic-unfetch'
import humanFormat from 'human-format'
import { HiOutlineFolderDownload } from 'react-icons/hi'
import { _ } from 'locales'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { useCssVar } from 'hooks/useCssVar'

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

function convertDownloadsToChartJS(downloads, color) {
  return {
    labels: downloads.map((d) => d.day),
    datasets: [
      {
        label: 'Downloads',
        data: downloads.map((x) => x.downloads),
        backgroundColor: 'transparent',
        borderColor: color,
        fill: false,
        // borderDash: [5, 5],
        tension: 0.1,
      },
    ],
  }
}

const totalDownloads = (downloads) =>
  humanFormat(downloads?.reduce((acc, curr) => acc + curr.downloads, 0) ?? 0, {
    decimals: 1,
  }).replace(' ', '')

const PackageStat = ({ package: packageName, downloads, locale }) => {
  const color = useCssVar('--color-accent-alt')

  if (downloads == null) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-center my-3 mt-4 text-xl whitespace-nowrap flex-wrap">
        <span className="mr-1 text-accent-alt">
          <HiOutlineFolderDownload />
        </span>
        <span className="mr-1">{totalDownloads(downloads)} </span>
        <span className="mr-1">{_('downloads for', locale)} </span>
        <a href={'https://npm.im/' + packageName}>
          <strong>{packageName}</strong>
        </a>
      </div>
      <Line
        data={convertDownloadsToChartJS(downloads, color)}
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
