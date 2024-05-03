interface ImgArgs {
  w?: number
  h?: number
  q?: number
}
export const getImageUrl = (_url: string, { w, h, q }: ImgArgs) => {
  const url = new URL(_url)
  const params = new URLSearchParams(url.search)
  const transformations = []
  if (w) transformations.push(`w-${w}`)
  if (h) transformations.push(`h-${h}`)
  if (q) transformations.push(`q-${q}`)
  else transformations.push("q-85")
  params.set("tr", transformations.join(","))
  return `${url.origin}${url.pathname}?${params.toString()}`
}

// Test it
// console.log(getImageUrl("https://example.com/image.jpg?other=params", { w: 100, h: 100, q: 80 }))
