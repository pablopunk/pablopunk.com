import { NextApiRequest } from 'next'

export default async function IsAdmin(req: NextApiRequest, res) {
  const user = JSON.parse(req.body)
  const isAdmin = user.id === process.env.SUPABASE_ADMIN_USER_ID

  res.status(200).json({ isAdmin })
}
