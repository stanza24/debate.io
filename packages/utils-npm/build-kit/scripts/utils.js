/* eslint-disable  import/no-extraneous-dependencies */
const chalk = require('chalk');
/* eslint-enable  import/no-extraneous-dependencies */

const NO_COMPILER_NAME = 'NO_COMPILER_NAME';

const hasEslintError = (info) => info.errors.some(({message}) => message.includes('eslint'));

const logMessage = (message, level = 'info') => {
    // eslint-disable-next-line no-nested-ternary
    const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white';
    // eslint-disable-next-line no-console
    console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

const compilerPromise = (compiler) => {
    return new Promise((resolve, reject) => {
        if (!compiler.name) {
            throw new Error(`${NO_COMPILER_NAME}: make sure the Webpack compiler has a 'name' property`);
        }

        const {name} = compiler;

        /**
         * Called right after beforeCompile, before a new compilation is created.
         *
         * @see https://webpack.js.org/api/compiler-hooks/#compile
         */
        compiler.hooks.compile.tap(name, () => {
            logMessage(`[${name}] Compiling `);
        });

        /**
         * Executed when the compilation has completed
         *
         * @see https://webpack.js.org/api/compiler-hooks/#done
         */
        compiler.hooks.done.tap(name, (stats) => {
            const info = stats.toJson();
            const hasErrors = stats.hasErrors() || hasEslintError(info);

            if (!hasErrors) {
                resolve();
            }

            return reject(new Error(`Failed to compile ${name}`));
        });
    });
};

module.exports = {
    compilerPromise,
    logMessage,
};
