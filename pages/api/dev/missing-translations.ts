import {
  getAllTranslationsForLocale,
  insertTranslation,
} from 'models/supabase/tables/i18n'
import { Translation } from '~/models/translation'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function MissingTranslation(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { translations: missingTranslations } = JSON.parse(req.body ?? {}) as {
    translations: Translation[]
  }

  if (!missingTranslations) {
    return res
      .status(400)
      .json({ error: 'Missing arg in body: "translations"' })
  }

  if (!missingTranslations.length) {
    return res.status(200).json([])
  }

  const translations = await getAllTranslationsForLocale(
    missingTranslations[0].locale,
  )
  const actualMissingTranslations = missingTranslations.filter(
    (missing) => !translations.some((t) => t.key === missing.key),
  )

  return Promise.all(actualMissingTranslations.map(insertTranslation))
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((error) => {
      console.error(error)
      return res.status(500).json({ error })
    })
}
