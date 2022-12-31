import { NextApiRequest, NextApiResponse } from 'next'
import { Like } from '~/supabase/types'
import { sendErrorEmail } from '~/email/sendErrorEmail'
import { getClientIp } from '@supercharge/request-ip'
import { getAllLikesForIpAndSlug, insertLike } from '~/supabase/tables/likes'

export default async function LikeApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed')
  }

  if (typeof req.body !== 'object') {
    return res.status(400).send('Body is not JSON')
  }

  const slug: string = req.body?.slug || null

  if (!slug) {
    return res.status(400).send('Missing slug')
  }

  const ip = getClientIp(req) || null

  const like: Like = {
    ip,
    slug,
  }

  if (ip) {
    const allLikes = await getAllLikesForIpAndSlug(slug, ip)

    if (allLikes.length > 0) {
      // ip already liked this slug
      return res
        .status(200)
        .send({ status: 'ok', message: 'Already liked by this IP' })
    }
  }

  const { error } = await insertLike(like)

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).send({ error })
    }

    sendErrorEmail(error.message)

    return res.status(500).send({ error: 'Error inserting on db' })
  }

  return res.status(200).send({ status: 'ok' })
}
