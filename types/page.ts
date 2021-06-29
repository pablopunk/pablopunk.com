import { ButtonType, ImageType } from 'storyblok/types'

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
    }
    lang: string
    path: string
  }
  preview?: boolean
  statusCode?: string
}
