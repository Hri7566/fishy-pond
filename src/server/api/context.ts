import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { IDGenerator } from "../auth/IDGenerator";

export const createContext = (opts: CreateFastifyContextOptions) => {
    // Get IP directly, or optionally from X-Forwarded-For if provided by a proxy service
    let ip = opts.req.ip;
    if (opts.req.ips) ip = opts.req.ips[0];

    // Generate user ID
    let userId;
    if (ip) userId = IDGenerator.generateID(ip);

    return { userId, name: "Anonymous" };
};

export type Context = inferAsyncReturnType<typeof createContext>;
