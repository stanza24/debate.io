/* eslint-disable  import/no-extraneous-dependencies */
const chalk = require('chalk');
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const rimraf = require('rimraf');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
/* eslint-enable  import/no-extraneous-dependencies */
require('dotenv').config();

const {PORT, HOST, DEV_PROXY_PATH_TO, DEV_PROXY_PATH_FROM} = require('../config/constants');
const paths = require('../config/paths');

const getWebpackConfig = require('../config/webpack/webpack.config');
const {logMessage, compilerPromise} = require('./utils');

rimraf.sync(paths.dist);

const app = express();

(async () => {
    /** @type {import('webpack').Configuration} */
    const feConfig = getWebpackConfig();

    feConfig.output.hotUpdateMainFilename = 'updates/[fullhash].hot-update.json';
    feConfig.output.hotUpdateChunkFilename = 'updates/[id].[fullhash].hot-update.js';

    const clientCompiler = webpack(feConfig);

    const clientPromise = compilerPromise(clientCompiler);

    // Заголовки для проксирования
    app.use((_, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        return next();
    });

    app.use(
        webpackDevMiddleware(clientCompiler, {
            publicPath: `http://localhost:${PORT}/`,
        })
    );

    app.use(webpackHotMiddleware(clientCompiler));

    app.use('*', express.static(paths.dist));

    if (DEV_PROXY_PATH_TO) {
        app.use(DEV_PROXY_PATH_FROM, createProxyMiddleware({target: DEV_PROXY_PATH_TO, changeOrigin: true}));
    }

    try {
        await clientPromise;

        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(
                `[${new Date().toISOString()}]`,
                chalk.blue(`App is running: ${HOST || 'http://localhost'}:${PORT}`)
            );
        });
    } catch (error) {
        logMessage(error, 'error');
    }
})();
