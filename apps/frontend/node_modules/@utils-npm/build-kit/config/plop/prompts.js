const {checkComponentType} = require('./plop-utils');

module.exports = [
    {
        type: 'list',
        name: 'componentType',
        message: 'что вы хотите создать?',
        choices: ['component', 'module'],
    },
    {
        type: 'prompt',
        name: 'componentName',
        message: 'Название компонента:',
        when: checkComponentType('component'),
    },
    {
        type: 'prompt',
        name: 'componentName',
        message: 'Название модуля:',
        when: checkComponentType('module'),
    },
    {
        type: 'list',
        name: 'componentRole',
        message: 'Выберите роль компонента',
        choices: ['Сore', 'Common'],
        default: 'Common',
        when: checkComponentType('component'),
    },
    // TODO: добавить когда подключить новый компонент с redux
    // {
    //     type: 'confirm',
    //     name: 'connectToRedux',
    //     message: 'Хотите подключить к Redux?',
    //     default: false,
    // },
];
