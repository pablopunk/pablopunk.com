import { fetchNumberOfVisits } from '~/goatcounter'
import { Post } from '~/supabase/types'
import { useEffect, useState } from 'react'

export const useVisitsCount = (post: Post) => {
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    fetchNumberOfVisits(post).then(setVisits)
  }, [post])

  return visits
}
