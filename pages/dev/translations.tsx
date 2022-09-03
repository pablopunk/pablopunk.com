import { Translation } from 'db/supabase/types'
import { useRouter } from 'next/router'
import { Section } from 'components/Section'
import { Button } from 'components/Button'
import useSWR from 'swr'
import { useTranslation } from 'hooks/useTranslation'
import { useCallback, useRef, useState } from 'react'
import {
  updateTranslation,
  getAllTranslationsForLocale,
} from 'db/supabase/tables/i18n'
import { GetStaticPropsContext } from 'next'
import { pageStaticProps } from 'middleware'
import { T } from 'components/T'
import { BiArrowBack } from 'react-icons/bi'

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
  const { data, revalidate } = useSWR(
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
  return (
    <div className="mt-3">
      <Section>
        <Button Icon={BiArrowBack} href="/dev">
          <T>Go back</T>
        </Button>
      </Section>
      <Section className="border rounded-lg p-2 w-full bg-bg-2">
        <h2 className="text-xl mb-2 flex gap-2 justify-between">
          <T>Translations</T>
          <Button
            onClick={() => setShowMissing(!showMissing)}
            size="sm"
            className="inline"
          >
            {showMissing ? _('Show all') : _('Show missing')}
          </Button>
        </h2>
        <table>
          <thead>
            <tr>
              <th>/</th>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data?.filter(filters).map((translation) => (
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
