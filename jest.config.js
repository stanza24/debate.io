require('dotenv').config();

const jestConfig = require('./utils-npm/qg-kit/jest');

module.exports = {
    ...jestConfig,
    projects: ['<rootDir>/packages/*/jest.config.js'],
};
