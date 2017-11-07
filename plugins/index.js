//plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DllParser = require("@talentui/dll-parser");
const { isProduction , library} = require("../constants");
const webpack = require('webpack');
const { npm_package_version } = process.env;

module.exports = function({ dllList, root }) {
    const plugins = [];

    const dllReferencePlugins = new DllParser(dllList, isProduction) //返回值是数组
        .getRefPlugin(root);
    const extractTextPlugin = new ExtractTextPlugin({
        filename: `css/style-${npm_package_version}.css`
    });
    const uglifyJsPlugin = new (require("webpack")).optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8: false,
            drop_console: true
        },
        mangle: { screw_ie8: false },
        output: { screw_ie8: false },
        sourceMap: true
    });
    const definePlugin = new webpack.DefinePlugin({
        "process.env": {
            "library": library
        }
    })

    plugins.push(...dllReferencePlugins, extractTextPlugin,definePlugin);
    if(isProduction) plugins.push(uglifyJsPlugin)
    return plugins;
};
