import { Post } from 'db/supabase/types'
import { useVisitsCount } from 'hooks/useVisitsCount'
import { BsGraphUp } from 'react-icons/bs'

export const Visits = ({ post }: { post: Post }) => {
  const visits = useVisitsCount(post)
  return (
    <span className="flex gap-1 items-center opacity-50 text-xs">
      {visits && (
        <>
          <BsGraphUp size={10} />
          <span>{visits}</span>
        </>
      )}
    </span>
  )
}
