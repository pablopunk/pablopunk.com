import React from 'react'
import { staticProps } from 'components/data-fetch/withCMS'
import withLayout from 'components/skeleton/withLayout'
import CenterFlexColumns from 'components/containers/CenterFlexColumns'
import SimpleList from 'components/containers/SimpleList'
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

const Page = ({ posts, emptyMessage, title }: IProps) => {
  const { locale } = useRouter()
  const years = Object.keys(
    posts.reduce((acc, curr) => ({ ...acc, [year(curr)]: true }), {})
  )

  console.log(posts)

  return (
    <CenterFlexColumns>
      <section>
        <h1>{title}</h1>
        {posts.length === 0 && <p>{emptyMessage}</p>}
        {years.map((y) => (
          <div key={y}>
            <h2 style={{ textDecoration: 'underline' }}>{y}</h2>
            <SimpleList>
              {posts.map((post) => (
                <li key={post.slug}>
                  <BsFilePost />
                  <Link href={`/posts/${post.slug}`}>
                    <a>
                      <span>{post.title}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </SimpleList>
          </div>
        ))}
      </section>
    </CenterFlexColumns>
  )
}

export const getStaticProps = (ctx) => staticProps('blog', ctx)
export default withLayout(Page, 'blog')
