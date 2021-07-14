import classNames from 'classnames'
import { checkIfUserDidSomething, userDidSomething } from 'lib/storage'
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { Button } from 'storyblok/components/Button'
import { getAllTranslationRequestsForSlug } from 'supabase/translation_requests'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
  slug: string
}

const TranslationRequestComponent: FunctionComponent<Props> = ({ slug }) => {
  const [translationWasRequested, setTranslationWasRequested] = useState(false)
  const [translationButtonText, setTranslationButtonText] = useState('🇪🇸')
  const [translationRequestsCount, setTraslationRequestsCount] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
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
    setDialogOpen(true)
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
    <>
      <Transition show={dialogOpen} appear as={Fragment}>
        <Dialog
          onClose={() => setDialogOpen(false)}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 opacity-30 bg-bg" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="z-20 flex flex-col items-center justify-center max-w-md p-4 mx-auto border rounded-lg shadow-lg bg-bg2">
                <Dialog.Title as="h4" className="text-2xl">
                  ¡Hecho!
                </Dialog.Title>
                <p className="my-4 text-justify">
                  Tu petición para traducir este artículo la guardo en una base
                  de datos. Si veo que le interesa a mucha gente, me plantearé
                  traducirlo. Gracias de nuevo 🌚
                </p>
                <Button onClick={() => setDialogOpen(false)}>Cerrar</Button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
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
            className="text-sm bg-bg"
          >
            {translationButtonText}
            <span className="ml-2">
              {translationRequestsCount} votos{' '}
              {translationWasRequested && '(ya has votado)'}
            </span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default TranslationRequestComponent
