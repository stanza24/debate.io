# `@utils-npm/build-kit/scripts`

Работа скриптов в пакете зависит от переменных окружения, в связи с чем вам в проект необходимо установить библиотеку
для управления переменными окружения:

1. `cross-env`
2. `dotenv` (рекомендуется)

## Использование с `cross-env`
Для использования данного пакета с cross-env вам достаточно описать в вашем `package.json` файле, в разделе `scripts` все необходимые вам параметры:

    ...
    "scripts": {
        ...
        "dev": "cross-env TSC_WATCHFILE=UseFsEventsWithFallbackDynamicPolling NODE_ENV=development USE_THREAD=true PORT=3000 node node_modules/@utils-npm/build-kit/scripts/start.js",
        "build": "cross-env NODE_ENV=production BUNDLE_PATH=dist node node_modules/@utils-npm/build-kit/scripts/build.js",
        ...
    }
    ...

## Использование с `dotenv`

    ...
    "scripts": {
        ...
        "dev": "cross-env TSC_WATCHFILE=UseFsEventsWithFallbackDynamicPolling NODE_ENV=development USE_THREAD=true PORT=3000 node node_modules/@utils-npm/build-kit/scripts/start.js",
        "build": "cross-env NODE_ENV=production BUNDLE_PATH=dist node node_modules/@utils-npm/build-kit/scripts/build.js",
        ...
    }
    ...
