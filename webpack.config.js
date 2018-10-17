const path = require("path");
const { isProduction, library, root, packageName, version} = require("./constants");
const plugins = require('./plugins/index')
module.exports = {
        entry: "@talentui/external-components-entrance/dynamic.js",
        output: {
            path: path.resolve(root, "talentui-static", packageName,'release/dist'),
            chunkFilename: isProduction
                ? `[name]-${version}.chunk.min.js`
                : "[name].chunk.js",
            filename: isProduction
                ? `main-${version}.min.js`
                : "main.js",
            publicPath: `//stnew03.beisen.com/ux/upaas/${packageName}/release/dist/`,
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
