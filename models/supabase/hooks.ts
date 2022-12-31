import { useEffect, useState } from 'react'
import { useFilter, useRealtime } from 'react-supabase'
import { LIKES_TABLE } from './tables'

function useSlugCountInTable(tableName: string, slug?: string) {
  const [count, setCount] = useState(0)
  const filter = useFilter((query) => query.eq('slug', slug), [slug])
  const [{ data, error }] = useRealtime(tableName, {
    select: {
      columns: 'id, slug',
      filter,
    },
  })

  useEffect(() => {
    const requestsWithThisSlug = data?.filter((t) => t.slug === slug) || []

    setCount(requestsWithThisSlug.length)
  }, [data])

  if (error) {
    console.error(error)
    setCount(0)
  }

  return count
}

export function useLikes(slug: string) {
  return useSlugCountInTable(LIKES_TABLE, slug)
}
