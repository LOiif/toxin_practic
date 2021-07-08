const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            }),
        new MiniCssExtractPlugin({
           filename: 'style.css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
    },
};