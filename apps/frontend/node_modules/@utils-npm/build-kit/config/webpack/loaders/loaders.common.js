const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {IS_PRODUCTION} = require('../../constants');
const {getScriptLoaders} = require('./utils');

const scssRegex = /\.(sa|sc|le|c)ss$/;
const fontsRegex = /\.(woff|woff2|eot|ttf|otf)$/;
const imagesRegex = /\.(svg|jpg|jpeg|png)$/;

/** @typedef {import('webpack').RuleSetRule} RuleSetRule */

/**
 * @type {RuleSetRule}
 */
const images = {
    test: imagesRegex,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]',
                publicPath: '../../',
            },
        },
    ],
};

/**
 * @type {RuleSetRule}
 */
const fonts = {
    test: fontsRegex,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'fonts/[name]/[name].[ext]',
                publicPath: '../../',
            },
        },
    ],
};

/**
 * @type {RuleSetRule}
 */
const less = {
    test: scssRegex,
    use: [
        {
            /** @see https://github.com/webpack-contrib/mini-css-extract-plugin#common-use-case */
            loader: IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
        },
        {
            loader: 'css-loader',
        },
        {
            loader: 'postcss-loader',
        },
        {
            loader: 'less-loader',
            options: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    ],
};
/**
 * @typedef {Array<RuleSetRule>} CommonLoaders
 */
const commonLoaders = [...getScriptLoaders(), images, fonts, less];

/**
 * @type {CommonLoaders}
 */
module.exports = commonLoaders;
