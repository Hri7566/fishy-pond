import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { IDGenerator } from "../auth/IDGenerator";
import { Logger } from "../util/Logger";
import { defaultChannels } from "../defaultChannels";

const logger = new Logger("Context");

export const createContext = (opts: CreateFastifyContextOptions) => {
    // Get IP directly, or optionally from X-Forwarded-For if provided by a proxy service
    let ip = opts.req.socket.remoteAddress;
    if (opts.req.ip) ip = opts.req.ip;
    if (opts.req.ips) ip = opts.req.ips[0];

    // Generate user ID
    let userId = IDGenerator.generateRandomID();
    let participantId = userId;
    if (ip) userId = IDGenerator.generateID(ip);

    // Get user color
    let userColor = "#fff";
    if (ip) userColor = IDGenerator.getColor(userId);
    // TODO Get username and color from database

    let currentChannel = defaultChannels[0].id;

    return {
        userId,
        userColor,
        participantId,
        currentChannel,
        name: "Anonymous"
    };
};

export type Context = inferAsyncReturnType<typeof createContext>;
