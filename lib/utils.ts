export function openLink(link: string) {
  if (link.startsWith('http')) {
    window.open(link)
  } else {
    window.open(`https://${link}`)
  }
}

export function postJson(url: string, data: any) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
