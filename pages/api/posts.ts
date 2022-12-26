import {
  deletePost,
  getAllPostsForLocale,
  insertPost,
  updatePost,
} from '~/db/supabase/tables/posts'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function postsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'GET') {
    const { locale } = req.query as { locale: string }
    const posts = await getAllPostsForLocale(locale, true)

    return res.status(200).json(posts)
  }

  if (method === 'POST') {
    const { data, error } = await insertPost(req.body)
    if (error) {
      console.error(error)
      return res.status(500).json({ error })
    } else {
      return res.status(200).json(data)
    }
  }

  if (method === 'PUT') {
    const { data, error } = await updatePost(req.body)
    if (error) {
      console.error(error)
      return res.status(500).json({ error })
    } else {
      return res.status(200).json(data)
    }
  }

  if (method === 'DELETE') {
    const { data, error } = await deletePost(req.body)
    if (error) {
      console.error(error)
      return res.status(500).json({ error })
    } else {
      return res.status(200).json(data)
    }
  }
}
