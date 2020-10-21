import React from 'react'
import fetch from 'isomorphic-unfetch'
import Loading from 'components/pure/Loading'
import {
  FlexibleWidthXYPlot,
  LineSeries,
  VerticalGrdiLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from 'react-vis'

type Package = {
  name: string
  from: string
  to: string
}

const packages: Array<Package> = [
  {
    name: 'nextjs-redirect',
    from: '2019-01-01',
    to: '2020-11-01',
  },
]

function normalizeStatsForAxis(stats) {
  return stats?.downloads
    .map((stat) => ({
      x: new Date(stat.day).getTime(),
      y: stat.downloads,
    }))
    .filter((s) => s.y > 0)
    .reduce((acc, curr) => {
      if (curr.y - acc[acc.length - 1]?.y < -200) {
        return acc
      }
      return [...acc, curr]
    }, [])
}

const PackageStat = (props: Package) => {
  const [stats, statsSet] = React.useState(null)

  React.useEffect(() => {
    fetch(
      `https://api.npmjs.org/downloads/range/${props.from}:${props.to}/${props.name}`
    )
      .then((r) => r.json())
      .then(statsSet)
  }, [])

  return (
    <span>
      <h4>{props.name}</h4>
      {stats == null && <Loading />}
      {stats?.downloads?.reduce((acc, curr) => acc + curr.downloads, 0)}{' '}
      downloads for {props.name}
      <FlexibleWidthXYPlot height={400}>
        <LineSeries data={normalizeStatsForAxis(stats)} />
        <XAxis />
        <YAxis />
      </FlexibleWidthXYPlot>
      <style global jsx>{`
        .rv-xy-plot__axis__tick > text {
          fill: var(--color-accent);
        }
      `}</style>
    </span>
  )
}

export default function NpmCharts({ locale }) {
  return (
    <>
      {packages.map((p) => (
        <div key={p.name} style={{ width: '100%' }}>
          <PackageStat name={p.name} from={p.from} to={p.to} />
        </div>
      ))}
    </>
  )
}
