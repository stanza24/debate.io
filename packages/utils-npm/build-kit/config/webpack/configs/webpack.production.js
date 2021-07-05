const rimraf = require('rimraf');
const {PUBLIC_PATH} = require('../../constants');
const paths = require('../../paths');
const pluginsProduction = require('../plugins/plugins.production');

module.exports = () => {
    // удаляем папку `dist` до сборки.
    rimraf.sync(paths.dist);

    /** @type {import('webpack').Configuration} */
    return {
        name: 'webpack-config-production',
        mode: 'production',
        entry: {
            app: ['@babel/polyfill', paths.pathIndex],
        },
        output: {
            path: paths.dist,
            publicPath: PUBLIC_PATH,
            filename: 'js/[name].[contenthash].js',
            chunkFilename: 'js/chunks/[name].[contenthash].chunk.js',
        },
        performance: {
            hints: 'warning', // enum
            maxAssetSize: 200000, // int (in bytes),
            maxEntrypointSize: 400000, // int (in bytes)
            assetFilter: (assetFilename) =>
                // Предикат функции, который предоставляет имена файлов .
                assetFilename.endsWith('.css') || assetFilename.endsWith('.js'),
        },

        plugins: [...pluginsProduction()],
    };
};
