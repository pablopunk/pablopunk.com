import useSWR from 'swr'
import fetch from 'unfetch'
import SimpleList from './SimpleList'
import humanNumber from 'human-number'
import Loading from './Loading'

const API = 'https://repos.pablo.pink/api'

const ADDITIONAL_REPOS = [
  {
    name: 'lad',
    html_url: 'https://github.com/ladjs/lad',
    stargazers_count: '1700',
    description: 'Lad scaffolds a Koa webapp and API framework for Node.js',
  },
]

const fetcher = (url) => fetch(url).then((_) => _.json())

export default () => {
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
      stargazers_count_nice: humanNumber(repo.stargazers_count),
    }))

  return (
    <SimpleList>
      {repos.map((repo) => (
        <li key={repo.name}>
          <a href={repo.html_url}>/{repo.name}</a> ⭐
          {repo.stargazers_count_nice}
          <p>{repo.description}</p>
        </li>
      ))}
    </SimpleList>
  )
}
