import Redis from 'ioredis'

let redis: any
const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  redis = new Redis(process.env.REDIS_URL)
}

export async function getRedisClient() {
  return redis
}
