module.exports = {
    presets: [['@babel/preset-env', {modules: false}], '@babel/preset-typescript'],
    plugins: [
        'react-hot-loader/babel',
        '@loadable/babel-plugin',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-async-generators',
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-object-assign',
        [
            '@babel/plugin-transform-react-jsx',
            {
                runtime: 'automatic',
            },
        ],
    ],
};
