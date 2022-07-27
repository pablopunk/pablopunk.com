import React from 'react'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import humanFormat from 'human-format'
import { Loading } from 'components/Loading'
import { _ } from 'locales'
import { Card } from './Card'
import { BorderGradient } from './BorderGradient'

const API = 'https://repos.pablopunk.com/api'
const MAX_REPOS = 8

const fetcher = (url) => fetch(url).then((_) => _.json())

const cleanReposData = (data: any[]) => {
  const wantedKeys = ['name', 'html_url', 'stargazers_count', 'description']
  const cleanData = data.map((dataObject) => {
    for (const key of Object.keys(dataObject)) {
      if (!wantedKeys.includes(key)) {
        delete dataObject[key]
      }
    }
    return dataObject
  })

  return cleanData
}

export const fetchAllReposData = () => fetcher(API).then(cleanReposData)

export function Repos({ locale, initialData }) {
  const { data, error } = useSWR(API, fetcher, { initialData })

  if (error) {
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
      description: _(repo.description ?? '', locale),
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
          <BorderGradient>
            <Card
              title={`/${repo.name}`}
              subtitle={`${repo.stargazers_count_nice} ⭐️`}
              description={repo.description}
              link={{ url: repo.html_url }}
            />
          </BorderGradient>
        </div>
      ))}
    </div>
  )
}
