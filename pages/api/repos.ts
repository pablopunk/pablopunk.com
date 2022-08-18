import type { Repo } from '../../types'
import * as dotenv from 'dotenv'
import fetch from 'isomorphic-unfetch'
import { NextApiRequest, NextApiResponse } from 'next'

dotenv.config()

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_API = 'https://api.github.com/users/pablopunk/repos'

const sec = 1
const min = 60 * sec
const CACHE_TIME = 15 * min

export type Repo = {
  name: string
  html_url: string
  description: string
  stargazers_count: number
  language: string
}

const fetchFromAPI = async (page: number) =>
  fetch(`${GITHUB_API}?page=${page}&per_page=100`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  }).then((response) => response.json())

const cleanRepos = (repos: Repo[]) =>
  repos.map((repo) => ({
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
  }))

export const getReposApiResponse = async () => {
  const allRepos: Repo[] = []
  let moreRepos = true,
    page = 1

  while (moreRepos) {
    const pageRepos: Repo[] = await fetchFromAPI(page++)

    allRepos.push(...pageRepos)

    if (pageRepos.length === 0) {
      moreRepos = false
    }
  }

  return cleanRepos(allRepos)
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  return getReposApiResponse()
    .then((repos) => {
      response.setHeader('Cache-Control', 's-maxage=' + CACHE_TIME)
      return response.status(200).json(repos)
    })
    .catch((error) => {
      return response.status(500).json(error)
    })
}
