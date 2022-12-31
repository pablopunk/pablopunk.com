import { Translation } from '~/models/translation'

export interface PageProps {
  statusCode?: string
  translations: { [key: Translation['key']]: Translation['value'] }
}
