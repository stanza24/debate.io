# ESLint TypeScript

## Плагины для IDE

[ESLint для Intellij](https://plugins.jetbrains.com/plugin/7494-eslint/)

[ESLint для VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Настройка .eslintrc.js
Для корректной работы линтера необходимо создать `tsconfig.eslint.json` файл, который должен ссылаться на ваш основной `tsconfig.json`

    // tsconfig.eslint.json
    {
        // Путь до вашего `tsconfig.json`
        "extends": "tsconfig.json",
        // Перечислить все дирректории и файлы за которыми надо следить через ESLint c @typescript-eslint/parser.
        // Необходимо для @typescript-eslint/parser
        "include": ["./src"],
        "exclude": ["node_modules"]
    }

А так же создать файл `.eslintrc.js` где потребуется подключить правила из библиотеки

    // .eslintrc.js
    module.exports = {
        // Базовые правила ESLint для js кода
        extends: require.resolve('@utils-npm/qg-kit/eslint/strict'),
    };
