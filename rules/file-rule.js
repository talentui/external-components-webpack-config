module.exports = {
    test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[^('|")]*)?$/,
    loader: "file-loader",
    options: {
        name: "assets/[name].[ext]",
        useRelativePath: true
    }
};
