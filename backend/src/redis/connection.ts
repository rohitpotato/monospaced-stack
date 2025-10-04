import Redis from 'ioredis'

const connectionConfig = {
  host: "redis-master.redis.svc.cluster.local",
  port: 6379,
  password: "monospaced",
  maxRetriesPerRequest: null,
}

const redis = new Redis(connectionConfig)

export default redis
