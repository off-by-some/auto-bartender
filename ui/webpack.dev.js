const { merge } = require('webpack-merge');
const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    plugins: [ new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin() ],
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [ require.resolve('react-refresh/babel')],
              },
            },
          ],
        },
      ],
    },
    devServer: {
        static: path.join(__dirname, "public/"),
        port: 3000,
        hot: true,
        devMiddleware: {
            publicPath: "http://localhost:3000/dist/",
        }
    },
});