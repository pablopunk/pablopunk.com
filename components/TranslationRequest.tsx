import classNames from 'classnames'
import { checkIfUserDidSomething, userDidSomething } from 'lib/storage'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button } from 'storyblok/components/Button'
import { getAllTranslationRequestsForSlug } from 'supabase/translation_requests'

type Props = {
  slug: string
}

const TranslationRequestComponent: FunctionComponent<Props> = ({ slug }) => {
  const [translationWasRequested, setTranslationWasRequested] = useState(false)
  const [translationButtonText, setTranslationButtonText] = useState('🇪🇸')
  const [translationRequestsCount, setTraslationRequestsCount] = useState(0)
  const event = 'request-translation-' + slug

  useEffect(() => {
    getAllTranslationRequestsForSlug(slug).then((items) =>
      setTraslationRequestsCount(items.length || 0),
    )
  }, [translationButtonText])

  useEffect(() => {
    if (slug && checkIfUserDidSomething(event)) {
      setTranslationWasRequested(true)
      setTranslationButtonText('🎉')
    }
  }, [])

  const translationRequestButtonClick = () => {
    setTranslationWasRequested(true)
    fetch(`/api/request-translation`, {
      method: 'POST',
      body: JSON.stringify({
        slug: slug,
      }),
    })
      .then((r) => r.json())
      .then((apiResponse) => {
        if (apiResponse.status === 'ok') {
          setTranslationButtonText('🎉')
          userDidSomething(event)
        } else {
          setTranslationButtonText('Error 👎🏻')
        }
      })
      .catch(() => {
        setTranslationButtonText('Error 👎🏻')
      })
  }
  return (
    <div
      className={classNames(
        'relative w-full p-3 border-l-2 bg-bg2 border-accent transition-opacity mb-3',
        {
          'opacity-50': translationWasRequested,
        },
      )}
    >
      <div className="mb-2">
        Aún no he traducido este artículo al español, pero si te interesa,
        házmelo saber presionando el siguiente botón:
      </div>
      <div className="flex items-center">
        <Button
          onClick={translationRequestButtonClick}
          disabled={translationWasRequested}
          className="text-sm"
        >
          {translationButtonText}
          <span className="ml-2">
            {translationRequestsCount} votos{' '}
            {translationWasRequested && '(ya has votado)'}
          </span>
        </Button>
      </div>
    </div>
  )
}

export default TranslationRequestComponent
