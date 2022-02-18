import { Storyblok } from './storyblok/client'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { PageProps } from 'types/page'
import { locales } from 'locales'
import { readdirSync } from 'fs'
import { PostType } from './storyblok/types'
import { getFromCache } from 'db/redis'

const isDev = process.env.NODE_ENV !== 'production'

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
        resolve_relations: 'featured_posts.posts',
      })
    ).data
  } catch (err) {
    data = err.response?.status || 500
  }

  return data
}

const POSTS_PAGE_SIZE = 6

export async function getPosts(
  page: number,
  preview: boolean = false,
  locale: string,
): Promise<{
  posts: PostType[]
  total: number
}> {
  const version =
    process.env.NODE_VERSION !== 'production' || preview ? 'draft' : 'published'

  const { posts, total } = await getFromCache(
    `posts-${locale}-page${page}`,
    async () => {
      try {
        const results = await Storyblok.get(`cdn/stories`, {
          version,
          cv: Date.now(),
          language: locale,
          starts_with: 'posts',
          sort_by: 'created_at:desc',
          per_page: POSTS_PAGE_SIZE,
          page,
        })
        return { posts: results.data.stories, total: results.total }
      } catch (err) {
        console.error(err.response?.data?.error)
        return { posts: [], total: 0 }
      }
    },
  )

  return { posts, total }
}

export async function getAllPosts(
  preview: boolean = false,
  locale: string,
): Promise<{
  posts: PostType[]
  total: number
}> {
  const version =
    process.env.NODE_VERSION !== 'production' || preview ? 'draft' : 'published'

  const { posts, total } = await getFromCache(`posts-${locale}`, async () => {
    try {
      const results = await Storyblok.get(`cdn/stories`, {
        version,
        cv: Date.now(),
        language: locale,
        starts_with: 'posts',
        sort_by: 'created_at:desc',
      })
      return { posts: results.data.stories, total: results.total }
    } catch (err) {
      console.error(err.response?.data?.error)
      return { posts: [], total: 0 }
    }
  })

  return { posts, total }
}

export const getPageStaticProps = async (
  context: GetStaticPropsContext,
  _slug?: string,
): Promise<GetStaticPropsResult<PageProps>> => {
  const slug = _slug || (context.params.slug as string[])?.join('/') || 'home'
  const version = isDev || context.preview ? 'draft' : 'published'
  const { locale } = context

  const pageData = await getFromCache(`${slug}-${locale}`, () =>
    getPageData(slug, context, version),
  )
  const navData = await getFromCache(`nav-${locale}`, () =>
    getPageData('nav', context, version),
  )
  const footerData = await getFromCache(`footer-${locale}`, () =>
    getPageData('footer', context, version),
  )

  if (pageData === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page: pageData.story,
      nav: navData.story || null,
      footer: footerData.story || null,
      preview: version === 'draft',
    },
    revalidate: 60,
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

  const paths = await getFromCache('staticPaths', async () => {
    const staticPaths = []
    locales.forEach((locale) => {
      data.stories?.forEach((story: PostType) => {
        if (!exclude.includes(story.full_slug)) {
          staticPaths.push({
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
            staticPaths.push({
              locale,
              params: {
                slug: translatedSlug.path.split('/'),
              },
            })
          }
        }
      })
    })
    return staticPaths
  })

  return {
    paths,
    fallback: true,
  }
}
