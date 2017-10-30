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
        }
    })
};
