module.exports = {
    files: [
        // Все файлы конфигураций
        '**/dev-tools.{js,ts}',
        '**/jest/**/*.js',
        '**/webpack/**/*.js',
        '**/*webpack.*.js',
        '**/config/**/*.js',
        '**/*.config*.js',
        '**/.*rc.js',
        // Все файлы локальных серверов
        '**/server/**/*.{js,ts}',
    ],
    env: {
        browser: false,
        node: true,
        commonjs: true,
    },
    rules: {
        // Для конфигов мы отключаем часть правил
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
        'no-extra-boolean-cast': 'off',
        'no-unused-expressions': 'off',
        'no-console': 'off',
    },
};
