import { env } from "./util/env";
import { cache } from "./data/cache";
import fastify from "./api/fastify";
import "./api/endpoints";
import { eventBus } from "./events";

fastify.listen({ port: env.PORT }).then(() => {
    process.stdout.write(`Listening on port ${env.PORT}\n`);
});
