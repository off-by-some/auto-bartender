const { merge } = require('webpack-merge');
const common = require("./webpack.common");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    output: {
      path: path.resolve(__dirname, 'app'),
      publicPath: '/',
      filename: "bundle.js"
    },
    plugins: [ new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'public', 'index.html')
    })]
});
