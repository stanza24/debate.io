const SINGLE_QUOTE_STYLE_RULES = {
    overrides: [
        {
            files: '*.{less,sass,scss,css,pcss}',
            options: {
                singleQuote: false,
            },
        },
    ],
};

/**
 * Функция для возврата конфигурации Prettier.
 */
function getPrettier({styleWithDoubleQuote = false, bracketSpacing = true} = {}) {
    return {
        tabWidth: 4,
        useTabs: false,
        printWidth: 120,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'es5',
        jsxBracketSameLine: false,
        arrowParens: 'always',
        endOfLine: 'lf',
        bracketSpacing,
        ...(styleWithDoubleQuote ? SINGLE_QUOTE_STYLE_RULES : undefined),
    };
}

module.exports = {
    getPrettier,
};
