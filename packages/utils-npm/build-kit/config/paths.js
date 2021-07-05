const fs = require('fs');
const path = require('path');
const {BUNDLE_PATH} = require('./constants');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
    assets: resolveApp('src/Assets'),
    configWebpack: path.resolve(__dirname, 'webpack'),
    dist: resolveApp(BUNDLE_PATH),
    images: resolveApp('src/Assets/images'),
    mocks: resolveApp('src/Assets/mocks'),
    pathIndex: resolveApp('src/index.tsx'),
    pathPlopTemplates: resolveApp('config/plop/templates'),
    pathTsConfig: resolveApp('tsconfig.json'),
    rootFolder: appDirectory,
    src: resolveApp('src'),
};

paths.resolveModules = [paths.src, 'node_modules'];
paths.coverageDirectory = path.join(paths.dist, 'coverage');
paths.templatePath = path.join(paths.configWebpack, 'index.ejs');

module.exports = paths;
