const LOCALHOST = 'http://localhost';

module.exports = {
    PORT: process.env.PORT || 8080,
    MODE: process.env.NODE_ENV,
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    USE_THREAD: process.env.USE_THREAD === 'true',
    USE_TS_LOADER: process.env.USE_TS_LOADER === 'true',
    DEVSERVER_HOST: process.env.DEVSERVER_HOST || LOCALHOST,
    HOST: process.env.HOST || LOCALHOST,
    PROJECT_TITLE: process.env.PROJECT_TITLE || 'Boilerplate',
    PUBLIC_PATH: process.env.PUBLIC_PATH || '/',
    BUNDLE_PATH: process.env.BUNDLE_PATH || 'dist',
    USE_CDN_REACT: process.env.USE_CDN_REACT === 'true',
    DEV_PROXY_PATH_TO: process.env.DEV_PROXY_PATH_TO,
    DEV_PROXY_PATH_FROM: process.env.DEV_PROXY_PATH_FROM || '/rest',
};
