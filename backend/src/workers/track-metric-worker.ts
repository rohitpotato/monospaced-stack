import { Worker } from 'bullmq'
import { QUEUE_NAME } from '../queue/metrics-queue'
import prisma from '../database/index'
import { IMetricsEvent } from '../types/metrics-batch'
import redis from '../redis/connection'

const trackMetricsWorker = new Worker(QUEUE_NAME, async (job) => {
  const { id, events } = job.data
  try {
    await prisma.metrics.createMany({
      data: events.map((event: IMetricsEvent) => ({
        name: event.name,
        value: event.value,
        timestamp: new Date(event.timestamp),
        delta: event.delta,
        label: event.label,
        route: event.route,
        device: event.device,
        connection: event.connection,
        userAgent: event.userAgent
      }))
    })
    console.log(
      `Successfully processed ${events.length} metrics for batch ${id}`
    )
  } catch (error) {
    console.error(`Failed to process metrics for batch ${id}:`, error)
    throw error
  }
}, {
  connection: redis
})

export default trackMetricsWorker
