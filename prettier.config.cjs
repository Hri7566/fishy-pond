/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
    arrowParens: "avoid",
    tabWidth: 4,
    trailingComma: "none"
};

module.exports = config;
