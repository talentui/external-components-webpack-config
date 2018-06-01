//plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DllParser = require("@talentui/dll-parser");
const {
    isProduction,
    library,
    packageName,
    appId,
    root
} = require("../constants");
const webpack = require("webpack");
const path = require("path");
const { npm_package_version } = process.env;
const { dllList } = require(path.resolve(root, "./src/dll-config.js"));

const plugins = [];

const dllReferencePlugins = new DllParser(dllList, isProduction) //返回值是数组
    .getRefPlugin(root);
const extractTextPlugin = new ExtractTextPlugin({
    filename: isProduction ? `main-${npm_package_version}.min.css` : "main.css",
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
        'NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
    }
});

plugins.push(...dllReferencePlugins, extractTextPlugin, definePlugin);
if (isProduction) plugins.push(uglifyJsPlugin);
module.exports = plugins;
