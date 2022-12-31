import { getVisits, Post } from '~/models/post'
import { useEffect, useState } from 'react'

export const useVisitsCount = (post: Post) => {
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    getVisits(post).then(setVisits)
  }, [post])

  return visits
}
