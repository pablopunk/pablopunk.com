import { formatDistanceToNow, formatDistance } from 'date-fns'

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

export const getJson = <T>(url: string): Promise<T> =>
  fetch(url, headersForJson).then((res) => res.json())

export const getMonthsAgoDate = (months) => {
  const date = new Date()
  date.setMonth(date.getMonth() - months)
  return date
}

export const getDaysAgoDate = (days) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

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

export const howOldAmI = () => {
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

export function timeBetween(date1: Date, date2: Date) {
  const humanFormat = formatDistance(date1, date2)

  return humanFormat
}

export function timeSince(date: Date) {
  const humanFormat = formatDistanceToNow(date)

  return humanFormat
}
