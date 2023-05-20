import { env } from "./util/env";
import { cache } from "./data/cache";
import fastify from "./api/fastify";
import "./api/endpoints";

fastify.listen({ port: env.PORT }).then(() => {
    process.stdout.write(`Listening on port ${env.PORT}\n`);
});
