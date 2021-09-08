import React, { Fragment } from 'react'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import humanFormat from 'human-format'
import Loading from 'components/Loading'
import { _ } from 'locales'
import { AiFillStar } from 'react-icons/ai'
import { AnimatedCard } from 'components/AnimatedCard'
import { useAppearedOnScreen } from 'hooks/useFirstTimeVisible'

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

const Repo = ({
  repo,
  className,
}: {
  repo: {
    name: string
    html_url: string
    description: string
    stargazers_count_nice: number
  }
  className?: string
}) => {
  return (
    <div className={className}>
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
  )
}

function Repos({ locale, initialData }) {
  const { data, error } = useSWR(API, fetcher, { initialData })
  const [elementRef, appearedOnScreen] = useAppearedOnScreen<HTMLDivElement>()

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

  const boxStyles = 'px-4 py-3 m-2 border rounded-lg shadow-lg bg-bg2'

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2" ref={elementRef}>
      {repos.map((repo, index) => (
        <Fragment key={repo.name}>
          {appearedOnScreen ? (
            <AnimatedCard index={index} className={boxStyles}>
              <Repo repo={repo} />
            </AnimatedCard>
          ) : (
            <Repo repo={repo} className={boxStyles} />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default Repos
