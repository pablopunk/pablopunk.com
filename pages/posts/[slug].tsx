import { Article } from '~/components/Article'
import { Section } from '~/components/Section'
import { getPost } from '~/db/supabase/tables/posts'
import { Post } from '~/db/supabase/types'
import { pageStaticProps } from '~/middleware'
import { GetStaticProps } from 'next'
import { PageProps } from '~/types/page'

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
  const { data: post, error } = await getPost({
    slug: ctx.params.slug as string,
  }).catch((err: Error) => {
    console.error(err)
    return {}
  })

  if (error) console.error(error)

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

export const getStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})
