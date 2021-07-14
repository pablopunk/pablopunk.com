import { NextApiRequest, NextApiResponse } from 'next'
import {
  getAllTranslationRequestsForIpAndSlug,
  insertTranslationRequest,
} from 'supabase/tables/translation_requests'
import { TranslationRequest } from 'supabase/types'
import geoip from 'geoip-country'

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

  const ip =
    req.headers.forwarded ||
    req.headers.x_forwarded_for ||
    req.rawHeaders['remoteAddress'] ||
    req.socket.remoteAddress
  const guessed_country = ip == null ? null : geoip.lookup(ip)?.country || null

  const tRequest: TranslationRequest = {
    ip,
    slug,
    guessed_country,
  }

  if (ip) {
    const allRequests = await getAllTranslationRequestsForIpAndSlug({
      ip,
      slug,
    })

    if (allRequests.length > 0) {
      // ip already requested a translation for this slug
      return res.status(200).send({ status: 'ok' })
    }
  }

  const { error } = await insertTranslationRequest(tRequest)

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).send({ error })
    }
    return res.status(500).send({ error: 'Error inserting on db' })
  }

  return res.status(200).send({ status: 'ok' })
}
