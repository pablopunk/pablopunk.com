import { useRouter } from 'next/router'
import { _ } from 'locales'
import { useEffect, useState } from 'react'

const genericPage = (locale: string) => ({
  title: _('Remote Web Developer | Pablo Varela', locale),
  description: _(
    "Check out my work or contact me. I'm @pablopunk in most social networks",
    locale,
  ),
})

const getMeta = (pathname: string | null, locale: string) => {
  // switch (pathname) {
  //   case null:
  // }

  return genericPage(locale)
}

export const useMeta = (): {
  title: string
  description: string
  imageUrl?: string
} => {
  const { pathname, locale } = useRouter()
  const [meta, setMeta] = useState(getMeta(pathname, locale))

  useEffect(() => {
    setMeta(getMeta(pathname, locale))
  }, [pathname, locale])

  return meta
}
