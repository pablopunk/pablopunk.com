import { definitions } from './generated-types'

export type TranslationRequest = Partial<definitions['translation_requests']>
export type Like = Partial<definitions['likes']>
export type Translation = Partial<definitions['i18n']>
export type User = Partial<definitions['users']>
type PostTable = definitions['posts']
interface PostWithTypedState extends PostTable {
  status: 'live' | 'draft'
}
export type Post = Partial<PostWithTypedState>
