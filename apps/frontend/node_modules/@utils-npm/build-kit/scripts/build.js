/* eslint-disable  import/no-extraneous-dependencies */
const chalk = require('chalk');
const webpack = require('webpack');
/* eslint-enable  import/no-extraneous-dependencies */
require('dotenv').config();

const getWebpackConfig = require('../config/webpack/webpack.config');
const {logMessage, compilerPromise} = require('./utils');

(async () => {
    /** @type {import('webpack').Configuration} */
    const feConfig = getWebpackConfig();

    /** @type {import('webpack').Compiler} */
    const clientCompiler = webpack(feConfig);

    const clientPromise = compilerPromise(clientCompiler);

    clientCompiler.run((error, stats) => {
        if (!error && !stats.hasErrors()) {
            // eslint-disable-next-line no-console
            console.log(stats.toString(feConfig.stats));
            return;
        }
        // eslint-disable-next-line no-console
        console.error(chalk.red(stats.compilation.errors));
    });

    try {
        await clientPromise;
        logMessage('Client build done!', 'info');
    } catch (error) {
        logMessage(error, 'error');
    }
})();
