import { env } from "./util/env";
import { cache } from "./data/cache";
import fastify from "./api/fastify";
import "./api/endpoints";
import { serverEventBus } from "./ServerEventBus";

fastify.listen({ port: env.PORT, host: `0.0.0.0` }).then(() => {
    process.stdout.write(`Listening on port ${env.PORT}\n`);
});
