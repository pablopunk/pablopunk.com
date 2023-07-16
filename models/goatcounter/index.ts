import { SITE_URL } from 'config'

const CLIENT_API = SITE_URL + '/visits/'
const SERVER_API = 'https://pablopunk.goatcounter.com/counter/'

const fetchFromAPI = async (path: string) => {
  const API_URL = typeof window !== 'undefined' ? CLIENT_API : SERVER_API

  return fetch(API_URL + encodeURIComponent(path) + '.json')
    .then((res) => res.json())
    .then((result) => result?.count?.replace('.', '') || 0)
    .then((result) => parseInt(result))
    .catch((err) => {
      console.error('Error fetching visits', err)
      return null
    })
}

export const fetchNumberOfVisits = async (path: string) => {
  return fetchFromAPI(path)
}

export const countVisit = async (path: string) => {
  if (typeof window?.['goatcounter'] !== 'undefined') {
    window['goatcounter'].count({ path })
  }
}
