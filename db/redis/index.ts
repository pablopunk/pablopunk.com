import Redis from 'ioredis'

let redis: any
const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  redis = new Redis(process.env.REDIS_URL)
}

export async function getFromCache(key: string, fetcher: () => Promise<any>) {
  if (!redis || !isDev) {
    return fetcher().then((value) => setInCache(key, value) && value)
  }

  let cache = await redis.get(key)
  cache = JSON.parse(cache)

  if (cache) {
    console.log('Loading from cache:', key)
    fetcher().then((value) => setInCache(key, value)) // renew cache (SWR-ish)
    return cache
  }

  return fetcher().then((value) => setInCache(key, value) && value)
}

export async function setInCache(key: string, value: any) {
  if (redis) {
    redis.set(key, JSON.stringify(value))
  }
  return true
}
