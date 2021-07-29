const path = require('path');
const webpack = require('webpack')
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
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader",

                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,

                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                    ],
                                ],
                            },
                        },
                    },

                    {
                        loader: 'resolve-url-loader',
                        options: {sourceMap: true,},
                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true,},
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name]-[hash:8].[ext]',
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name]-[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            'jquery-ui': 'jquery-ui/ui/widgets',
            'jquery-ui-css': 'jquery-ui/../../themes/base',
        }
    }
};