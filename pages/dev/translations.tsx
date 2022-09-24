import { Button } from 'components/neon/Button'
import { Section } from 'components/Section'
import { T } from 'components/T'
import {
  getAllTranslationsForLocale, removeTranslation, updateTranslation
} from 'db/supabase/tables/i18n'
import { Translation } from 'db/supabase/types'
import { useTranslation } from 'hooks/useTranslation'
import { pageStaticProps } from 'middleware'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { FaWindowClose, FaWindowMaximize } from 'react-icons/fa'
import { CgTrash } from 'react-icons/cg'
import useSWR from 'swr'

type Props = {
  initialData: Translation[]
}

const fetcher = (url) => fetch(url).then((r) => r.json())

const EditableCell = ({ value: initialValue, onSave }) => {
  const inputRef = useRef<HTMLInputElement>()
  const [value, setValue] = useState(initialValue)
  const [disabled, setDisabled] = useState(false)

  const save = useCallback(
    (value) => {
      const valueChanged = value !== initialValue
      if (!disabled && valueChanged) {
        setDisabled(true)
        onSave(value).then(() => setDisabled(false))
      }
    },
    [disabled, value, initialValue],
  )

  return (
    <td className="w-1/2 px-2 py-1">
      <input
        disabled={disabled === true}
        ref={inputRef}
        type="text"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        onKeyUp={(ev) => {
          if (ev.key === 'Enter') {
            save(value)
            inputRef.current?.blur()
          }
        }}
        onBlur={() => save(value)}
        contentEditable
        className="bg-transparent w-full disabled:opacity-60"
      />
    </td>
  )
}

export default function Translations({ initialData }: Props) {
  const { locale } = useRouter()
  const [showMissing, setShowMissing] = useState(false)
  const { _ } = useTranslation()
  const { data, revalidate, isValidating } = useSWR(
    '/api/dev/translations?locale=' + locale,
    {
      fetcher,
      initialData,
    },
  )
  const filters = useCallback(
    (translation: Translation) => {
      if (showMissing) {
        return !translation.value
      }
      return true
    },
    [showMissing],
  )

  const handleEditKey = (id) => (key) =>
    updateTranslation({ id, key }).then(revalidate)
  const handleEditValue = (id) => (value) =>
    updateTranslation({ id, value }).then(revalidate)
  const handleRemoveTranslation = (translation) => () =>
    removeTranslation(translation).then(revalidate)

  const translationsToShow = data?.filter(filters) || []

  return (
    <div>
      <Section>
        <Button LeftIcon={BiArrowBack} href="/dev">
          <T>Go back</T>
        </Button>
      </Section>
      <Section className="border rounded-lg p-2 w-full bg-neutral-2">
        <div className='flex items-center justify-between'>
          <h2 className="text-xl mb-2 flex gap-2 justify-between">
            <T>Translations</T>
          </h2>
          <Button
            onClick={() => setShowMissing(!showMissing)}
            className="inline"
            text={showMissing ? _('Show all') : _('Show missing')}
            LeftIcon={showMissing ? FaWindowMaximize : FaWindowClose}
            secondary
            size='sm'
          >
          </Button>
        </div>
        <table>
          <thead>
            <tr>
              {translationsToShow.length > 0 ? (
                <>
                  <th>/</th>
                  <th>Key</th>
                  <th>Value</th>
                </>
              ) : (
                <th>
                  <T>No results</T>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {translationsToShow.map((translation) => (
              <tr key={translation.id} className="whitespace-nowrap">
                <td>{translation.locale}</td>
                <EditableCell
                  value={translation.key}
                  onSave={handleEditKey(translation.id)}
                />
                <EditableCell
                  value={translation.value}
                  onSave={handleEditValue(translation.id)}
                />
                <td>
                  <button disabled={isValidating} className='text-danger hover:text-secondary-9 disabled:opacity-20' onClick={handleRemoveTranslation(translation)}>
                    <CgTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
      <style jsx>
        {`
          th {
            padding: 0.5rem 0.75rem;
            color: var(--color-primary-11);
          }
        `}
      </style>
    </div>
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const initialData = await getAllTranslationsForLocale(ctx.locale)
  const { props: pageProps } = await pageStaticProps(ctx)

  return { props: { ...pageProps, initialData } }
}
