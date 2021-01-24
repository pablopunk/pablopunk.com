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
  const years: Array<string> = Object.keys(
    posts.reduce((acc, curr) => ({ ...acc, [year(curr)]: true }), {})
  ).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <section className="flex flex-col items-center fill-height">
      <h1>{title}</h1>
      {posts.length === 0 && <p>{emptyMessage}</p>}
      {years.map((y) => (
        <div key={y} className="w-full max-w-lg">
          <h2 className="mt-4 underline">{y}</h2>
          <ul>
            {posts
              .filter(({ date }) => date.startsWith(y))
              .map((post) => (
                <li
                  key={post.slug}
                  className="flex items-center p-2 mt-3 border shadow-lg rounded-md border-accent2 text-accent2 bg-bg2 hover:bg-bg"
                >
                  <span className="mr-2">
                    <BsFilePost />
                  </span>
                  <Link href={`/posts/${post.slug}`}>
                    <a>
                      <span>{post.title}</span>
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
