const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');

module.exports = () => [
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
            preset: ['default', {discardComments: {removeAll: true}}],
        },
        canPrint: true,
    }),

    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
    }),

    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new CompressionPlugin({
        test: /\.(png|jpe?g|gif)$/,
    }),
];
