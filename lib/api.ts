import fetch from 'isomorphic-unfetch'

const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_API_TOKEN

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
    abstract(markdown: true)
    cards {
      img {
        url(imgixParams: {fm: jpg, q:60})
        title
        alt
        blurUpThumb(imgixParams: {fm: jpg, q:60})
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
      url(imgixParams: {fm: jpg, q:60})
      alt
      title
      blurUpThumb(imgixParams: {fm: jpg, q:60})
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

let _cache = {}

export async function fetchData(
  resource: string,
  { locale = 'en', preview = false, slug = null } = {}
) {
  if (
    process.env.NODE_ENV !== 'production' &&
    _cache[locale]?.[resource] != null
  ) {
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

  const results = fetchAPI(query, { locale }, preview)

  if (process.env.NODE_ENV !== 'production') {
    if (_cache[locale] == null) {
      _cache[locale] = {}
    }
    _cache[locale][resource] = results
  }

  return results
}

export async function getAllPostsWithSlug(locale, preview = false) {
  const data = await fetchAPI(
    `
    query allPostsWithSlug($locale: SiteLocale) {
      allPosts(locale: $locale) {
        slug
      }
    }
`,
    { locale },
    preview
  )

  return data.allPosts
}

export async function getPostBySlug(slug, locale, preview = false) {
  const data = await fetchAPI(
    `
    query getPostBySlug($locale: SiteLocale, $slug: String) {
      post(locale: $locale, filter: {slug: {eq: $slug}}) {
        slug
        title
        date
        image {
          url(imgixParams: {fm: jpg, q:60})
          alt
          title
          blurUpThumb(imgixParams: {fm: jpg, q:60})
          width
          height
        }
        body(markdown: true)
        ${commonPageQueries}
      }
      ${globalQueries}
    }
  `,
    { locale, slug },
    preview
  )

  return data
}
