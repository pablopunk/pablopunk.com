export type LinkType = { url: string }
export type AlignType = 'left' | 'center' | 'right'
export type ButtonType = {
  text?: string
  type?: 'social'
  icon?: string
  link?: LinkType
}
