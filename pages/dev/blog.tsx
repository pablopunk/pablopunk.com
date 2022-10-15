import { Section } from "components/Section"
import useSWR from "swr"
import { Post } from "db/supabase/types"
import { useState } from "react"
import { useTranslation } from "hooks/useTranslation"
import { Button } from "components/neon/Button"
import classNames from "classnames"
import { useRouter } from "next/router"

const fetcher = url => fetch(url).then(r => r.json())

const Input = ({ post, _key, onInputChange }: { post: Post, _key: keyof Post, onInputChange: any }) => {
  const { _ } = useTranslation()
  const capitalizedKey = _key.charAt(0).toUpperCase() + _key.slice(1)
  return (
    <input className={classNames('p-1 bg-neutral-3', { 'font-bold': _key === 'title' })} placeholder={_(capitalizedKey)} value={post[_key] || ''} onChange={onInputChange(_key)} />
  )
}

const Edit = ({ onSubmit, submitText, initialData = null }) => {
  const [open, setOpen] = useState(false)
  const { _ } = useTranslation()
  const [post, setPost] = useState(initialData ?? {})

  const onSubmitClicked = () => {
    onSubmit(post)
    setOpen(false)
  }

  const onInputChange = (key: keyof Post) => (ev) => {
    setPost({ ...post, [key]: ev.target.value })
  }

  return (
    <article className="flex flex-col gap-2 rounded-md p-2 bg-neutral-2">
      <h2 className="cursor-pointer" onClick={() => setOpen(!open)}>{post.title || 'New post'} {open ? '-' : '+'}</h2>
      {open && (
        <>
          <Input _key="title" {...{ post, onInputChange }} />
          <Input _key="subtitle" {...{ post, onInputChange }} />
          <div>
            <Button className="m-2" onClick={onSubmitClicked} text={submitText} />
          </div>
        </>
      )}
    </article >
  )
}

export default function Blog() {
  const { locale } = useRouter()
  const { data, error, revalidate, isValidating } = useSWR('/api/posts?locale=' + locale, fetcher)
  const { _ } = useTranslation()

  const onNewPost = async (post) => {
    fetch('/api/posts', {
      method: 'POST', body: JSON.stringify({ ...post, locale }), headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => revalidate())
  }

  const onEditPost = async (post) => {
    fetch('/api/posts', {
      method: 'PUT', body: JSON.stringify(post), headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => revalidate())
  }

  return (
    <Section>
      <h1 className="text-xl mb-2">Posts</h1>
      {error && <div className="text-danger">Failed to load</div>}
      <Edit onSubmit={onNewPost} submitText={_('Submit draft')} />
      <div className={classNames("mt-2", { 'opacity-80': isValidating })}>
        {data?.map?.((post: Post) => (
          <Edit onSubmit={onEditPost} submitText={_('Submit edit')} initialData={post} />
        ))}
      </div>
    </Section >
  )
}