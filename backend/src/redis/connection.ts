import Redis from 'ioredis'

const connectionConfig = {
  host: process.env.REDIS_HOST,
  port: 6379
}

const redis = new Redis(connectionConfig)

export default redis
