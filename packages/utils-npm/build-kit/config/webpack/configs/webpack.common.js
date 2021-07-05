const paths = require('../../paths');
const loadersCommon = require('../loaders/loaders.common');
const pluginsCommon = require('../plugins/plugins.common');

/** @typedef {import('webpack').Configuration} Configuration */

/**
 * @returns {Configuration}
 */
module.exports = () => ({
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        modules: paths.resolveModules,
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    module: {
        rules: [...loadersCommon],
    },

    plugins: [...pluginsCommon],
});
