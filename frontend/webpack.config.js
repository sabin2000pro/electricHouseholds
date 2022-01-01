const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Main entry point for compilation

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index_bundle.js'
    },

    module: {
        rules: [{test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']}, {test: /.css$/, use: [ 'style-loader', 'css-loader' ]}]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
      },

    plugins: [new HtmlWebpackPlugin({template: './public/index.html'})]

}