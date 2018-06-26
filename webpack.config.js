const path = require("path");
const { isProduction, library, root } = require("./constants");
const { npm_package_version, npm_package_name } = process.env;
const plugins = require('./plugins/index')
module.exports = {
        entry: "@talentui/external-components-webpack-config",
        output: {
            path: path.resolve(root, "dist"),
            chunkFilename: isProduction
                ? `[name]-${npm_package_version}.chunk.min.js`
                : "[name].chunk.js",
            filename: isProduction
                ? `main-${npm_package_version}.min.js`
                : "main.js",
            publicPath: `//stnew03.beisen.com/ux/upaas/${npm_package_name}/release/dist/`,
            jsonpFunction: library
        },
        module: {
            rules: require("./rules/index.js")
        },
        plugins: plugins,
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx", ".vue"],
            alias: {
                "&": path.resolve(root, "./src")
            }
        }
};
