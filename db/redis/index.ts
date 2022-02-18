import Redis from 'ioredis'

let redis
const isDev = process.env.NODE_ENV !== 'production'

if (false) {
  redis = new Redis('redis://127.0.0.1:6379')
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
