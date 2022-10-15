import {
  getAllPostsForLocale,
  insertPost,
  updatePost,
} from 'db/supabase/tables/posts'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function postsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'GET') {
    const { locale } = req.query as { locale: string }
    const { data, error } = await getAllPostsForLocale(locale)

    if (error) {
      console.error(error)
      res.status(500).json({ error })
    } else {
      res.status(200).json(data)
    }
  }

  if (method === 'POST') {
    const { data, error } = await insertPost(req.body)
    console.log(typeof req.body, data, error)
    if (error) {
      console.error(error)
      res.status(500).json({ error })
    } else {
      res.status(200).json(data)
    }
  }

  if (method === 'PUT') {
    const { data, error } = await updatePost(req.body)
    if (error) {
      console.error(error)
      res.status(500).json({ error })
    } else {
      res.status(200).json(data)
    }
  }
}
