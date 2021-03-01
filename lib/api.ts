import fetch from 'isomorphic-unfetch'
import Prezly from '@prezly/sdk'

const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_API_TOKEN

const prezly = new Prezly({
  accessToken: process.env.PREZLY_TOKEN,
})

async function fetchAPI(query, variables = {}, preview) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query: query.replace('\n', '').trim().startsWith('query')
        ? query
        : `
        query MyQuery($locale: SiteLocale) {
          ${query}
          ${globalQueries}
        }
      `,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('API fetch failed')
  }

  return json.data
}

const globalQueries = `
  nav(locale: $locale) {
    main {
      id
      link
      text
    }
  }
  header(locale: $locale) {
    title
    subtitle
  }
`

const commonPageQueries = `
  metaTags {
    title
    description
  }
`

const homeQuery = `
  home(locale: $locale) {
    cards {
      img {
        url(imgixParams: {fm: jpg, q:70})
        title
        alt
        blurUpThumb(imgixParams: {fm: jpg, q:70})
        width
        height
      }
      link
      title
      description
      tags {
        name
        color {
          hex
        }
      }
    }
    ${commonPageQueries}
  }
`

const portfolioQuery = `
  portfolio(locale: $locale) {
    introHeader
    abstract(markdown: true)
    exampleProjectsHeader
    githubReposIntroduction(markdown: true)
    ${commonPageQueries}
  }
  allExampleProjects(orderBy: _createdAt_ASC, locale: $locale) {
    link
    name
    description(markdown: true)
    picture {
      url(imgixParams: {fm: jpg, q:70})
      alt
      title
      blurUpThumb(imgixParams: {fm: jpg, q:70})
      width
      height
    }
  }
`

const aboutQuery = `
  about(locale: $locale) {
    image {
      url(imgixParams: {fm: jpg, q:70, w:700})
      blurUpThumb(imgixParams: {fm: jpg, q:40, w:700})
      alt
    }
    content(markdown: true)
    ${commonPageQueries}
  }
`

const blogQuery = `
  blog(locale: $locale) {
    title
    emptyMessage
    posts {
      title
      slug
      date
    }
    ${commonPageQueries}
  }
`

const stackQuery = `
  stack(locale: $locale) {
    content(markdown: true)
    ${commonPageQueries}
  }
`

const CACHE_ENABLED = process.env.NODE_ENV !== 'production'
let _cache = {}

export async function fetchData(
  resource: string,
  { locale = 'en', preview = false, slug = null } = {}
) {
  if (CACHE_ENABLED && _cache[locale]?.[resource] != null) {
    return _cache[locale][resource]
  }

  let query

  switch (resource) {
    case 'home':
      query = homeQuery
      break

    case 'portfolio':
      query = portfolioQuery
      break

    case 'about':
      query = aboutQuery
      break

    case 'blog':
      query = blogQuery
      break

    case 'stack':
      query = stackQuery
      break

    default:
      throw new Error(`Unknown resource: ${resource}`)
  }

  const results = await fetchAPI(query, { locale }, preview)

  if (resource === 'blog') {
    results.blog.posts = await getPrezlyStories(locale)
  }

  if (CACHE_ENABLED) {
    if (_cache[locale] == null) {
      _cache[locale] = {}
    }
    _cache[locale][resource] = results
  }

  return results
}

export async function getAllPostsWithSlug(locale, preview = false) {
  return getPrezlyStories(locale)
}

async function getPrezlyStories(locale) {
  const search = await prezly.stories.search({
    jsonQuery: JSON.stringify({
      $and: [
        { lifecycle_status: { $in: ['published'] } },
        { visibility: { $in: ['public'] } },
        { 'newsroom.id': { $in: [process.env.PREZLY_NEWSROOM] } },
      ],
    }),
  })
  return search.stories.filter((s) => s.culture.language_code === locale)
}

export async function getPostBySlug(slug, locale, preview = false) {
  const search = await prezly.stories.search({
    jsonQuery: JSON.stringify({
      $and: [
        { lifecycle_status: { $in: ['published'] } },
        { visibility: { $in: ['public'] } },
        { 'newsroom.id': { $in: [process.env.PREZLY_NEWSROOM] } },
        { slug: { $eq: slug } },
      ],
    }),
  })
  const story = await prezly.stories.get(search.stories[0].id)

  return story
}
