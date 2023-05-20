import fastify from "../fastify";
import { publicProcedure, router } from "../trpc";
import { createContext } from "../trpc";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";

const mainRouter = router({
    status: publicProcedure.query(() => {
        return {
            status: "online"
        };
    })
});

export type MainRouter = typeof mainRouter;

fastify.register(fastifyTRPCPlugin, {
    prefix: "/api",
    trpcOptions: { router: mainRouter, createContext }
});
