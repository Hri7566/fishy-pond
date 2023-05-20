console.time("Client");

const esbuild = require("esbuild");
const fs = require("fs/promises");
const { htmlPlugin } = require("@craftamap/esbuild-plugin-html");
const postCssPlugin = require("esbuild-style-plugin");

(async () => {
    await fs.mkdir("build", {
        recursive: true
    });

    await esbuild.build({
        entryPoints: ["src/client/index.tsx"],
        bundle: true,
        outdir: "build/client/",
        platform: "browser",
        target: ["chrome58"],
        metafile: true,
        define: {
            "process.env": JSON.stringify({
                NODE_ENV: process.env.NODE_ENV,
                PORT: process.env.PORT
            })
        },
        plugins: [
            htmlPlugin({
                files: [
                    {
                        entryPoints: ["src/web/client/index.tsx"],
                        filename: "index.html",
                        htmlTemplate: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>fishy pond</title><link rel="stylesheet" href="index.css" /></head><body><div id="root"></div><script src="/index.js"></script></body></html>`
                    }
                ]
            }),
            postCssPlugin({
                postcss: {
                    plugins: [require("tailwindcss"), require("autoprefixer")]
                }
            })
        ]
    });
})();

console.timeEnd("Client");
