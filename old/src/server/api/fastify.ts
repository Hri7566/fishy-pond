import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import { resolve } from "path";
import { env } from "../util/env";
import FastifyWebSocket from "@fastify/websocket";

// Create fastify server
const fastify = Fastify({
    logger: env.NODE_ENV == "development"
});

// Serve static files
fastify.register(FastifyStatic, {
    root: resolve("build/client")
});

// Enable websockets
fastify.register(FastifyWebSocket);

export default fastify;
