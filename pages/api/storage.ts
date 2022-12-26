import { uploadFile, deleteFile, listFiles } from '~/db/supabase/storage'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function StorageApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  if (method === 'POST') {
    const { file, path } = req.body

    try {
      const data = await uploadFile(file, path)
      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  if (method === 'DELETE') {
    const { path } = req.body

    try {
      const data = await deleteFile(path)
      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  if (method === 'GET') {
    try {
      const data = await listFiles()
      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
