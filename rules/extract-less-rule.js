const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { isProduction } = require("../constants");

module.exports = {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
        use: [
            {
                loader: "css-loader",
                options: {
                    minimize: isProduction,
                    sourceMap: isProduction
                }
            },
            "less-loader"
        ],
        publicPath:'./'    
    }),
};