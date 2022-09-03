import { Section } from 'components/Section'
import {
  getAllTranslationsForLocale,
  updateTranslation,
} from 'db/supabase/tables/i18n'
import { Translation } from 'db/supabase/types'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { Button } from 'components/Button'
import useSWR from 'swr'
import { useTranslation } from 'hooks/useTranslation'
import { pageStaticProps } from 'middleware'

type Props = {
  initialData: Translation[]
}

const fetcher = (url) => fetch(url).then((r) => r.json())

const EditableCell = ({ value: initialValue, onSave }) => {
  const inputRef = useRef<HTMLInputElement>()
  const [value, setValue] = useState(initialValue)

  return (
    <td className="w-1/2 px-2 py-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        onKeyUp={(ev) => {
          if (ev.key === 'Enter') {
            onSave(value)
            inputRef.current?.blur()
          }
        }}
        onBlur={() => onSave(value)}
        contentEditable
        className="bg-transparent w-full"
      />
    </td>
  )
}

export default function Dev({ initialData }: Props) {
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
    <>
      <h1 className="text-3xl text-center mt-4">God mode</h1>
      <Section className="border rounded-lg p-2 my-2 w-full bg-bg-2">
        <h2 className="text-xl mb-2 flex gap-2 justify-between">
          Translations
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
              <th>Locale</th>
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
    </>
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const initialData = await getAllTranslationsForLocale(ctx.locale)
  const { props: pageProps } = await pageStaticProps(ctx)

  return { props: { ...pageProps, initialData } }
}
