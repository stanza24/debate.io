module.exports = {
    extends: require.resolve('@utils-npm/qg-kit/eslint/strict'),
    rules: {
        // Выключим правило про дев dependencies (вроде пока не нужно)
        'import/no-extraneous-dependencies': 'off',
    },
};
