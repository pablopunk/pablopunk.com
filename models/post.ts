import { fetchNumberOfVisits } from 'models/goatcounter'
import { Database } from 'models/supabase/generated-types'
export { getPost } from 'models/supabase/tables/posts'

export type Post = Database['public']['Tables']['posts']['Row'] & {
  status: 'live' | 'draft'
}

export const getPath = (post: Post): string => `/posts/${post.slug}`
export const getVisits = (post: Post): Promise<number> => {
  return fetchNumberOfVisits(getPath(post))
}
