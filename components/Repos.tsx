import React from 'react'
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

interface IState {
  repos?: Array<any>
  error?: Error
}

export default class Repos extends React.Component<{}, IState> {
  constructor(props) {
    super(props)

    this.state = {
      repos: null
    }
  }

  componentDidMount() {
    fetcher(API)
      .then(repos => {
        this.setState({ repos })
      })
      .catch(error => {
        this.setState({ error })
        throw error
      })
  }

  render() {
    const { repos, error } = this.state

    if (error) {
      return (
        <strong style={{ color: 'orangered' }}>Error fetching repos</strong>
      )
    }

    if (!repos) {
      return <strong>Fetching repos...</strong>
    }

    const myRepos = [...ADDITIONAL_REPOS, ...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map(repo => ({
        ...repo,
        description: repo.description?.replace('[UNMANTAINED]. ', '') || ''
      }))
      .slice(0, 13)

    return (
      <SimpleList>
        {myRepos.map(repo => (
          <li key={repo.name}>
            <a href={repo.html_url}>/{repo.name}</a> ⭐{repo.stargazers_count}
            <p>{repo.description}</p>
          </li>
        ))}
      </SimpleList>
    )
  }
}
