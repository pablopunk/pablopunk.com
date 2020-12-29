import React from 'react'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import humanFormat from 'human-format'
import Loading from 'components/pure/Loading'
import { _ } from 'lib/locales'
import styled from 'styled-components'
import { smallMediaQuery } from 'components/utils/media-queries'
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

function Repos({ locale }) {
  const { data, error } = useSWR(API, fetcher)

  if (error) {
    return <strong style={{ color: 'orangered' }}>Error fetching repos</strong>
  }

  if (!data) {
    return <Loading />
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
    <div>
      {repos.map((repo) => (
        <div key={repo.name}>
          <span className="first-line">
            <a href={repo.html_url}>/{repo.name}</a>
            <span>{repo.stargazers_count_nice}</span>
            <span>
              <AiFillStar color="gold" />
            </span>
          </span>
          <p>{repo.description}</p>
        </div>
      ))}
      <style jsx>{`
        .first-line {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .first-line > * {
          margin-right: 1rem;
        }
        div {
          background-color: var(--color-bgDim);
          border: 1px solid var(--color-accent);
          padding: var(--space-2);
          box-shadow: 5px 5px 20px 2px var(--color-bgDim);
        }
      `}</style>
    </div>
  )
}

export default React.memo(Repos)
