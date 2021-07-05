const osInfo = require('os');

function getThreadLoader(poolName = 'all-work-pool') {
    return {
        loader: 'thread-loader',
        options: {
            workerNodeArgs: ['--max-old-space-size=4096'],
            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
            workers: osInfo.cpus().length - 1,
            poolTimeout: Infinity, // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
            name: poolName,
        },
    };
}

module.exports = {getThreadLoader};
