module.exports = {
    files: [
        '*.{test,spec}.{js,jsx,ts,tsx}',
        '{test,spec}/*.{js,jsx,ts,tsx}',
        '**/{TestUtils,JestUtils}/*.{js,jsx,ts,tsx}',
    ],
    plugins: ['jest-formatting', 'jest'],
    env: {
        browser: true,
        node: true,
        'jest/globals': true,
    },
    rules: {
        'max-len': 'off',
        'import/no-restricted-paths': 'off', // в тестах можно моки?

        'import/no-extraneous-dependencies': 'off',
        // for @testEnvironment / @jestEnvironment
        'jsdoc/check-tag-names': 'off',

        'react/forbid-prop-types': 'off', // PropTypes.object можно в тестах
        'unicorn/no-abusive-eslint-disable': 'off', // в тестах можно и на весь файл отключать

        // https://www.npmjs.com/package/eslint-plugin-jest
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',

        'jest-formatting/padding-around-expect-groups': 'off', // не всегда expect надо выделять
        'jest-formatting/padding-around-test-blocks': 'error',
        'jest-formatting/padding-around-describe-blocks': 'error',
        'jest-formatting/padding-around-after-all-blocks': 'error',
        'jest-formatting/padding-around-before-each-blocks': 'error',
        'jest-formatting/padding-around-before-all-blocks': 'error',
    },
};
