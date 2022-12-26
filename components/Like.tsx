import { checkIfUserDidSomething, userDidSomething } from '~/lib/storage'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button } from '~/components/neon/Button'
import useLikes from '~/db/hooks/useLikes'
import { postJson } from '~/lib/utils'
import { RiHeart2Line } from 'react-icons/ri'
import { useTranslation } from '~/hooks/useTranslation'

const responseToJSON = (response: any) => response.json()

type Props = {
  slug: string
}

const LikeComponent: FunctionComponent<Props> = ({ slug }) => {
  const likeCount = useLikes(slug)
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const event = 'liked-' + slug
  const { _ } = useTranslation()

  useEffect(() => {
    if (slug && checkIfUserDidSomething(event)) {
      setAlreadyLiked(true)
    }
  }, [])

  const likeThis = () => {
    setAlreadyLiked(true)
    postJson(`/api/like`, { slug })
      .then(responseToJSON)
      .then((response) => {
        userDidSomething(event)
        if (response?.status !== 'ok') {
          console.error(response)
          console.error(response?.error)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Button
      size="sm"
      disabled={alreadyLiked}
      onClick={likeThis}
      LeftIcon={RiHeart2Line}
      className="button-like"
      title={_('likes')}
    >
      {likeCount}
    </Button>
  )
}

export default LikeComponent
