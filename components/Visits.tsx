import { Post } from '@db/supabase/types'
import { useVisitsCount } from '@hooks/useVisitsCount'
import { BsGraphUp } from 'react-icons/bs'
import { Button } from '@ui/Button'
import { useTranslation } from '@hooks/useTranslation'

export const Visits = ({ post }: { post: Post }) => {
  const { _ } = useTranslation()
  const visits = useVisitsCount(post)

  if (!visits) return null

  return (
    <Button disabled LeftIcon={BsGraphUp} text={visits} size="sm" title={_('visits')} />
  )
}
