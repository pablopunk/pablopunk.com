import {
  FooterType,
  NavType,
  PageContentType,
  PostType,
} from 'cms/storyblok/types'

export interface PageProps {
  page?: {
    content: PageContentType & PostType['content']
    lang: string
    path: string
    name?: string
  }
  nav?: NavType
  footer?: FooterType
  preview?: boolean
  statusCode?: string
}
