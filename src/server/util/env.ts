import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();

export const env = createEnv({
    clientPrefix: "PUBLIC_",
    server: {
        NODE_ENV: z.string(),
        PORT: z
            .string()
            .transform(s => parseInt(s, 10))
            .pipe(z.number())
    },
    client: {},
    runtimeEnv: process.env
});
