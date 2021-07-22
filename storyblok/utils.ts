import { PostType } from './types'

const howOldAmI = () => {
  const now = new Date()
  const iHadABirthDayThisYear = now.getMonth() >= 6 && now.getDate() >= 9
  const yearsSinceIWasBorn = now.getFullYear() - 1993
  const yearsOld = iHadABirthDayThisYear
    ? yearsSinceIWasBorn
    : yearsSinceIWasBorn - 1

  return yearsOld.toString()
}

const YEARS_OLD = (text: string) => text.replace('%YEARS_OLD%', howOldAmI())

export const handlePlaceholders = (text: string) => {
  if (!text) return ''

  let newText = String(text)

  newText = YEARS_OLD(text)

  return newText
}

export function getTranslatedSlug(post: PostType, locale: string) {
  const translatedSlug = post.translated_slugs?.find(
    (slug) => slug.lang === locale,
  )

  return (
    translatedSlug || {
      lang: locale,
      name: post.name,
      path: post.default_full_slug,
    }
  )
}
