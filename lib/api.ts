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
      query,
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

const commonQueries = `
  nav {
    main {
      id
      link
      text
    }
    bar {
      ... on LeftRecord {
        title
      }
      ... on RightRecord {
        title
      }
    }
  }
  header {
    title
    subtitle
  }
  footer {
    copyright(markdown: true)
  }
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
        query HomeQuery($locale: SiteLocale) {
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
            ${commonQueries}
          }
        }
        `,
        { locale },
        preview
      )

    case 'portfolio':
      return fetchAPI(
        `
        query PortfolioQuery($locale: SiteLocale) {
          portfolio(locale: $locale) {
            introHeader
            abstract(markdown: true)
            exampleProjectsHeader
            githubReposIntroduction(markdown: true)
            ${commonQueries}
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
        }
        `,
        { locale },
        preview
      )

    case 'about':
      return fetchAPI(
        `
        query AboutQuery($locale: SiteLocale) {
          about(locale: $locale) {
            content {
              column1(markdown: true)
              column2(markdown: true)
            }
            ${commonQueries}
          }
        }
      `,
        { locale },
        preview
      )

    case 'contact':
      return fetchAPI(
        `
        query ContactQuery($locale: SiteLocale) {
          contact(locale: $locale) {
            content(markdown: true)
            ${commonQueries}
          }
        }
      `,
        { locale },
        preview
      )
  }
}
