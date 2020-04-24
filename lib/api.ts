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
      query: `
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
    bar {
      ... on LeftRecord {
        title
      }
      ... on RightRecord {
        title
      }
    }
    main {
      id
      link
      text
    }
  }
  footer(locale: $locale) {
    copyright(markdown: true)
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

export async function fetchData(
  resource: string,
  { locale = 'en', preview = false } = {}
) {
  switch (resource) {
    case 'home':
      return fetchAPI(
        `
        home(locale: $locale) {
          profilePicture {
            url
            alt
          }
          profilePictureHover {
            url
            alt
          }
          abstract(markdown: true)
          ${commonPageQueries}
        }
        `,
        { locale },
        preview
      )

    case 'portfolio':
      return fetchAPI(
        `
        portfolio(locale: $locale) {
          introHeader
          abstract(markdown: true)
          exampleProjectsHeader
          githubReposIntroduction(markdown: true)
          ${commonPageQueries}
        }
        allExampleProjects(orderBy: _createdAt_ASC ) {
          link
          name
          description(markdown: true)
          picture {
            alt
            url
          }
        }
        `,
        { locale },
        preview
      )

    case 'about':
      return fetchAPI(
        `
        about(locale: $locale) {
          content {
            column1(markdown: true)
            column2(markdown: true)
          }
          ${commonPageQueries}
        }
      `,
        { locale },
        preview
      )

    case 'contact':
      return fetchAPI(
        `
        contact(locale: $locale) {
          content(markdown: true)
          ${commonPageQueries}
        }
      `,
        { locale },
        preview
      )
  }
}