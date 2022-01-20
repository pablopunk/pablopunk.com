export type LinkType = { url: string }
export type AlignType = 'left' | 'center' | 'right'
export type ButtonType = {
  text?: string
  icon?: string
  link?: LinkType
  size?: 'sm' | 'md' | 'lg'
  type?: 'primary' | 'secondary' | 'outline'
  rounded?: boolean
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
    subtitle: string
    image: ImageType
    translated: boolean
  }
  created_at: string
}
export type PageContentType = {
  body: any[]
  metadata: any
}
export type ImageType = {
  id: string
  filename: string
}
export type NavType = {
  content?: {
    main: ButtonType[]
  }
}
export type FooterType = {
  content?: {
    copyright: string
    source: string
  }
}
