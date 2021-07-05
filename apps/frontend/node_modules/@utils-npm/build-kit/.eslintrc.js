module.exports = {
    extends: require.resolve('@utils-npm/qg-kit/eslint/strict'),
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
