import { FastifyInstance, FastifyRequest } from 'fastify'
import metricsQueue, { QUEUE_NAME } from '../queue/metrics-queue'
import { IMetricsEvent } from '../types/metrics-batch'

export default function metricsRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/track',
    handler: async (
      req: FastifyRequest<{ Body: { id: string; events: IMetricsEvent[] } }>,
      res
    ) => {
      const { id, events } = req.body
      try {
        await metricsQueue.add(QUEUE_NAME, {
          id,
          events
        })
        res.status(200).send({ message: 'Events added to queue' })
      } catch (error) {
        res.status(500).send({
          message: 'Failed to add events to queue',
          batchId: id,
          error: error
        })
      }
    }
  })

  // //  Route for prometheus to scrape metrics from postgres db
  // fastify.route({
  //   method: 'GET',
  //   url: '/metrics',
  //   handler: async (req: FastifyRequest, res: FastifyReply) => {
  //     const metrics = await prisma.metrics.findMany({
  //       select: {
  //         name: true,
  //         value: true,
  //         timestamp: true,
  //         delta: true,
  //         label: true,
  //         route: true
  //       },
  //       where: {
  //         timestamp: {
            
  //         }
  //       }
  //     })

  //     const metricsData = metrics.map((metric) => {


  //     res.status(200).send(metrics)
  //   }
  // })
}
