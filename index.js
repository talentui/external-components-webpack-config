const path = require("path");
const { isProduction } = require("./constants");
const { asset_path } = process.env;

module.exports = function(options) {
    const { entry, root, library, dllList } = options;
    const plugins = require("./plugins")(options);

    return {
        entry: entry,
        output: {
            path: path.resolve(root, "dist"),
            chunkFilename: isProduction
                ? "[name]-[chunkhash].chunk.min.js"
                : "[name].chunk.js",
            filename: isProduction ? "[name]-[chunkhash].min.js" : "[name].js",
            library: library,
            libraryTarget: "umd",
            publicPath: asset_path || "/"
        },
        module: {
            rules: require("./rules/index.js")
        },
        plugins: plugins
    };
};
