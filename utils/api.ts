
import fetch from 'isomorphic-fetch'
const apiUrl = 'https://api.pablo.life'

export async function get (resource) {
  const res = await fetch(`${apiUrl}/${resource}`)

  return res.json()
}
