import React from 'react'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import humanFormat from 'human-format'
import { Loading } from 'components/Loading'
import { Card } from './Card'
import { useTranslation } from 'hooks/useTranslation'

const API = '/api/repos'
const MAX_REPOS = 8

const fetcher = (url) => fetch(url).then((_) => _.json())

export function Repos({ initialData }) {
  const { _ } = useTranslation()
  const { data, error } = useSWR(API, fetcher, { initialData })

  if (error && !data) {
    return <strong style={{ color: 'orangered' }}>Error fetching repos</strong>
  }

  if (!data) {
    return (
      <span className="text-center">
        <Loading />
      </span>
    )
  }

  const repos = data
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, MAX_REPOS)
    .map((repo) => ({
      ...repo,
      description: repo.description?.replace('[UNMANTAINED]. ', '') || '',
    }))
    .map((repo) => ({
      ...repo,
      description: _(repo.description ?? ''),
    }))
    .map((repo) => ({
      ...repo,
      stargazers_count_nice: humanFormat(parseInt(repo.stargazers_count), {
        decimals: 1,
      }),
    }))

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 mb-8 md:grid-cols-2">
      {repos.map((repo) => (
        <div key={repo.html_url}>
          <Card
            title={`/${repo.name}`}
            subtitle={`${repo.stargazers_count_nice} ⭐️`}
            description={repo.description}
            link={repo.html_url}
          />
        </div>
      ))}
    </div>
  )
}
