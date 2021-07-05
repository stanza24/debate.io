const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const COVERAGE_PATH = process.env.COVERAGE_PATH || 'coverage';

const paths = {
    coverageDirectory: resolveApp(COVERAGE_PATH),
    src: resolveApp('src'),
};

paths.resolveModules = [paths.src, 'node_modules'];

module.exports = {
    verbose: true,
    setupFiles: ['<rootDir>/node_modules/regenerator-runtime/runtime'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}',
        '<rootDir>/src/**/*.(spec|test).{js,jsx,mjs,ts,tsx}',
    ],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    modulePaths: ['src'],
    moduleNameMapper: {
        // маппинг между путями tsconfig и jest
        'src/(.*)': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(js|jsx|mjs|ts|tsx)$': 'babel-jest',
        '.+\\.(less)$': 'jest-transform-stub',
        '^.+\\.css$': path.join(__dirname, 'config', 'cssTransform.js'),
        '^(?!.*\\.(js|jsx|mjs|css|json|ts|tsx)$)': path.join(__dirname, 'config', 'cssTransform.js'),
    },
    setupFilesAfterEnv: [
        path.join(__dirname, 'setup', 'beforeAll.js'),
        path.join(__dirname, 'setup', 'cleanUp.js'),
        path.join(__dirname, 'setup', 'setupPolyfills.js'),
    ],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
    moduleDirectories: paths.resolveModules,
    moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs', 'ts', 'tsx'],
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs,ts,tsx}'],
    coverageDirectory: paths.coverageDirectory,
    forceCoverageMatch: [],
    coverageReporters: ['json', 'text', 'text-summary', 'lcov'],
    reporters: process.env.EXTENDED_TIMING
        ? [
              // упрощенный набор для кавераджа, но больше инфы о медленных тестах
              'jest-simple-dot-reporter',
              // jenkins
              ['jest-junit', {outputDirectory: paths.coverageDirectory, usePathForSuiteName: true}],
              ['jest-slow-test-reporter', {numTests: 15, warnOnSlowerThan: 500, color: false}],
          ]
        : [
              'jest-standard-reporter',
              // jenkins
              ['jest-junit', {outputDirectory: paths.coverageDirectory, usePathForSuiteName: true}],
              ['jest-slow-test-reporter', {numTests: 3, warnOnSlowerThan: 700, color: false}],
          ],
};
