import Redis from 'ioredis'

const connectionConfig = {
  host: "redis://default:monospaced@redis.redis.svc.cluster.local:6379/0",
  port: 6379,
  maxRetriesPerRequest: null,
}

const redis = new Redis(connectionConfig)

export default redis
