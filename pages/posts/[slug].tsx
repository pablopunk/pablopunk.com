import { Article } from '~/components/Article'
import { Section } from '~/components/Section'
import { getPost, getAllPostsForLocale } from 'models/supabase/tables/posts'
import { Post } from '~/models/post'
import { pageStaticProps } from '~/middleware'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PageProps } from '~/types/page'
import { i18n } from '~/next.config'

interface Props extends PageProps {
  post: Post
}

export default function Slug({ post }: Props) {
  return (
    <Section className="mt-3">
      <Article post={post} />
    </Section>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pageProps = await pageStaticProps(ctx)
  const post = await getPost({
    slug: ctx.params.slug as string,
  }).catch((err: Error) => {
    console.error(err)
    return {}
  })

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      ...pageProps.props,
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const { locales } = i18n

  // TODO: replace when locales are supported in posts
  const posts = await getAllPostsForLocale(i18n.defaultLocale, false)
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
