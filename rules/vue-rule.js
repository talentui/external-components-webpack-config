var ExtractTextPlugin = require('extract-text-webpack-plugin')
const { isProduction } = require("../constants.js");
const vueStyleLoader = 'vue-style-loader';


const cssLoader = {
    loader: "css-loader",
    options: {
        minimize: isProduction
    }
};

function generatorLoaders(type, loaderOptions) {
    var loaders = [cssLoader];
    if(type){
        loaders.push({
            loader: `${type}-loader`,
            options: loaderOptions
        })
    }
    if(isProduction){
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: vueStyleLoader
        })
    }
    return [vueStyleLoader].concat(loaders)
}

module.exports = {
    test: /\.vue$/,
    loader: "vue-loader",
    options: {
        loaders: {
            css: generatorLoaders(),
            sass: generatorLoaders('sass')
        },
        transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
    }
};
