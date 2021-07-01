import React from 'react'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import humanFormat from 'human-format'
import Loading from 'components/Loading'
import { _ } from 'lib/locales'
import { AiFillStar } from 'react-icons/ai'

const API = 'https://repos.pablopunk.com/api'

const ADDITIONAL_REPOS = [
  {
    name: 'codesandbox',
    html_url: 'https://github.com/codesandbox/codesandbox-client',
    stargazers_count: '9900',
    description: 'An online IDE for rapid web development',
  },
  {
    name: 'lad',
    html_url: 'https://github.com/ladjs/lad',
    stargazers_count: '1700',
    description: 'Lad scaffolds a Koa webapp and API framework for Node.js',
  },
  {
    name: 'forwardemail.net',
    html_url: 'https://github.com/forwardemail/free-email-forwarding',
    stargazers_count: '1500',
    description: 'The best free email forwarding for custom domains',
  },
]

const fetcher = (url) => fetch(url).then((_) => _.json())

export const fetchAllReposData = () => fetcher(API)

function Repos({ locale, initialData }) {
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

  const repos = [...ADDITIONAL_REPOS, ...data]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 13)
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
    <div className="grid sm:grid-cols-1 md:grid-cols-2">
      {repos.map((repo) => (
        <div
          key={repo.name}
          className="px-4 py-3 m-2 bg-bg2 rounded-lg shadow-lg"
        >
          <span className="flex items-center">
            <a href={repo.html_url} className="mr-2">
              /{repo.name}
            </a>
            <span>{repo.stargazers_count_nice}</span>
            <span className="ml-1">
              <AiFillStar color="gold" />
            </span>
          </span>
          <p className="text-lg">{repo.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Repos
