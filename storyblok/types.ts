export type LinkType = { url: string }
export type AlignType = 'left' | 'center' | 'right'
export type ButtonType = {
  text?: string
  icon?: string
  link?: LinkType
  size?: 'sm' | 'md' | 'lg'
  type?: 'primary' | 'secondary' | 'outline'
}
export type PostType = {
  name: string
  slug: string
  default_full_slug: string
  full_slug: string
  translated_slugs: Array<{
    lang: string
    name: string
    path: string
  }>
  content: {
    content: string
    image: ImageType
    subtitle: string
  }
  created_at: string
}

export type ImageType = {
  id: string
  filename: string
}
