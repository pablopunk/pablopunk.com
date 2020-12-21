import { NextApiResponse } from 'next'
import Unsplash, { toJson } from 'unsplash-js'

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_TOKEN

export default async function stats(_, res: NextApiResponse) {
  const unsplashClient = new Unsplash({
    accessKey: unsplashAccessKey,
  })

  const userStats = await unsplashClient.users.statistics('pablopunk')
  const unsplash = await toJson(userStats)

  res.status(200).json({ unsplash })
}
