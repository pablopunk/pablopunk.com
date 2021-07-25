import { NextApiRequest, NextApiResponse } from 'next'
import { Like } from 'supabase/types'
import { sendErrorEmail } from 'sendgrid/templates/error'
import { getClientIp } from '@supercharge/request-ip'
import { getAllLikesForIpAndSlug, insertLike } from 'supabase/tables/likes'

export default async function RequestTranslationApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed')
  }

  const slug: string = JSON.parse(req.body || {}).slug

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
      return res.status(200).send({ status: 'ok' })
    }
  }

  const { error } = await insertLike(like)

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).send({ error })
    }

    await sendErrorEmail(error.message, process.env.ADMIN_EMAIL)

    return res.status(500).send({ error: 'Error inserting on db' })
  }

  return res.status(200).send({ status: 'ok' })
}
