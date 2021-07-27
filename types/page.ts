import { ButtonType, ImageType } from 'cms/storyblok/types'

export interface PageProps {
  nav?: {
    content: {
      main: ButtonType[]
    }
  }
  page?: {
    content: {
      body: any[]
      metadata: any

      // articles
      title?: string
      content?: string
      image: ImageType
      translated: boolean
    }
    lang: string
    path: string
  }
  preview?: boolean
  statusCode?: string
}
