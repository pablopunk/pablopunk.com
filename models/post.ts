import { definitions } from '~/supabase/generated-types'
export { getPost } from '~/supabase/tables/posts'

type PostTable = definitions['posts']
interface PostWithTypedState extends PostTable {
  status: 'live' | 'draft'
}
export type Post = Partial<PostWithTypedState>
