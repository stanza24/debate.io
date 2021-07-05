const actions = require('./actions');
const helpers = require('./helpers');
const prompts = require('./prompts');

/**
 * @typedef {import('plop').NodePlopAPI} NodePlopAPI
 */

/**
 *
 * @param {NodePlopAPI} plop
 */
module.exports = function plopFn(plop) {
    // Здесь мы регистрируем каждую вспомогательную функцию для Plop.
    Object.keys(helpers).forEach((key) => {
        plop.setHelper(key, helpers[key]);
    });

    plop.setGenerator('component', {
        description: 'Создать файлы для проекта как компоненты, модули и так далее.',
        prompts,
        actions,
    });
};
