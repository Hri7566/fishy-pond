import { publicProcedure, router } from "../trpc";

export const channelRouter = router({
    a: publicProcedure.query(() => {
        // TODO chat messages
        return {};
    })
});

export const createChannelContext = () => {
    // TODO add channel session data
    return {};
};

export type ChannelRouter = typeof channelRouter;
