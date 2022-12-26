import { Post } from '~/db/supabase/types'
import { useVisitsCount } from '~/hooks/useVisitsCount'
import { BsGraphUp } from 'react-icons/bs'
import type { Size } from '~/types/styles'
import classNames from 'classnames'
import { useTranslation } from '~/hooks/useTranslation'

export const Visits = ({ post, size }: { post: Post, size?: Size }) => {
  const visits = useVisitsCount(post)
  const { _ } = useTranslation()
  return (
    <span className={classNames('flex gap-1 items-center opacity-50', {
      'text-xs': size === 'xs',
    })}>
      {visits && (
        <>
          <BsGraphUp size={10} />
          <span title={_("Visits")}>{visits}</span>
        </>
      )}
    </span>
  )
}
