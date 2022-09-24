import React from 'react'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import humanFormat from 'human-format'
import { Loading } from 'components/Loading'
import { Card } from './neon/Card'
import { useTranslation } from 'hooks/useTranslation'
import { FaGithub, FaStar } from 'react-icons/fa'
import { T } from 'components/T'
import { Repo } from 'pages/api/repos'

const API = '/api/repos'
const MAX_REPOS = 8

const fetcher = (url) => fetch(url).then((_) => _.json())

export function Repos({ initialData }) {
  const { _ } = useTranslation()
  const { data, error } = useSWR<Repo[]>(API, fetcher, { initialData })

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
      stargazers_count_nice: humanFormat(repo.stargazers_count, {
        decimals: 1,
      }),
    }))

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 mb-8 md:grid-cols-2">
      {repos.map((repo, i) => {
        return (
          <div key={repo.html_url}>
            <Card
              title={`/${repo.name}`}
              secondary={[1, 2, 5, 6, 9, 10].includes(i)}
              className="h-full"
              CTA={[{
                RightIcon: FaStar,
                text: repo.stargazers_count.toString(),
                disabled: true
              }, { RightIcon: FaGithub, title: _('Github'), href: repo.html_url }]}
            >
              <T>
                {repo.description}
              </T>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
