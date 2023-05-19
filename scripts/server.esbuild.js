console.time("Server");

import * as esbuild from "esbuild";
import * as fs from "fs/promises";

(async () => {
    await fs.mkdir("build/server", {
        recursive: true
    });

    await esbuild.build({
        entryPoints: ["src/server/index.ts"],
        bundle: false,
        outdir: "build/server",
        platform: "node",
        target: ["node20.2"]
    });
})();

console.timeEnd("Server");
