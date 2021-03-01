import React from 'react'
import { staticProps } from 'components/data-fetch/withCMS'
import withLayout from 'components/skeleton/withLayout'
import Link from 'next/link'
import { BsFilePost } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { ExtendedStory } from '@prezly/sdk'

interface IProps {
  posts: Array<ExtendedStory>
  title: string
  emptyMessage: string
}

const year = (post: ExtendedStory) => post.published_at.slice(0, 4)

const Page = ({ posts, emptyMessage, title }: IProps) => {
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
              .filter(({ published_at }) => published_at.startsWith(y))
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
                        {new Date(post.published_at).toLocaleDateString(locale)}
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
export default withLayout(Page, 'blog')
