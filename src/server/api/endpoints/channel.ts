import { observable } from "@trpc/server/observable";
import { publicProcedure, router } from "../trpc";
import {
    type EventCallback,
    serverEventBus,
    ServerEvents
} from "../../ServerEventBus";
import { z } from "zod";

export const channelRouter = router({
    ws: publicProcedure.subscription(opts => {
        return observable(emit => {
            // Create a callback map
            const callMap: any = {
                chat: msg => {},
                hi: msg => {}
            };

            // Register all callbacks
            for (const key of Object.keys(callMap) as Array<
                keyof ServerEvents
            >) {
                serverEventBus.on(key, callMap[key]);
            }

            return () => {
                // Deregister all callbacks
                for (const key of Object.keys(callMap) as Array<
                    keyof ServerEvents
                >) {
                    serverEventBus.off("chat", callMap[key]);
                }
            };
        });
    }),

    a: publicProcedure
        .input(
            z.object({
                message: z.string().nonempty()
            })
        )
        .mutation(opts => {
            if (!opts.ctx.userId) return;
            const message: ServerEvents["chat"] = {
                m: "chat",
                a: opts.input.message,
                t: Date.now(),
                p: {
                    name: opts.ctx.name,
                    _id: opts.ctx.userId,
                    color: opts.ctx.userColor,
                    id: opts.ctx.participantId
                }
            };

            console.log("Received channel message:", opts);
            serverEventBus.emit("chat", message);

            return message;
        })
});

export type ChannelRouter = typeof channelRouter;
