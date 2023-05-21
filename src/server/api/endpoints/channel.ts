import { observable } from "@trpc/server/observable";
import { publicProcedure, router } from "../trpc";
import { type EventCallback, eventBus } from "../../events";
import { z } from "zod";

export const channelRouter = router({
    ws: publicProcedure.subscription(opts => {
        return observable(emit => {
            const callMap: Record<string, EventCallback> = {
                a: (msg: any) => {
                    console.log("Sending message", msg);
                    emit.next({
                        m: "a",
                        a: msg.a,
                        p: msg.p
                    });
                }
            };

            // Register all callbacks
            for (const key of Object.keys(callMap)) {
                eventBus.on(`channel.${key}`, callMap[key]);
            }

            return () => {
                for (const key of Object.keys(callMap)) {
                    // Deregister all callbacks
                    eventBus.off(`channel.${key}`, callMap[key]);
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
            const message = {
                m: "a",
                a: opts.input.message,
                t: Date.now(),
                p: {
                    name: opts.ctx.name,
                    _id: opts.ctx.userId
                }
            };

            console.log("Received channel message:", opts);
            eventBus.emit("channel.a", message);

            return message;
        })
});

export type ChannelRouter = typeof channelRouter;
