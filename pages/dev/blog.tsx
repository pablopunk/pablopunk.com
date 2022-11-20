import { Section } from '@components/Section'
import useSWR from 'swr'
import { Post } from '@db/supabase/types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@hooks/useTranslation'
import { Button } from '@ui/Button'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { i18n } from '@next.config'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { RiDraftLine } from 'react-icons/ri'

const fetcher = (url) => fetch(url).then((r) => r.json())

const TextInput = ({
  post,
  _key,
  onInputChange,
}: {
  post: Post
  _key: keyof Post
  onInputChange: any
}) => {
  const { _ } = useTranslation()
  let displayKey = `${_key}`
  displayKey = displayKey.charAt(0).toUpperCase() + displayKey.slice(1)
  displayKey = displayKey.replace('_', ' ')

  return (
    <input
      className={classNames('p-1 bg-neutral-3', {
        'font-bold': _key === 'title',
      })}
      placeholder={_(displayKey)}
      value={post[_key] || ''}
      onChange={onInputChange(_key)}
    />
  )
}

// eslint-disable-next-line no-unused-vars
const noop = (post: Post) => { }

const Edit = ({
  onSubmit,
  onDelete = noop,
  submitText,
  initialData = null,
}) => {
  const [open, setOpen] = useState(false)
  const [post, setPost] = useState<Post>(initialData ?? {})
  const [date, setDate] = useState(post.date ? new Date(post.date) : new Date())
  const [checkedLocale, setCheckedLocale] = useState(i18n.defaultLocale)

  useEffect(() => {
    if (checkedLocale === i18n.defaultLocale && post.title?.length && post.title !== initialData?.title) {
      const slug = post.title.replace(/\W+/g, "-").replace(/[-]+$/, "").toLowerCase()
      setPost({ ...post, slug })
    }
  }, [post.title])

  const onSubmitClicked = () => {
    onSubmit(post)
    setOpen(false)
    if (!post.id) {
      // new post
      setPost({})
    }
  }

  const onInputChange = (key: keyof Post) => (ev) => {
    setPost({ ...post, [key]: ev.target.value })
  }

  return (
    <article className="flex flex-col gap-2 rounded-md p-2 bg-neutral-2 dark:border">
      <h2 className="flex gap-1 justify-between items-center">
        <div
          className="flex gap-2 cursor-pointer transition hover:bg-neutral-3"
          onClick={() => setOpen(!open)}
        >
          {post.image && <img src={post.image} className="w-[30px]" />}
          {post.title || 'New post'}
        </div>
        <div>
          {post.id && (
            /* Change status to live or draft */
            <Button
              onClick={() => {
                const status = post.status === 'live' ? 'draft' : 'live'
                const updatedPost = { ...post, status }
                onSubmit(updatedPost)
                setPost(updatedPost)
              }}
              LeftIcon={
                post.status === 'live' ? RiDraftLine : AiOutlineCloudUpload
              }
              title={post.status === 'live' ? 'Send to drafts' : 'Publish'}
              secondary={post.status === 'live'}
            />
          )}
        </div>
      </h2>
      {open && (
        <>
          <TextInput _key="title" {...{ post, onInputChange }} />
          <TextInput _key="subtitle" {...{ post, onInputChange }} />
          <TextInput _key="slug" {...{ post, onInputChange }} />
          <input
            type="date"
            value={date.toISOString().split('T')[0]}
            className="bg-neutral-3"
            onChange={(ev) => {
              try {
                const newDate = new Date(ev.target.value)
                newDate.toISOString().split('T')[0] // will throw if date is not valid
                setDate(new Date(ev.target.value))
                setPost({ ...post, date: ev.target.value })
              } catch (e) { }
            }}
          />
          <TextInput _key="image" {...{ post, onInputChange }} />
          {post?.image?.length && <img src={post.image} alt="Main image" />}
          <div className="flex gap-2">
            {i18n.locales.map((locale) => (
              <div key={locale} className="flex items-center">
                <input
                  type="radio"
                  name={post.title + 'locale'}
                  id={locale}
                  value={locale}
                  key={locale}
                  onChange={(ev) => setCheckedLocale(ev.target.value)}
                  checked={checkedLocale === locale}
                />
                <label htmlFor={locale} className="font-bold ml-1">
                  {locale}
                </label>
              </div>
            ))}
          </div>
          {checkedLocale !== i18n.defaultLocale && (
            <TextInput _key="translated_slug" {...{ post, onInputChange }} />
          )}
          <textarea
            onChange={onInputChange('body')}
            value={post.body}
            className="bg-neutral-3 p-1"
            placeholder="Markdown body"
            rows={10}
          />
          <div className="flex gap-2 m-2">
            <Button onClick={onSubmitClicked} text={submitText} />
            {post.id != null && (
              <Button
                onClick={() => onDelete(post)}
                text="Delete post"
                secondary
              />
            )}
          </div>
        </>
      )}
    </article>
  )
}

export default function Blog() {
  const { locale } = useRouter()
  const { data, error, revalidate, isValidating } = useSWR(
    '/api/posts?locale=' + locale,
    fetcher,
  )
  const { _ } = useTranslation()

  const onNewPost = async (post: Post) => {
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ ...post, locale }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => revalidate())
  }

  const onEditPost = async (post: Post) => {
    fetch('/api/posts', {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => revalidate())
  }

  const onDeletePost = async (post: Post) => {
    fetch('/api/posts', {
      method: 'DELETE',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => revalidate())
  }

  return (
    <Section>
      <h1 className="text-xl mb-2">Posts</h1>
      {error && <div className="text-danger">Failed to load</div>}
      <Edit onSubmit={onNewPost} submitText={_('Submit draft')} />
      <div
        className={classNames('mt-2 flex flex-col gap-1', {
          'opacity-80': isValidating,
        })}
      >
        {data?.map?.((post: Post) => (
          <React.Fragment key={post.id}>
            <Edit
              onSubmit={onEditPost}
              onDelete={onDeletePost as any}
              submitText={_('Submit edit')}
              initialData={post}
            />
          </React.Fragment>
        ))}
      </div>
    </Section>
  )
}
