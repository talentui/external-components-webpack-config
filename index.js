const path = require("path");
const { isProduction, library } = require("./constants");
const { asset_path, npm_package_version } = process.env;
module.exports = function(options) {
    const { entry, root, dllList } = options;
    const plugins = require("./plugins")(options);
    return {
        entry: entry,
        output: {
            path: path.resolve(root, "dist"),
            chunkFilename: isProduction
                ? `[name]-${npm_package_version}.chunk.min.js`
                : "[name].chunk.js",
            filename: isProduction
                ? `main-${npm_package_version}.min.js`
                : "main.js",
            library: library,
            libraryTarget: "umd",
            publicPath: asset_path || "/"
        },
        module: {
            rules: require("./rules/index.js")
        },
        plugins: plugins,
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        }
    };
};
