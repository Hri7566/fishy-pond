import { createWSClient } from "@trpc/client";
import { env } from "../../server/util/env";

export const wsClient = createWSClient({
    url: env.PUBLIC_WS_ENDPOINT
});
