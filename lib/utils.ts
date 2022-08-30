export function openLink(link: string) {
  if (link.startsWith('http')) {
    window.open(link)
  } else {
    window.open(`https://${link}`)
  }
}

const headersForJson = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const postJson = (url: string, data: any) =>
  fetch(url, {
    method: 'POST',
    ...headersForJson,
    body: JSON.stringify(data),
  })

export const getJson = (url: string) =>
  fetch(url, headersForJson).then((res) => res.json())

export function normalizeHref(url?: string) {
  if (
    url == null ||
    url.includes('://') ||
    url.includes('mailto') ||
    url.startsWith('/')
  ) {
    return url
  }

  return '/' + url
}

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

export function handlePlaceholders(text: string) {
  if (!text) return ''

  let newText = String(text)

  newText = YEARS_OLD(text)

  return newText
}
