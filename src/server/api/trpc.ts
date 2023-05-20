import { initTRPC } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
