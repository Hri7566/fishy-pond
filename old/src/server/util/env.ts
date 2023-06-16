import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    clientPrefix: "PUBLIC_",
    server: {
        NODE_ENV: z.string(),
        PORT: z
            .string()
            .transform(s => parseInt(s, 10))
            .pipe(z.number()),
        ID_SALT: z.string()
    },
    client: {
        PUBLIC_API_ENDPOINT: z.string().url(),
        PUBLIC_WS_ENDPOINT: z.string().url()
    },
    runtimeEnv: process.env
});
