# Prettier

Настройки prettier соответствующие принятому код-стайлу.

- кодстиль,
- упрощение реформатинга кода,


[Prettier для Intellij](https://plugins.jetbrains.com/plugin/10456-prettier)

[Prettier для VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Подключение конфигурации в проекте.

    // .prettierrc.js
    const { getPrettier } = require("@utils-npm/qg-kit/prettier");

    module.exports = getPrettier();

