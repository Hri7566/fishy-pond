import { initTRPC } from "@trpc/server";
import { Context } from "./context";

// Start tRPC
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
