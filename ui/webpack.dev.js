const { merge } = require('webpack-merge');
const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    plugins: [ new webpack.HotModuleReplacementPlugin() ],
    devServer: {
        static: path.join(__dirname, "public/"),
        port: 3000,
        hot: 'only',
        devMiddleware: {
            publicPath: "http://localhost:3000/dist/",
        }
    },
});