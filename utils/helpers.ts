export function go(link: string) {
  if (link.startsWith('http')) {
    window.open(link)
  } else {
    window.open(`https://${link}`)
  }
}
