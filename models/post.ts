import { fetchNumberOfVisits } from 'models/goatcounter'
import { definitions } from 'models/supabase/generated-types'
export { getPost } from 'models/supabase/tables/posts'

type PostTable = definitions['posts']
interface PostWithTypedState extends PostTable {
  status: 'live' | 'draft'
}
export type Post = Partial<PostWithTypedState>

export const getPath = (post: Post): string => `/posts/${post.slug}`

export const getVisits = (post: Post): Promise<number> => {
  return fetchNumberOfVisits(getPath(post))
}
