import Redis from 'ioredis'

let redis

if (process.env.NODE_ENV !== 'production') {
  redis = new Redis('redis://127.0.0.1:6379')
}

export async function getFromCache(key: string) {
  if (!redis) {
    return null
  }

  let cache = await redis.get(key)
  cache = JSON.parse(cache)

  if (cache) {
    console.log('Loading from cache:', key)
    return cache
  }

  return null
}

export async function setInCache(key: string, value: any) {
  if (redis) {
    return redis.set(key, JSON.stringify(value))
  }
}
