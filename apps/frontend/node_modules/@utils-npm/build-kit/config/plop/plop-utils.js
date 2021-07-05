/** @module helpers */
const paths = require('../paths');

/**
 * @typedef {'functional' | 'class'} Role
 * @typedef {'ts' | 'tsx' | 'test.tsx' | 'less'} Ext Формат/разрешение файла.
 * @typedef {'component' | 'module'} ComponentType Тип компонента.
 */

/**
 * @typedef {object} ComponentPaths
 * @property {string} path Путь где будет компонент.
 * @property {string} templatePath Путь нахождения шаблона.
 */

/**
 * @typedef {object} Answers
 * @property {ComponentType} componentType
 */

/**
 * @function componentPath
 * @param {Role} role Роль компонента.
 * @return {(ext: Ext) => string} польный путь компонента с форматон.
 */
const componentPath = (role) => (ext) =>
    `${paths.src}/${role}/{{properCase componentName}}/{{properCase componentName}}.${ext}`;
/**
 * TODO: исправить поведение этой абстракции.
 */
// const componentPath = (role) => (ext) => ({
//     path: `${paths.src}/${role}/{{properCase componentName}}/{{properCase componentName}}.${ext}`,
//     templatePath: `${paths.pathPlopTemplates}/component/component.${ext}.plop`,
// });

/**
 * Проверка когда тип компонента является функциональным ли нет.
 * @function isFunctional
 * @param {Role} [componentType="functional"] Тип компонента.
 * @returns {boolean}
 */
const isFunctional = (componentType) => componentType === 'functional';

/**
 * @function setTemplatePath
 * @param {Ext} ext
 * @returns {string} Польный путь шаблона с форматон.
 */
const setTemplatePath = (ext) => `${paths.pathPlopTemplates}/component/component.${ext}.plop`;

/**
 * Проверка типа компонента.
 * @param {ComponentType} type
 * @return {(answers: Answers) => boolean} componentType
 */
const checkComponentType = (type) => ({componentType}) => componentType === type;

module.exports = {
    checkComponentType,
    componentPath,
    isFunctional,
    setTemplatePath,
};
