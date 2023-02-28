import { getRedisClient } from 'lib/redis'
const isDev = process.env.NODE_ENV !== 'production'

export async function getFromCache(key: string, fetcher: () => Promise<any>) {
  const redis = await getRedisClient()

  if (!redis || !isDev) {
    return fetcher().then((value) => setInCache(key, value) && value)
  }

  let cache = await redis.get(key)

  try {
    cache = JSON.parse(cache)
  } catch (err) {
    cache = null
  }

  if (cache) {
    console.log('Loading from cache:', key)
    fetcher().then((value) => setInCache(key, value)) // renew cache (SWR-ish)
    return cache
  }

  return fetcher().then((value) => setInCache(key, value) && value)
}

export async function setInCache(key: string, value: any) {
  const redis = await getRedisClient()

  if (redis) {
    redis.set(key, JSON.stringify(value))
  }
  return true
}
