import { useEffect, useState } from 'react'

export const useRandomFromArray = <T extends unknown>(array: T[]) => {
  const [value] = useState(
    () => array[Math.floor(Math.random() * array.length)],
  )
  return value
}

export const useRandomFromArrayInterval = <T extends unknown>(
  array: T[],
  initialValue: T,
  interval: number,
) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('setting value')
      setValue(array[Math.floor(Math.random() * array.length)])
    }, interval)
    return () => clearInterval(intervalId)
  }, [array, interval])

  return value
}
