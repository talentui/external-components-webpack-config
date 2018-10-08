const { library, root, dllList } = require("./constants");
const { npm_package_name } = process.env;
const path = require("path");
const webpackConfig = require("@talentui/webpack-config")({
    entry: "@talentui/external-components-webpack-config",
    output:{
        publicPath:`//stnew03.beisen.com/ux/upaas/${npm_package_name}/release/dist/`,
        jsonpFunction: library
    },
    dllList: dllList,
    projectType: "module",
    alias: {
        "&": path.resolve(root, "./src")
    }
});
const plugins = require('./plugins');
const rules = require('./rules');
webpackConfig.plugins = plugins;
webpackConfig.module.rules = rules;
module.exports = webpackConfig;