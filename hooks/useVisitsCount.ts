import { fetchNumberOfVisits } from '~/db/goatcounter'
import { Post } from '~/db/supabase/types'
import { useEffect, useState } from 'react'

export const useVisitsCount = (post: Post) => {
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    fetchNumberOfVisits(post).then(setVisits)
  }, [post])

  return visits
}
