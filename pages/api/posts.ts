import { DEFAULT_LOCALE } from 'locales'
import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from 'storyblok/middleware'

export default async function postsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const page = parseInt(req.query.page as string) || 1
  const locale = (req.query.locale as string) || DEFAULT_LOCALE
  const results = await getAllPosts(page, req.preview, locale)

  if (!results.posts) {
    return res.status(500).send({ error: 'Error 500' })
  }

  res.status(200).send(results)
}
