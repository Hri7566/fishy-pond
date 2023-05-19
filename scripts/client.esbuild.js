console.time("Client");

const esbuild = require("esbuild");
const fs = require("fs/promises");

(async () => {
    await fs.mkdir("build", {
        recursive: true
    });

    await esbuild.build({
        entryPoints: ["src/client/index.tsx"],
        bundle: true,
        outfile: "build/client.bundle.js"
    });
})();

console.timeEnd("Client");
