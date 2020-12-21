import { NextApiResponse } from 'next'
import Unsplash, { toJson } from 'unsplash-js'

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_TOKEN

let unsplashClient

export default async function stats(_, res: NextApiResponse) {
  let unsplash = {}

  if (!unsplashClient) {
    unsplashClient = new Unsplash({
      accessKey: unsplashAccessKey,
    })

    const userStats = await unsplashClient.users.statistics('pablopunk')
    unsplash = await toJson(userStats)
  }

  res.status(200).json({ unsplash })
}
