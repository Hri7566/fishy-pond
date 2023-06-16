import { observable } from "@trpc/server/observable";
import { publicProcedure, router } from "../trpc";
import { serverEventBus, ServerEvents } from "../../ServerEventBus";
import { z } from "zod";
import { ErrorNoChannel, ErrorNotAuthenticated } from "../errors";
import { Channel } from "../../Channel";

export const channelRouter = router({
    subscribe: publicProcedure.subscription(opts => {
        return observable(emit => {
            // Create an event subscriber
            const eventSubscriber = serverEventBus.subscribe(
                opts.ctx.participantId,
                emit,
                opts.ctx
            );

            return () => {
                // Disable the event subscriber
                eventSubscriber.destroy();
            };
        });
    }),

    chat: publicProcedure
        .input(
            z.object({
                message: z.string().nonempty()
            })
        )
        .mutation(opts => {
            if (!opts.ctx.userId) return ErrorNotAuthenticated;

            const message: ServerEvents["chat"] = {
                m: "chat",
                message: opts.input.message,
                t: Date.now(),
                p: {
                    name: opts.ctx.name,
                    _id: opts.ctx.userId,
                    color: opts.ctx.userColor,
                    id: opts.ctx.participantId
                },
                channel: opts.ctx.currentChannel
            };

            serverEventBus.emit("chat", message);

            return message;
        }),

    getChatHistory: publicProcedure.mutation(opts => {
        if (!opts.ctx.userId) return ErrorNotAuthenticated;

        const channel = Channel.channels.get(opts.ctx.currentChannel);

        if (!channel) return ErrorNoChannel;

        return channel.chatHistory;
    }),

    setChannel: publicProcedure
        .input(
            z.object({
                channelId: z.string()
            })
        )
        .mutation(opts => {
            if (!opts.ctx.userId) return ErrorNotAuthenticated;
            const channel = Channel.channels.get(opts.input.channelId);
            const previousChannel = Channel.channels.get(
                opts.ctx.currentChannel
            );

            if (!channel) return ErrorNoChannel;

            if (previousChannel) {
                previousChannel.removeUser(opts.ctx.userId);
            }

            channel.addUser(opts.ctx.userId);
            opts.ctx.currentChannel = channel.id;

            return {
                channelId: opts.ctx.currentChannel
            };
        }),

    getChannelInfo: publicProcedure.query(opts => {
        const channel = Channel.channels.get(opts.ctx.currentChannel);
        if (!channel) return ErrorNoChannel;

        return channel.getInfo();
    }),

    getChannelList: publicProcedure.query(opts => {
        const channelList = Channel.getChannelList();
        return channelList;
    })
});

export type ChannelRouter = typeof channelRouter;
