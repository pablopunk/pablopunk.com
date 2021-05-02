import { Storyblok } from './client'
import { GetStaticPropsContext } from 'next'

async function getPageData(
  slug: string,
  context: GetStaticPropsContext,
  version: string
) {
  let { data } = await Storyblok.get(`cdn/stories/${slug}`, {
    version,
    cv: Date.now(),
    language: context.locale,
  })

  return data
}

export const getPageStaticProps = async (
  page: string,
  context: GetStaticPropsContext
) => {
  const version =
    process.env.NODE_VERSION !== 'production' || context.preview
      ? 'draft'
      : 'published'

  const pageData = await getPageData(page, context, version)
  const navData = await getPageData('nav', context, version)

  return {
    props: {
      page: pageData.story,
      nav: navData.story,
      preview: version === 'draft',
    },
    revalidate: 10,
  }
}
