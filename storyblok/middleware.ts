import { Storyblok } from './client'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { PageProps } from 'types/page'

async function getPageData(
  slug: string,
  context: GetStaticPropsContext,
  version: string,
) {
  let data

  try {
    data = (
      await Storyblok.get(`cdn/stories/${slug}`, {
        version,
        cv: Date.now(),
        language: context.locale,
      })
    ).data
  } catch (err) {
    data = err.response?.status || 500
  }

  return data
}

export const getPageStaticProps = async (
  page: string,
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<PageProps>> => {
  const version =
    process.env.NODE_VERSION !== 'production' || context.preview
      ? 'draft'
      : 'published'

  const pageData = await getPageData(page, context, version)
  const navData = await getPageData('nav', context, version)

  if (pageData === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page: pageData.story,
      nav: navData.story,
      preview: version === 'draft',
    },
    revalidate: 10,
  }
}
