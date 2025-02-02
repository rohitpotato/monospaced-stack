import fastify from "fastify";
require('dotenv').config()
import { envToLogger } from "./config";
import loadConfig from "./src/config";
import meRouter from "./src/routes/me";
import metricsPlugin from "fastify-metrics";

loadConfig();

const port = Number(process.env.PORT) || 5001;
console.log('Configured Port', port);

const startServer = async () => {

    const server = fastify({
        logger: envToLogger[process.env.NODE_ENV === 'production' ? 'production' : 'development'],
    });

    // Register routes
    server.register(meRouter, {
        prefix: '/api'
    })

    // Register metrics plugin
    server.register(metricsPlugin, {
        endpoint: '/metrics', routeMetrics: {
            enabled: true,
            registeredRoutesOnly: false,
        }
    });

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