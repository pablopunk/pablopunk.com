import { getAllTranslationsForLocale } from '@db/supabase/tables/i18n'
import { NextApiRequest } from 'next'

export default async function (req: NextApiRequest, res) {
  const { locale } = req.query || {}

  return getAllTranslationsForLocale(locale as string)
    .then((translations) => {
      return res.status(200).json(translations)
    })
    .catch((error) => {
      console.error(error)
      return res.status(500).json(error)
    })
}
