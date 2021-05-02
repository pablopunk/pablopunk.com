import { ButtonType } from 'storyblok/types'

export interface PageProps {
  nav: {
    content: {
      main: ButtonType[]
    }
  }
  page: {
    content: {
      body: any[]
      metadata: any
    }
    lang: string
    path: string
  }
  statusCode: string
}
