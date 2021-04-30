import { Storyblok } from './client'
import { GetStaticPropsContext } from 'next'

export const getPageStaticProps = async (
  page: string,
  context: GetStaticPropsContext
) => {
  const version =
    process.env.NODE_VERSION !== 'production' || context.preview
      ? 'draft'
      : 'published'

  let { data } = await Storyblok.get(`cdn/stories/${page}`, {
    version,
    cv: Date.now(),
    language: context.locale,
  })

  return {
    props: {
      page: data.story,
      preview: version === 'draft',
    },
    revalidate: 10,
  }
}
