/* @see https://stackoverflow.com/a/62846324/5378393 */
const {merge: webpackMerge} = require('webpack-merge');
const {USE_CDN_REACT, MODE} = require('../constants');
const webpackCommonConfig = require('./configs/webpack.common');
const loadPresets = require('./loadPresets');

const webpackModeConfig = require(`./configs/webpack.${MODE}.js`);

/** Часть конфигурации webpack, для исключения реакта из бандла */
const EXCLUDE_REACT_CONFIG = {
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};
const getOtherWebpackConfig = () => USE_CDN_REACT ? EXCLUDE_REACT_CONFIG : {};

/**
 *
 * @param {object} options
 * @param {string} [options.presets]
 */
module.exports = ({presets} = {presets: []}) =>
    webpackMerge(webpackCommonConfig(), webpackModeConfig(), getOtherWebpackConfig(), loadPresets({presets}));
