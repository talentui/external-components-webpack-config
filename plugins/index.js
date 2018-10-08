//plugins
const {
    isProduction,
    library,
    packageName,
    appId,
    root,
    componentCode,
    dllList,
    componentEntry,
    npm_package_version
} = require("./constants");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack");

const plugins = [];
const dllReferencePlugins = require('@talentui/webpack-config/src/plugins/dll-reference-plugin')
const uglifyJsPlugin = require('@talentui/webpack-config/src/plugins/uglify-js-plugin')
//运行态所依赖的参数
const definePlugin = new webpack.DefinePlugin({
    "process.env": {
        library: JSON.stringify(library),
        packageName: JSON.stringify(packageName),
        appId: JSON.stringify(appId),
        componentCode:JSON.stringify(componentCode),
        'NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        componentEntry: JSON.stringify(componentEntry)
    }
});

//打包后的内容分析工具，协助完成构建结果分析
const analyzer = new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    generateStatsFile: true,
    reportFilename: isProduction ? `report-${npm_package_version}.html` : `report.html`,
    statsFilename: isProduction ? `stats-${npm_package_version}.json` : `stats.json`
})

plugins.push(...dllReferencePlugins, definePlugin, analyzer);
if (isProduction) plugins.push(uglifyJsPlugin);
module.exports = plugins;
