import { checkIfUserDidSomething, userDidSomething } from 'lib/storage'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button } from 'components/neon/Button'
import useLikes from 'db/hooks/useLikes'
import { postJson } from 'lib/utils'
import { RiHeart2Line } from 'react-icons/ri'

type Props = {
  slug: string
}

const LikeComponent: FunctionComponent<Props> = ({ slug }) => {
  const likeCount = useLikes(slug)
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const event = 'liked-' + slug

  useEffect(() => {
    if (slug && checkIfUserDidSomething(event)) {
      setAlreadyLiked(true)
    }
  }, [])

  const likeThis = () => {
    setAlreadyLiked(true)
    postJson(`/api/like`, { slug })
      .then((r) => r.json())
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
    >
      {likeCount}
    </Button>
  )
}

export default LikeComponent
