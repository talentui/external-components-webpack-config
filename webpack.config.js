const path = require("path");
const { isProduction, library, root } = require("./constants");
const { asset_path, npm_package_version } = process.env;
const plugins = require('./plugins/index')
module.exports = {
        entry: "@talentui/external-components-entrance/index.js",
        output: {
            path: path.resolve(root, "dist"),
            chunkFilename: isProduction
                ? `[name]-${npm_package_version}.chunk.min.js`
                : "[name].chunk.js",
            filename: isProduction
                ? `main-${npm_package_version}.min.js`
                : "main.js",
            publicPath: asset_path || "/",
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
