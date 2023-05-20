import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import { resolve } from "path";
import { env } from "../util/env";

const fastify = Fastify({
    logger: env.NODE_ENV == "development"
});

fastify.register(FastifyStatic, {
    root: resolve("build/client")
});

export default fastify;
