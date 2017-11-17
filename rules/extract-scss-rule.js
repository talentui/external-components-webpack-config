const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { isProduction } = require("../constants");

module.exports = {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        use: [
            {
                loader: "css-loader",
                options: {
                    minimize: isProduction,
                    sourceMap: isProduction
                }
            },
            "sass-loader"
        ],
        publicPath:'./'    
    }),
};