import { Queue } from 'bullmq'
import redis from '../redis/connection'

export const QUEUE_NAME = 'metrics'

const metricsQueue = new Queue(QUEUE_NAME, {
  connection: redis
})

export default metricsQueue
