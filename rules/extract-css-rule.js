const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { isProduction } = require("../constants");
module.exports = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use: {
            loader: "css-loader",
            options: {
                minimize: isProduction,
                sourceMap: isProduction
            }
        },
        publicPath:'../'//和所定义的打包出的dist文件结构有关  css文件放在css文件下    
    })
};
