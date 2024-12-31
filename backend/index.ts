import fastify from "fastify";
import AutoLoad from "@fastify/autoload";

require('dotenv').config()
import { envToLogger } from "./config";
import path from "path";
import loadConfig from "./src/config";
import meRouter from "./src/routes/me";

const port = Number(process.env.PORT) || 5001;
const host = String(process.env.API_HOST) || 'localhost';

loadConfig();

const startServer = async () => {

    const server = fastify({
        logger: envToLogger[process.env.NODE_ENV === 'production' ? 'production' : 'development'],
    });

    // Register middlewares
    // server.register(formbody);
    // server.register(cors);
    // server.register(helmet);

    // Register routes
    server.register(meRouter, {
        prefix: '/api'
    })

    // Set error handler
    server.setErrorHandler((error, _request, reply) => {
        server.log.error(error);
        reply.status(500).send({ error: 'Something went wrong' });
    });

    // Health check route
    server.get('/health', async (_request, reply) => {
        try {
            reply.status(200).send({
                message: 'Health check endpoint success.',
            });
        } catch (e) {
            reply.status(500).send({
                message: 'Health check endpoint failed.',
            });
        }
    });

    try {
        await server.listen({
            port,
            host: '0.0.0.0'

        });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }

    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
        console.error('Unhandled Rejection:', err);
        process.exit(1);
    });

}


startServer();