import useSWR from 'swr'
import SimpleList from './SimpleList'
import fetch from 'unfetch'

const API = 'https://repos.pablo.pink/api'

const ADDITIONAL_REPOS = [
  {
    name: 'lad',
    html_url: 'https://github.com/ladjs/lad',
    stargazers_count: '1.7k',
    description: 'Lad scaffolds a Koa webapp and API framework for Node.js'
  }
]

const fetcher = url => fetch(url).then(_ => _.json())

export default () => {
  const { data, error } = useSWR(API, fetcher)

  if (error) {
    return <strong style={{ color: 'orangered' }}>Error fetching repos</strong>
  }

  if (!data) {
    return <strong>Fetching repos...</strong>
  }

  const repos = [...ADDITIONAL_REPOS, ...data]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .map(repo => ({
      ...repo,
      description: repo.description?.replace('[UNMANTAINED]. ', '') || ''
    }))
    .slice(0, 13)

  return (
    <SimpleList>
      {repos.map(repo => (
        <li key={repo.name}>
          <a href={repo.html_url}>/{repo.name}</a> ⭐{repo.stargazers_count}
          <p>{repo.description}</p>
        </li>
      ))}
    </SimpleList>
  )
}
