import { PostType } from 'cms/storyblok/types'
import { SITE_URL } from 'config'
import * as R from 'ramda'

const CLIENT_API = SITE_URL + '/visits/'
const SERVER_API = 'https://pablopunk.goatcounter.com/counter/'

const fetchFromAPI = (path: string) => {
  const API_URL = typeof window !== 'undefined' ? CLIENT_API : SERVER_API

  return fetch(API_URL + encodeURIComponent(path) + '.json')
    .then((res) => res.json())
    .then((result) => result?.count?.replace('.', '') || 0)
    .then((result) => parseInt(result))
    .catch((err) => {
      console.log('Error fetching visits', err)
      return null
    })
}

export const fetchNumberOfVisits = async (post: PostType) => {
  const visitsFromAllLocales = await Promise.all(
    post.translated_slugs
      .map((p) => p.lang + '/' + p.path)
      .concat(post.default_full_slug) // default locale
      .map(prependSlash)
      .map(fetchFromAPI),
  )

  return R.sum(visitsFromAllLocales)
}

export const fetchMultipleNumberOfVisits = (posts: PostType[]) =>
  Promise.all(posts.map(fetchNumberOfVisits))

const prependSlash = R.concat('/') as () => string
