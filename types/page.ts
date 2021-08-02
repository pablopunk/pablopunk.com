import { ButtonType, PageContentType, PostType } from 'cms/storyblok/types'

export interface PageProps {
  nav?: {
    content: {
      main: ButtonType[]
    }
  }
  page?: {
    content: PageContentType & PostType['content']
    lang: string
    path: string
    name?: string
  }
  preview?: boolean
  statusCode?: string
}
