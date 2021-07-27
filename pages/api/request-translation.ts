import { NextApiRequest, NextApiResponse } from 'next'
import {
  getAllTranslationRequestsForIpAndSlug,
  insertTranslationRequest,
} from 'db/supabase/tables/translation_requests'
import { TranslationRequest } from 'db/supabase/types'
import geoip from 'geoip-country'
import { sendTranslationRequestEmail } from 'email/sendTranslationRequestEmail'
import { sendErrorEmail } from 'email/sendErrorEmail'
import { getClientIp } from '@supercharge/request-ip'

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

    await sendErrorEmail(error.message, process.env.ADMIN_EMAIL)

    return res.status(500).send({ error: 'Error inserting on db' })
  }

  await sendTranslationRequestEmail(tRequest, process.env.ADMIN_EMAIL)

  return res.status(200).send({ status: 'ok' })
}
