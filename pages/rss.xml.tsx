import { snarkdownEnhanced } from 'components/Markdown'
import { SITE_DESC, SITE_NAME, SITE_URL } from 'config'
import { Feed } from 'feed'
import { GetServerSidePropsContext } from 'next'
import { getAllPosts } from 'storyblok/middleware'
import { PostType } from 'storyblok/types'
import { getTranslatedSlug } from 'storyblok/utils'

const AUTHOR = {
  name: 'Pablo Varela',
  email: 'pablo@pablopunk.com',
  link: 'https://pablopunk.com',
}

export default function RSS() {
  return null
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.res) {
    return {
      notFound: true,
    }
  }

  const { res } = context
  const { posts } = await getAllPosts(context.preview, context.locale)
  const locale = context.locale

  const feed = new Feed({
    title: SITE_NAME,
    description: SITE_DESC,
    id: SITE_URL,
    link: SITE_URL,
    language: locale,
    image: 'https://a.storyblok.com/f/113260/4108x3448/80929e8406/p1080612.jpg',
    favicon: SITE_URL + '/favicon/favicon.ico',
    copyright: '2021, Pablo Varela',
    generator: 'awesome',
    feedLinks: { xml: SITE_URL + '/rss.xml' },
    author: AUTHOR,
  })

  posts.forEach((post: PostType) => {
    const description = snarkdownEnhanced(post.content.content)
    const translatedSlug = getTranslatedSlug(post, locale)
    const url = `${SITE_URL}/${translatedSlug.path}`

    feed.addItem({
      title: translatedSlug.name,
      id: url,
      link: url,
      description: description,
      content: post.content.content,
      author: [AUTHOR],
      date: new Date(post.created_at),
      image: post.content.image.filename,
    })
  })

  feed.addCategory('Dev')
  feed.addCategory('Open-Source')
  feed.addCategory('Programming')
  feed.addCategory('Apple')

  res.setHeader('Content-Type', 'text/xml')
  res.write(feed.rss2())
  res.end()

  return { props: {} }
}
