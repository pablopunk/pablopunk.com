import useSWR from 'swr'
import fetch from 'unfetch'
import SimpleList from './SimpleList'

const GITHUB_TOKEN = process.env.REPOS_GITHUB_TOKEN
const API = 'https://api.github.com'

const ADDITIONAL_REPOS = [
  {
    name: 'lad',
    html_url: 'https://github.com/ladjs/lad',
    stargazers_count: '1.7k',
    description: 'Lad scaffolds a Koa webapp and API framework for Node.js'
  }
]

const fetcher = url =>
  fetch(API + url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
  }).then(r => r.json())

export default () => {
  let { data, error } = useSWR('/users/pablopunk/repos?sort=updated', fetcher)

  if (!data) {
    return <strong>Fetching repos...</strong>
  }

  if (error) {
    return <strong style={{ color: 'orangered' }}>Error fetching repos</strong>
  }

  data = [...ADDITIONAL_REPOS, ...data]

  const repos = (data as Array<any>)
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
