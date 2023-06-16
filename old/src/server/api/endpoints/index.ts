import fastify from "../fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { apiRouter } from "./main";
import { createContext } from "../context";

// Setup main API endpoint with websockets
fastify.register(fastifyTRPCPlugin, {
    prefix: "/api",
    trpcOptions: { router: apiRouter, createContext: createContext },
    useWSS: true
});
