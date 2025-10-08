import { Worker } from 'bullmq'
import { QUEUE_NAME } from '../queue/metrics-queue'
import prisma from '../database/index'
import redis from '../redis/connection'

const trackMetricsWorker = new Worker(QUEUE_NAME, async (job) => {
  const { id, events } = job.data
  try {
    // Process each event individually to handle optional error fields
    for (const event of events) {
      await prisma.metrics.create({
        data: {
          name: event.name,
          value: event.value,
          timestamp: new Date(event.timestamp),
          delta: event.delta,
          label: event.label,
          route: event.route,
          device: event.device,
          connection: event.connection,
          userAgent: event.userAgent,
          // Error-specific fields - only include if they exist
          ...(event.errorMessage && { errorMessage: event.errorMessage }),
          ...(event.errorStack && { errorStack: event.errorStack }),
          ...(event.errorFile && { errorFile: event.errorFile }),
          ...(event.errorLine && { errorLine: event.errorLine }),
          ...(event.errorColumn && { errorColumn: event.errorColumn }),
        }
      })
    }
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
