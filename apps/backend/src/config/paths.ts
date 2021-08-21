import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
    assets: resolveApp('assets'),
    images: resolveApp('assets/images'),
    resources: resolveApp('assets/resources'),
    pathApp: resolveApp('app.ts'),
    rootFolder: appDirectory,
};

export default paths;
