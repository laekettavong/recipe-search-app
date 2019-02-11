//import path from 'path'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    //web pack core concepts: entry point, output, loaders, plugins
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    //mode: 'development', //this can be passed in via the NPM script in package.json
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }

}