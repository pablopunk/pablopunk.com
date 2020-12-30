import React from 'react'
import { staticProps } from 'components/data-fetch/withCMS'
import withLayout from 'components/skeleton/withLayout'
import Link from 'next/link'
import { BsFilePost } from 'react-icons/bs'

type Post = { title: string; slug: string; date: string }

interface IProps {
  posts: Array<Post>
  title: string
  emptyMessage: string
}

const year = (post: Post) => post.date.slice(0, 4)

const Page = ({ posts, emptyMessage, title }: IProps) => {
  const years = Object.keys(
    posts.reduce((acc, curr) => ({ ...acc, [year(curr)]: true }), {})
  )

  return (
    <section className="flex flex-col items-center">
      <h1>{title}</h1>
      {posts.length === 0 && <p>{emptyMessage}</p>}
      {years.map((y) => (
        <div key={y}>
          <h2 className="mt-4 underline">{y}</h2>
          <ul>
            {posts.map((post) => (
              <li
                key={post.slug}
                className="flex items-center p-2 mt-3 border shadow-lg rounded-md border-accent2 text-accent2 bg-bg2 hover:bg-bg"
              >
                <BsFilePost />
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <span className="ml-1">{post.title}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export const getStaticProps = (ctx) => staticProps('blog', ctx)
export default withLayout(Page, 'blog')
