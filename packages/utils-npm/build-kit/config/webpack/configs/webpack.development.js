const {PORT, DEVSERVER_HOST} = require('../../constants');
const paths = require('../../paths');
const pluginsDevelopment = require('../plugins/plugins.development');

module.exports = () => {
    /** @type {import('webpack').Configuration} */
    return {
        name: 'webpack-config-development',
        mode: 'development',
        devtool: 'source-map',
        entry: {
            app: [
                'react-hot-loader/patch',
                `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${PORT}/__webpack_hmr`,
                '@babel/polyfill',
                paths.pathIndex,
            ],
        },
        output: {
            path: paths.src,
            publicPath: `http://localhost:${PORT}/`,
            filename: '[name].bundle.js',
            chunkFilename: 'js/chunks/[name].chunk.js',
            // sourceMapFilename: 'js/[name].map',
        },

        plugins: [...pluginsDevelopment],
    };
};
