import React from 'react'
import { staticProps } from 'components/data-fetch/withCMS'
import Link from 'next/link'
import { BsFilePost } from 'react-icons/bs'
import { useRouter } from 'next/router'

type Post = { title: string; slug: string; date: string }

interface IProps {
  posts: Array<Post>
  title: string
  emptyMessage: string
}

const year = (post: Post) => post.date.slice(0, 4)

const Blog = ({ posts, emptyMessage, title }: IProps) => {
  const years: Array<string> = Object.keys(
    posts.reduce((acc, curr) => ({ ...acc, [year(curr)]: true }), {})
  ).sort((a, b) => parseInt(b) - parseInt(a))

  const { locale } = useRouter()

  return (
    <section className="flex flex-col items-center fill-height">
      <h1>{title}</h1>
      {posts.length === 0 && <p>{emptyMessage}</p>}
      {years.map((y) => (
        <div key={y} className="w-full max-w-lg">
          <h2 className="mt-4">{y}</h2>
          <ul>
            {posts
              .filter(({ date }) => date.startsWith(y))
              .map((post) => (
                <li key={post.slug}>
                  <Link href={`/posts/${post.slug}`}>
                    <a className="flex flex-col items-start p-2 mt-3 shadow-lg rounded text-accent2 bg-bg2 hover:bg-bg">
                      <div className="flex items-start">
                        <span className="mr-2 pt-1">
                          <BsFilePost />
                        </span>
                        <span>{post.title}</span>
                      </div>
                      <div className="text-fg text-sm text-gray">
                        {new Date(post.date).toLocaleDateString(locale)}
                      </div>
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

export default Blog
