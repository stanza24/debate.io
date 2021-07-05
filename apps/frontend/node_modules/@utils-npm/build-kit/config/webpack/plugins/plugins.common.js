const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const React = require('react');
const webpack = require('webpack');
const {IS_PRODUCTION, USE_CDN_REACT, PROJECT_TITLE} = require('../../constants');
const paths = require('../../paths');

const gitRevisionPlugin = new GitRevisionPlugin();

const progressHandler = (percentage, message, ...args) => {
    // например, он выводит каждое сообщение о ходе выполнения непосредственно на консоль:
    // eslint-disable-next-line no-console
    console.info(percentage, message, ...args);
};

module.exports = [
    new webpack.ProgressPlugin(progressHandler),

    // eslint-disable-next-line no-useless-escape
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),

    /**
     * @see https://www.npmjs.com/package/fork-ts-checker-webpack-plugin#typescript-options
     */
    new ForkTsCheckerWebpackPlugin({
        typescript: {
            enabled: true,
            profile: true,
            memoryLimit: 4096,
            mode: 'write-references',
            diagnosticOptions: {
                syntactic: true,
                semantic: true,
            },
            configFile: paths.pathTsConfig,
        },
        // eslint: {
        //     files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        // }
    }),

    new HtmlWebpackPlugin({
        /**
         * @see https://github.com/jantimon/html-webpack-plugin/blob/86c561c0b3e78e72ec3f24d059be0b492032fdc8/examples/template-parameters/webpack.config.js#L19
         */
        templateParameters: (compilation, assets, assetTags, options) => {
            return {
                compilation,
                webpackConfig: compilation.options,
                htmlWebpackPlugin: {
                    tags: assetTags,
                    files: assets,
                    options,
                },
                projectTitle: PROJECT_TITLE,
                isProd: IS_PRODUCTION,
                useCDNReact: USE_CDN_REACT,
                reactVersion: React.version,
            };
        },
        template: paths.templatePath,
        minify: IS_PRODUCTION,
    }),

    // копирование файлов и папок по определенным путям.
    new CopyWebpackPlugin({
        // копирует контент у `assets` в /assets/
        patterns: [
            {
                from: paths.assets,
                to: 'assets',
                noErrorOnMissing: true
            },
            {
                from: paths.images,
                to: 'images',
                noErrorOnMissing: true
            },
            {
                from: paths.mocks,
                to: 'mocks',
                noErrorOnMissing: true
            },
        ],
    }),

    new MiniCssExtractPlugin({
        // Параметры, аналогичные тем же параметрам в webpackOptions.output
        // оба варианта необязательны
        // filename: `css/[name]${IS_PRODUCTION ? '.[contenthash].css' : '.css'}`,
        // chunkFilename: `css/chunks/[name]${IS_PRODUCTION ? '.[contenthash].chunk.css' : '.css'}`,
        filename: `css/[name]${IS_PRODUCTION ? '.css' : '.css'}`,
        chunkFilename: `css/chunks/[name]${IS_PRODUCTION ? '.css' : '.css'}`,
    }),
];
