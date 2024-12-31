import { FastifyInstance } from "fastify";
import db from "../database";

export default function meRouter(fastify: FastifyInstance) {
    fastify.route({
        method: "GET",
        url: '/me',
        handler: async (request, reply) => {
            const response = await db.user.findFirst({
                where: {
                    email: process.env.EMAIL,
                },
                include: {
                    Blogs: true,
                    Experience: true,
                    Projects: true,
                }
            })

            return reply.status(200).send(response)
        }
    })
}