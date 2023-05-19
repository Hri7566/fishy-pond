import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import { join, resolve } from "path";
import { Logger } from "./util/Logger";
import { env } from "./util/env";

const fastify = Fastify({
    logger: true
});

fastify.register(FastifyStatic, {
    root: join(__dirname, "public")
});

fastify.listen({ port: env.PORT });

console.log("Started on port " + env.PORT);
