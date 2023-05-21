console.time("Server");

require("dotenv").config();
const esbuild = require("esbuild");
const fs = require("fs/promises");

(async () => {
    // await fs.mkdir("build/server", {
    //     recursive: true
    // });

    await esbuild.build({
        entryPoints: ["src/server/index.ts"],
        bundle: true,
        minify: false,
        minifySyntax: false,
        minifyWhitespace: false,
        outfile: "build/server.bundle.js",
        platform: "node",
        target: ["node20.2.0"],
        sourcemap: false,
        metafile: true,
        define: {
            "process.env": JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT,
                ID_SALT: process.env.ID_SALT,

                PUBLIC_API_ENDPOINT: process.env.PUBLIC_API_ENDPOINT,
                PUBLIC_WS_ENDPOINT: process.env.PUBLIC_WS_ENDPOINT
            })
        }
    });
})();

console.timeEnd("Server");
