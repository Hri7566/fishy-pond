import fastify from "../fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { mainRouter, createMainContext } from "./main";
import { channelRouter, createChannelContext } from "./channel";

// Setup all API endpoints

fastify.register(fastifyTRPCPlugin, {
    prefix: "/api",
    trpcOptions: { router: mainRouter, createContext: createMainContext }
});

fastify.register(fastifyTRPCPlugin, {
    prefix: "/api/channel",
    trpcOptions: { router: channelRouter, createContext: createChannelContext }
});
