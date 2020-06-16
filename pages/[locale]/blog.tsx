import React from 'react'
import { staticProps, staticPaths } from 'components/data/withCMS'
import withLayout from 'components/layout/withLayout'
import CenterFlexColumns from 'components/layout/CenterFlexColumns'
import { t } from 'lib/locales'
import SimpleList from 'components/layout/SimpleList'
import Link from 'next/link'

interface IProps {
  allPosts: Array<{ title: string; slug: string }>
  locale: string
}

const Page = ({ allPosts, locale }: IProps) => {
  return (
    <CenterFlexColumns>
      <section>
        <h1>{t('All Posts', locale)}</h1>
        <SimpleList>
          {allPosts.map((post) => (
            <li key={post.slug}>
              <Link
                as={`/${locale}/posts/${post.slug}`}
                href="/[locale]/posts/[slug]"
              >
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </SimpleList>
      </section>
    </CenterFlexColumns>
  )
}

export const getStaticProps = (ctx) => staticProps('blog', ctx)
export const getStaticPaths = staticPaths
export default withLayout(Page, 'blog')
