import type { FastifyReply, FastifyRequest } from "fastify";
import { IDGenerator } from "../../crypto/IDGenerator";
import { publicProcedure, router } from "../trpc";

export const mainRouter = router({
    hi: publicProcedure.query(({ ctx }) => {
        const id = IDGenerator.generateID(ctx.ip);
        return {
            m: "hi"
        };
    })
});

export const createMainContext = (req: FastifyRequest, rep: FastifyReply) => {
    // Get IP directly, or optionally from X-Forwarded-For if provided by a proxy service
    let ip = req.ip;
    if (req.ips) ip = req.ips[0];

    return { ip };
};

export type MainRouter = typeof mainRouter;
