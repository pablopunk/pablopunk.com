import { MutableRefObject, useEffect, useState } from 'react'
import { useVisible } from 'react-hooks-visible'

export const useAppearedOnScreen = <T extends HTMLElement = HTMLElement>(): [
  MutableRefObject<T>,
  boolean,
] => {
  const [elementRef, isVisible] = useVisible<T>()
  const [appeared, setAppeared] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setAppeared(true)
    }
  }, [isVisible])

  return [elementRef, appeared]
}
