require('dotenv').config();

const jestConfig = require('@utils-npm/qg-kit/jest');

module.exports = {
    ...jestConfig,
    moduleNameMapper: {
        '@debate/common/src/(.*)$': '<rootDir>../../packages/common/src/$1',
        ...jestConfig.moduleNameMapper,
    },
};
