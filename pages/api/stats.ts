import { NextApiResponse } from 'next'
import Unsplash, { toJson } from 'unsplash-js'

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_TOKEN
const githubToken = process.env.GITHUB_TOKEN

const fetcher = (url) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${githubToken}` },
  }).then((r) => r.json())

export async function getUnsplashStats() {
  const unsplashClient = new Unsplash({
    accessKey: unsplashAccessKey,
  })

  const userStats = await unsplashClient.users.statistics('pablopunk')
  const unsplash = await toJson(userStats)

  return unsplash
}

export async function getGithubStats() {
  const user = await fetcher('https://api.github.com/users/pablopunk')
  const repos = await fetcher(user.repos_url + '?per_page=100')

  user.stars_received = repos?.reduce(
    (acc, curr) => acc + curr.stargazers_count,
    0,
  )

  return user
}

export default async function stats(_, res: NextApiResponse) {
  const [unsplash, github] = await Promise.all([
    getUnsplashStats(),
    getGithubStats(),
  ])

  res.status(200).json({ unsplash, github })
}
