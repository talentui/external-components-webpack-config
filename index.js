const path = require('path')
let plugins = [];

module.exports = function(options){
    const {entry, root, library, dllList} = options;
    //plugins
    const dllReferencePlugins = (new DllParser(options.dllList, isProduction)).getRefPlugin
    plugins.push(dllReferencePlugins);

    return {
        entry: entry,
        output:{
            path: path.resolve(root, "dist"),
            filename: "index.js",
            library: library,
            libraryTarget: "umd"
        },
        module: {
            rules: require("./rules/index.js")
        },

    }
}