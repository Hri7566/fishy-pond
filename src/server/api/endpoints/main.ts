import { publicProcedure, router } from "../trpc";
import { channelRouter } from "./channel";

export const apiRouter = router({
    hi: publicProcedure.query(opts => {
        return {
            m: "hi",
            u: {
                _id: opts.ctx.userId
            }
        };
    }),

    channel: channelRouter
});

export type APIRouter = typeof apiRouter;
