# stylelint

## Плагины для IDE

[Intellij есть поддержка из коробки](https://plugins.jetbrains.com/plugin/9276-intellij-stylelint-plugin/)

[stylelint в VS Code](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)

## Настройка .eslintrc.js
Для подключения стайллинта из библиотеки, создайте файл `stylelint.config.js` со следующим содержимым.

    module.exports = {
        extends: '@utils-npm/qg-kit/stylelint',
    };
