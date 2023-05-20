import fastify from "./api/fastify";
import { env } from "./util/env";
import { cache } from "./data/cache";

fastify.listen({ port: env.PORT }).then(() => {
    process.stdout.write(`Listening on port ${env.PORT}\n`);
});
