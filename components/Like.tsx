import { checkIfUserDidSomething, userDidSomething } from 'lib/storage'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button } from 'storyblok/components/Button'
import { useLikes } from 'supabase/tables/likes'

type Props = {
  slug: string
}

const LikeComponent: FunctionComponent<Props> = ({ slug }) => {
  const [buttonText, setButtonText] = useState('❤️')
  const likeCount = useLikes(slug)
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const event = 'liked-' + slug

  useEffect(() => {
    if (slug && checkIfUserDidSomething(event)) {
      setAlreadyLiked(true)
    }
  }, [])

  const likeThis = () => {
    fetch(`/api/like`, {
      method: 'POST',
      body: JSON.stringify({
        slug,
      }),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response?.status === 'ok') {
          setAlreadyLiked(true)
          userDidSomething(event)
        } else {
          setButtonText('Error 👎🏻')
        }
      })
      .catch((err) => {
        console.error(err)
        setButtonText('Error 👎🏻')
      })
  }

  return (
    <Button size="sm" type="outline" disabled={alreadyLiked} onClick={likeThis}>
      {buttonText} {likeCount}
    </Button>
  )
}

export default LikeComponent
