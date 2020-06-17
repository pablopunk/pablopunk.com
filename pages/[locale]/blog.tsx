import React from 'react'
import { staticProps, staticPaths } from 'components/data/withCMS'
import withLayout from 'components/layout/withLayout'
import CenterFlexColumns from 'components/layout/CenterFlexColumns'
import { t } from 'lib/locales'
import SimpleList from 'components/layout/SimpleList'
import Link from 'next/link'

type Post = { title: string; slug: string; date: string }

interface IProps {
  posts: Array<Post>
  title: string
  emptyMessage: string
  locale: string
}

const year = (post: Post) => post.date.slice(0, 4)

const Page = ({ posts, emptyMessage, title, locale }: IProps) => {
  const years = Object.keys(
    posts.reduce((acc, curr) => ({ ...acc, [year(curr)]: true }), {})
  )

  return (
    <CenterFlexColumns>
      <section>
        <h1>{title}</h1>
        {posts.length === 0 && <p>{emptyMessage}</p>}
        {years.map((y) => (
          <div key={y}>
            <h2 style={{ textDecoration: 'underline' }}>{y}</h2>
            {posts.map((post) => (
              <SimpleList>
                <li key={post.slug}>
                  <span>📝</span>
                  <Link
                    as={`/${locale}/posts/${post.slug}`}
                    href="/[locale]/posts/[slug]"
                  >
                    <a>{post.title}</a>
                  </Link>
                </li>
              </SimpleList>
            ))}
          </div>
        ))}
      </section>
    </CenterFlexColumns>
  )
}

export const getStaticProps = (ctx) => staticProps('blog', ctx)
export const getStaticPaths = staticPaths
export default withLayout(Page, 'blog')
