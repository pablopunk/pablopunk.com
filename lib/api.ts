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

let _cache = {}

export async function fetchData(
  resource: string,
  { locale = 'en', preview = false, slug = null } = {}
) {
  if (process.env.NODE_ENV !== 'production' && _cache?.[resource] != null) {
    return _cache[resource]
  }

  let results

  switch (resource) {
    case 'home':
      results = fetchAPI(
        `
        home(locale: $locale) {
          abstract(markdown: true)
          cards {
            img {
              url(imgixParams: {fm: jpg, q:60})
              title
              alt
              blurUpThumb(imgixParams: {fm: jpg, q:60})
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
        `,
        { locale },
        preview
      )
      break

    case 'portfolio':
      results = fetchAPI(
        `
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
          }
        }
        `,
        { locale },
        preview
      )
      break

    case 'about':
      results = fetchAPI(
        `
        about(locale: $locale) {
          content(markdown: true)
          ${commonPageQueries}
        }
      `,
        { locale },
        preview
      )
      break

    case 'blog':
      results = fetchAPI(
        `
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
      `,
        { locale },
        preview
      )
      break

    case 'stack':
      results = fetchAPI(
        `
        stack(locale: $locale) {
          content(markdown: true)
          ${commonPageQueries}
        }
        `,
        { locale },
        preview
      )
      break
  }

  _cache[resource] = results

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
