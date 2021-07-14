const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.min.js'
    },
    resolve: {
        extensions: ['.js','.scss']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader","css-loader","sass-loader"],
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'index',
            template: path.resolve(__dirname, './src/views/index.htm'),
            filename: 'index.htm',
        }),
    ],
};