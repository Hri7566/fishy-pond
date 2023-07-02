import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
    getChatHistory: publicProcedure.query(() => {
        return [{}];
    })
});
