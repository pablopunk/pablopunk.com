import { useMemo } from 'react'
import { useMedia } from 'react-use'
import tailwindConfig from 'tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

const tailwindFullConfig = resolveConfig(tailwindConfig)

export function useMediaSmallerThan(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
  const breakpoint = useMemo(
    () => tailwindFullConfig.theme.screens[size],
    [size],
  )

  return useMedia(`(max-width: ${breakpoint})`)
}
