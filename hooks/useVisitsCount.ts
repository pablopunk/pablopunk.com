import { useEffect, useState } from 'react'

const API_URL = '/visits/'
const fetchFromApi = (pathname: string) =>
  fetch(API_URL + encodeURIComponent(pathname) + '.json')
    .then((res) => res.json())
    .then((result) => result?.count?.replace('.', '') || 0)
    .then((result) => parseInt(result))
    .catch((err) => {
      console.log('Error fetching visits', err)
      return null
    })

export const useVisitsCount = (): null | number => {
  const [count, setCount] = useState(null)
  useEffect(() => {
    if (typeof location !== 'undefined') {
      fetchFromApi(location.pathname).then((countNumber) =>
        setCount(countNumber),
      )
    }
  })

  return count
}

export const useVisitsCountMultiple = (pathnames: string[]) => {
  const [counts, setCounts] = useState<number[]>([])

  useEffect(() => {
    Promise.all(pathnames.map(fetchFromApi)).then(setCounts)
  }, [pathnames])

  return counts
}
