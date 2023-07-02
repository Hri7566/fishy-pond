/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { IDGenerator } from "../auth/IDGenerator";
import { defaultChannels } from "../defaultChannels";
import { type Channel } from "../Channel";

export const createContext = (opts: CreateFastifyContextOptions) => {
    const forwarded = (opts.req as { headers: Record<string, string> }).headers[
        "x-forwarded-for"
    ] as string;
    let ip: string | undefined;
    ip == forwarded
        ? (ip = forwarded.split(/, /)[0])
        : (ip = (opts.req as { connection: { remoteAddress: string } })
              .connection.remoteAddress);

    // Generate user ID
    let userId = IDGenerator.generateRandomID();
    const participantId = userId;
    if (ip) userId = IDGenerator.generateID(ip);

    // Get user color
    let userColor = "#fff";
    if (ip) userColor = IDGenerator.getColor(userId);
    // TODO Get username and color from database
    // TODO Change the context

    const currentChannel = (defaultChannels[0] as unknown as Channel).id;

    return {
        userId,
        userColor,
        participantId,
        currentChannel,
        name: "Anonymous"
    };
};

export type Context = inferAsyncReturnType<typeof createContext>;

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null
            }
        };
    }
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
// export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
