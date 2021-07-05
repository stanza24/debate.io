# Jest + Sonarqube

Для работы с Sonarqube требуется наличие *.lcov файла, указываемого в конфиг файле `sonar-project.properties` в параметре `sonar.javascript.lcov.reportPaths`.

## ВНИМАНИЕ
Для запуска некоторых тестов вам потребуется добавить бабель в ваш проект.

Настройки бабеля можно взять из пакета @utils-npm/build-kit.


## Настройка Jest
### Плагины

Для Intellij плагин уже входит в коробку.

[Jest для VS Code](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

### Конфигурационный файл `jest.config.js`
Для настройки тестов создайте файл `jest.config.js` со следующим содержимым:

    const jestConfig = require('@utils-npm/qg-kit/jest');

    module.exports = {
        ...jestConfig,
    };


## Запуск
Опишите в вашем файле `package.json` следующие скрипты.

        "test": "jest",
        "test:coverage": "jest --coverage"

