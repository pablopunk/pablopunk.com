export type LinkType = { url: string }
export type AlignType = 'left' | 'center' | 'right'
export type ButtonType = {
  text?: string
  type?: 'social'
  icon?: string
  link?: LinkType
}
export type PostType = {
  name: string
  full_slug: string
  translated_slugs: Array<{
    lang: string
    name: string
    path: string
  }>
  content: {
    content: string
    image: ImageType
  }
  created_at: string
}

export type ImageType = {
  id: string
  filename: string
}
