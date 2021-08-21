module.exports = {
    extends: require.resolve('./packages/utils-npm/qg-kit/eslint/strict'),
    rules: {
        // Переопределяем правило для использования утилит
        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: 'react-router-dom',
                        importNames: ['Route', 'useHistory'],
                        message: '\nPlease use Route and useHistory from Core instead.',
                    },
                    {
                        name: 'Core/Utils/RouterUtils/History',
                        importNames: ['historyApp'],
                        message: '\nPlease use RouterUtils from Core instead.',
                    },
                    {
                        name: 'react-router',
                        importNames: ['RouteComponentProps'],
                        message: '\nPlease use IRouteMixedProps from Core instead.',
                    },
                ],
            },
        ],
    },
};
