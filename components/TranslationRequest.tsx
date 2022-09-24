import { checkIfUserDidSomething, userDidSomething } from 'lib/storage'
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { Button } from 'components/neon/Button'
import { Dialog, Transition } from '@headlessui/react'
import useTranslationRequestsCount from 'db/hooks/useTranslationRequestsCount'
import { postJson } from 'lib/utils'

type Props = {
  slug: string
}

const TranslationRequestComponent: FunctionComponent<Props> = ({ slug }) => {
  const [translationWasRequested, setTranslationWasRequested] = useState(false)
  const [translationButtonText, setTranslationButtonText] = useState('🇪🇸')
  const translationRequestsCount = useTranslationRequestsCount(slug)
  const [dialogOpen, setDialogOpen] = useState(false)
  const event = 'request-translation-' + slug

  useEffect(() => {
    if (slug && checkIfUserDidSomething(event)) {
      setTranslationWasRequested(true)
      setTranslationButtonText('🎉')
    }
  }, [])

  const translationRequestButtonClick = () => {
    setDialogOpen(true)
    setTranslationWasRequested(true)
    postJson(`/api/request-translation`, { slug })
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
              <div className="z-20 flex flex-col items-center justify-center max-w-md p-4 mx-auto border rounded-lg bg-bg-2">
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
      <Button
        title="Pedir traducción al español"
        onClick={translationRequestButtonClick}
        disabled={translationWasRequested}
        size="sm"
      >
        {translationButtonText}
        <span className="ml-1">
          {translationRequestsCount}
          {translationWasRequested && '- ya has votado'}
        </span>
      </Button>
    </>
  )
}

export default TranslationRequestComponent
