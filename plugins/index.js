//plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DllParser = require("@talentui/dll-parser");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const {
    isProduction,
    library,
    packageName,
    appId,
    root,
    componentCode,
    dllList,
    componentEntry,
    version
} = require("../constants");
const webpack = require("webpack");
const path = require("path");
// const { dllList } = require(path.resolve(root, "./src/dll-config.js"));

const plugins = [];

const dllReferencePlugins = new DllParser(dllList, isProduction) //返回值是数组
    .getRefPlugin(root);
const extractTextPlugin = new ExtractTextPlugin({
    filename: isProduction ? `main-${version}.min.css` : "main.css",
    allChunks: true
});
const uglifyJsPlugin = new (require("uglify-js-plugin"))({
    uglifyOptions: {
        ie8: true,
        ecma: 6,
        compress: {
            drop_console: true
        }
    },
    sourceMap: true,
    parallel: true
});
const definePlugin = new webpack.DefinePlugin({
    "process.env": {
        library: JSON.stringify(library),
        packageName: JSON.stringify(packageName),
        appId: JSON.stringify(appId),
        componentCode: JSON.stringify(componentCode),
        NODE_ENV: JSON.stringify(isProduction ? "production" : "development"),
        componentEntry: JSON.stringify(componentEntry)
    }
});

//打包后的内容分析工具，协助完成构建结果分析
const analyzer = new BundleAnalyzerPlugin({
    analyzerMode: "static",
    generateStatsFile: true,
    reportFilename: isProduction ? `report-${version}.html` : `report.html`,
    statsFilename: isProduction ? `stats-${version}.json` : `stats.json`
});

plugins.push(...dllReferencePlugins, definePlugin, analyzer);
if (isProduction) plugins.push(uglifyJsPlugin);
module.exports = plugins;
