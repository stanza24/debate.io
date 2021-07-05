const osInfo = require('os');
const {IS_PRODUCTION, USE_THREAD, USE_TS_LOADER} = require('../../../constants');
const paths = require('../../../paths');
const {getThreadLoader} = require('./threadLoader');

/**
 * Регулярное выражение для поиска TypeScript файлов.
 *
 * @type {RegExp}
 */
const tsRegex = /\.(ts|tsx)$/;

/**
 * Регулярное выражение для поиска JavaScript файлов.
 *
 * @type {RegExp}
 */
const jsRegex = /\.(js|mjs|jsx)$/;

/**
 * Регулярное выражение для поиска TypeScript и JavaScript файлов.
 *
 * @type {RegExp}
 */
const allScriptRegex = /\.(js|mjs|jsx|ts|tsx)$/;

/**
 * Список лоадеров используемый по умолчанию.
 *
 * @type {RuleSetUse}
 */
const BASE_LOADERS = [
    {
        loader: 'babel-loader',
    },
];

/**
 * Базовое описание правила сборки для webpack.
 *
 * @type {RuleSetRule}
 */
const BASE_RULES = {
    exclude: /node_modules/,
};

/**
 * Функция хелпер, для получения списка лоадеров, в зависимости от типа сборки.
 */
const getJavaScriptConfigUseArray = () => {
    const loaders = [...BASE_LOADERS];
    const canUseThread = USE_THREAD && !IS_PRODUCTION && osInfo;

    // Данное условие всегда должно быть последним, поскольку thread-loader должен быть первым в очереди.
    if (canUseThread) {
        loaders.unshift(getThreadLoader('javascript-work-pool'));
    }

    return loaders;
};

/**
 * Функция хелпер, для получения списка лоадеров, в зависимости от типа сборки.
 */
const getTypeScriptConfigUseArray = () => {
    const loaders = [...BASE_LOADERS];
    const canUseThread = USE_THREAD && !IS_PRODUCTION && osInfo;

    if (USE_TS_LOADER) {
        loaders.unshift({
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                // loaderContext._module недоступно в отдельном потоке. хоть у нас и не хаппипак,
                // но ситуация с thread-loader не изменилась, свойство все еще нужно
                happyPackMode: canUseThread,
                configFile: paths.pathTsConfig,
                compilerOptions: {
                    sourceMap: true,
                },
            },
        });
    }

    // Данное условие всегда должно быть последним, поскольку thread-loader должен быть первым в очереди.
    if (canUseThread) {
        loaders.unshift(getThreadLoader('typescript-work-pool'));
    }

    return loaders;
};

/**
 * Функция хелпер, для получения списка правил, для сборки кода проекта.
 */
function getScriptLoaders() {
    if (!USE_TS_LOADER) {
        return [
            {
                ...BASE_RULES,
                test: allScriptRegex,
                use: USE_THREAD ? [getThreadLoader(), ...BASE_LOADERS] : BASE_LOADERS,
            },
        ];
    }

    return [
        {
            ...BASE_RULES,
            test: jsRegex,
            use: getJavaScriptConfigUseArray(),
        },
        {
            ...BASE_RULES,
            test: tsRegex,
            use: getTypeScriptConfigUseArray(),
        },
    ];
}

module.exports = {getScriptLoaders};
