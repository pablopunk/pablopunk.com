import fetch from 'isomorphic-unfetch'

const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_API_TOKEN

async function fetchAPI(query, variables = {}, preview = false) {
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

export async function fetchData(
  resource: string,
  { locale = 'en', preview = false } = {}
) {
  switch (resource) {
    case 'home':
      return fetchAPI(
        `
        query HomeQuery($locale: SiteLocale) {
          home {
            profilePicture {
              url
              alt(locale: $locale)
            }
            abstract(locale: $locale, markdown: true)
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
          portfolio {
            header(locale: $locale)
            abstract(locale: $locale, markdown: true)
            exampleProjectsHeader(locale: $locale)
            githubReposIntroduction(locale: $locale, markdown: true)
            exampleProjects {
              _createdAt
              picture {
                alt(locale: $locale)
                url
              }
              name
              description(markdown: true)
              link
            }
          }
        }
        `,
        { locale },
        preview
      )
  }
}
