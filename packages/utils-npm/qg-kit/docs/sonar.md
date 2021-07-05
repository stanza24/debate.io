# Sonarqube

[Sonarqube Банка](https://sbt-sonarqube.sigma.sbrf.ru)

[properties-файлы для Intellij](https://plugins.jetbrains.com/plugin/11594-properties/)

Для IDE есть плагин `SonarLint`, для анализа замечаний.
Про настройку есть [неплохая статья на хабре](https://habr.com/ru/company/krista/blog/469963/)

Управление свойствами проекта происходит через изменение параметров в файле `sonar-project.properties`

    sonar.projectName=sber-npm-qg-kit
    sonar.projectKey=sber-npm-qg-kit
    sonar.sources=./
    sonar.sourceEncoding=UTF-8
    sonar.javascript.file.suffixes=.js,.jsx
    sonar.typescript.file.suffixes=.ts,.tsx
    sonar.typescript.tsconfigPath=tsconfig.json
    # Необходимо указывать правильный путь до папки с бандлом, следите за вашим process.env.BUNDLE_PATH
    sonar.typescript.lcov.reportPaths=dist/coverage/lcov.info
    sonar.test.inclusions=**/*.spec.js, **/*.spec.jsx

    sonar.exclusions=node_modules/**/*, dist/**/*

    # Excluded for duplication:
    sonar.cpd.exclusions=dist/**/*.*
    sonar.cpd.html.minimumtokens=500
    sonar.cpd.html.minimumLines=15
    sonar.cpd.css.minimumtokens=300
    sonar.cpd.css.minimumLines=15
    sonar.cpd.json.minimumtokens=500
    sonar.cpd.json.minimumLines=100
    sonar.cpd.js.minimumtokens=500
    sonar.cpd.js.minimumLines=120

    sonar.coverage.exclusions=**/*.js

