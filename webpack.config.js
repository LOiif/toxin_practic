const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'form.html',
            template: './src/form.html',
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
                            name: '[name]-[hash:8].[ext]',
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
                            name: '[name]-[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: true,
                }
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