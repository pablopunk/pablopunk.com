import { Button } from '@ui/Button'
import { Section } from '@components/Section'
import { T } from '@components/T'
import {
  getAllTranslationsForLocale,
  deleteTranslation,
  updateTranslation,
} from '@db/supabase/tables/i18n'
import { Translation } from '@db/supabase/types'
import { useTranslation } from '@hooks/useTranslation'
import { withAdminServerSideProps } from '@middleware'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { FaWindowClose, FaWindowMaximize } from 'react-icons/fa'
import { CgTrash } from 'react-icons/cg'
import useSWR from 'swr'
import { PageProps } from '@types/page'

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

const matchTranslationToSearch = (input, translation) => {
  const search = input.toLowerCase()
  const key = translation.key?.toLowerCase()
  const value = translation.value?.toLowerCase()
  return key?.includes(search) || value?.includes(search)
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
  const [searchInput, setSearchInput] = useState('')

  const filters = useCallback(
    (translation: Translation) => {
      const matchesSearch = searchInput
        ? matchTranslationToSearch(searchInput, translation)
        : true

      if (showMissing) {
        return !translation.value && matchesSearch
      }

      return matchesSearch
    },
    [showMissing, searchInput],
  )

  const handleEditKey = (id) => (key) =>
    updateTranslation({ id, key }).then(revalidate)
  const handleEditValue = (id) => (value) =>
    updateTranslation({ id, value }).then(revalidate)
  const handleDeleteTranslation = (translation) => () =>
    deleteTranslation(translation).then(revalidate)
  const handleSearchChange = (ev) => {
    setSearchInput(ev.target.value)
  }

  const translationsToShow = data?.filter(filters) || []

  return (
    <div>
      <Section>
        <Button LeftIcon={BiArrowBack} href="/dev">
          <T>Go back</T>
        </Button>
      </Section>
      <Section className="border rounded-lg p-2 w-full bg-neutral-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl mb-2 flex gap-2 justify-between">
            <T>Translations</T>
          </h2>
          <div className="flex gap-2">
            <input
              value={searchInput}
              placeholder={_('Search...')}
              className="rounded-full px-2 py-1 bg-neutral-3 text-sm border"
              onChange={handleSearchChange}
            />
            <Button
              onClick={() => setShowMissing(!showMissing)}
              className="inline"
              text={showMissing ? _('Show all') : _('Show missing')}
              LeftIcon={showMissing ? FaWindowMaximize : FaWindowClose}
              secondary
              size="sm"
            ></Button>
          </div>
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
                  <button
                    disabled={isValidating}
                    className="text-danger hover:text-secondary-9 disabled:opacity-20"
                    onClick={handleDeleteTranslation(translation)}
                  >
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

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx: GetServerSidePropsContext,
) => {
  const serverSideProps = await withAdminServerSideProps(ctx)
  if ('redirect' in serverSideProps || 'notFound' in serverSideProps) {
    return serverSideProps
  }

  const initialData = await getAllTranslationsForLocale(ctx.locale)

  return { props: { ...serverSideProps.props, initialData } }
}
