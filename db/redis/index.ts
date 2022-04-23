import Redis from 'ioredis'
import isPortReachable from 'is-port-reachable'

const REDIS_HOST = '127.0.0.1'
const REDIS_PORT = 6379
let redis: any
const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  isPortReachable(REDIS_PORT, { host: REDIS_HOST }).then((isReachable) => {
    if (isReachable) {
      redis = new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT,
      })
    }
  })
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
