import { useEffect, useState } from 'react'

export const useVisitsCount = (): null | number => {
  const [count, setCount] = useState(null)
  useEffect(() => {
    if (typeof location !== 'undefined') {
      fetch(
        'https://pablopunk.goatcounter.com/counter/' +
          encodeURIComponent(location.pathname) +
          '.json',
      )
        .then((res) => res.json())
        .then((result) => {
          if (result?.count) {
            const countNumber = parseInt(result?.count.replace('.', ''))
            setCount(countNumber)
          }
        })
        .catch((err) => {
          console.log('Error fetching visits', err)
        })
    }
  })

  return count
}
