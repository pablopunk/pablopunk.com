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
