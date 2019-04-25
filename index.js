const fs = require("fs");
const path = require("path");
const merge = require("webpack-merge");
const Analyzer = require("webpack-bundle-analyzer");
const root = fs.realpathSync(process.cwd());
const { asset_path, NODE_ENV } = process.env;
const {
    appId,
    componentCode,
    name,
    version,
    projectType
} = require(path.resolve(root, "package.json"));
const library = name.replace(/@|\-|\//g, "_");
const buildProd = NODE_ENV === "production";

const webpackConfig = require("@talentui/webpack-config")({
    entry: {
        main: path.resolve(__dirname, "lib/index.js")
    },
    port: 3001,
    language: "mixed",
    extractStyles: false,
    publicPath:
        asset_path ||
        "//stnew03.beisen.com/ux/upaas/" + name + "/release/dist/",
    hostPage: path.resolve(__dirname, "index.html"),
    define: {
        "process.env": {
            library: JSON.stringify(library),
            packageName: JSON.stringify(name),
            appId: JSON.stringify(appId),
            componentCode: JSON.stringify(componentCode),
            projectType: JSON.stringify(projectType)
        }
    },
    projectType: "module"
});
//自定义webpack配置
let customWebpackConfig = {};
let customWebpackConfigPath = path.resolve(root, "webpack.config.js");
if (fs.existsSync(customWebpackConfigPath)) {
    customWebpackConfig = require(customWebpackConfigPath);
}
module.exports = merge(
    webpackConfig,
    {
        externals: {
            react: "React",
            "react-dom": "ReactDOM",
            // "styled-components":'styled'
        },
        output: {
            jsonpFunction: library
        },
        plugins: buildProd
            ? [
                  new Analyzer.BundleAnalyzerPlugin({
                      analyzerMode: "static",
                      generateStatsFile: true,
                      reportFilename: `report-${version}.html`,
                      statsFilename: `stats-${version}.json`
                  })
              ]
            : []
    },
    customWebpackConfig
);
