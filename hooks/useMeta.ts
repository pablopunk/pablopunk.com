import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from './useTranslation'

const genericPage = (_: any) => ({
  title: _('Remote Web Developer | Pablo Varela'),
  description: _(
    "Check out my work or contact me. I'm @pablopunk in most social networks",
  ),
})

const getMeta = (pathname: string | null, _: any) => {
  // switch (pathname) {
  //   case null:
  // }

  return genericPage(_)
}

export const useMeta = (): {
  title: string
  description: string
  imageUrl?: string
} => {
  const { pathname } = useRouter()
  const { _ } = useTranslation()
  const [meta, setMeta] = useState(getMeta(pathname, _))

  useEffect(() => {
    setMeta(getMeta(pathname, _))
  }, [pathname])

  return meta
}
