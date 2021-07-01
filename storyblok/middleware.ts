import { Storyblok } from './client'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { PageProps } from 'types/page'
import { locales } from 'locales'
import { readdirSync } from 'fs'
import { PostType } from './types'

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
        // resolve_relations: 'articles.items',
      })
    ).data
  } catch (err) {
    data = err.response?.status || 500
  }

  return data
}

export async function getAllPosts(context: GetStaticPropsContext) {
  const version =
    process.env.NODE_VERSION !== 'production' || context.preview
      ? 'draft'
      : 'published'

  let data

  try {
    data = (
      await Storyblok.get(`cdn/stories`, {
        version,
        cv: Date.now(),
        language: context.locale,
        starts_with: 'posts',
        sort_by: 'created_at:desc',
      })
    ).data.stories
  } catch (err) {
    data = err.response?.status || 500
  }

  return data
}

export const getPageStaticProps = async (
  context: GetStaticPropsContext,
  _slug?: string,
): Promise<GetStaticPropsResult<PageProps>> => {
  const slug = _slug || (context.params.slug as string[])?.join('/') || 'home'
  const version =
    process.env.NODE_VERSION !== 'production' || context.preview
      ? 'draft'
      : 'published'

  const pageData = await getPageData(slug, context, version)
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

export const getPageStaticPaths = async (context: GetStaticPropsContext) => {
  const version =
    process.env.NODE_VERSION !== 'production' || context.preview
      ? 'draft'
      : 'published'

  const { data } = await Storyblok.get(`cdn/stories`, {
    version,
    cv: Date.now(),
    language: context.locale,
  })

  const exclude = readdirSync(process.cwd() + '/pages').map((name) =>
    name.replace(/\.tsx$/, ''),
  )
  const paths = []

  locales.forEach((locale) => {
    data.stories?.forEach((story: PostType) => {
      if (!exclude.includes(story.full_slug)) {
        paths.push({
          locale,
          params:
            story.full_slug === 'home'
              ? { slug: [] }
              : { slug: story.full_slug.split('/') },
        })

        const translatedSlug = story.translated_slugs.find(
          (slug) => slug.lang === locale,
        )

        if (translatedSlug) {
          paths.push({
            locale,
            params: {
              slug: translatedSlug.path.split('/'),
            },
          })
        }
      }
    })
  })

  return {
    paths,
    fallback: false,
  }
}
