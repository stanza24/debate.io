module.exports = {
    extends: [
        'airbnb-base',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:lodash/recommended',
    ],
    plugins: ['import', 'react', 'react-hooks', 'jsx-a11y', 'prettier', 'lodash'],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        'import/extensions': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
        'import/external-module-folders': ['node_modules'],
        'import/core-modules': [],
        'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],
    },
    rules: {
        // Вырубаем правило запрещающее навешивать на статичные элементы хендлеры TODO Продумать хорошенько это правило
        'jsx-a11y/no-static-element-interactions': 'off',
        // Вырубаем правило обязывающее навешивать доп события, типо onKeyUp, onKeyDown, onKeyPress
        'jsx-a11y/click-events-have-key-events': 'off',
        // Пустая строка в конце каждого файла
        'eol-last': 'error',
        // Добавляем пустые строки между методами в классах
        'lines-between-class-members': ['error', 'always'],
        // Запрещаем больше одной пустой строчки подряд
        'no-multiple-empty-lines': ['error', {max: 1}],
        // Запрещаем и удаляем бесполезные пробелы
        'no-trailing-spaces': 'error',
        // Переопределяем правило по неиспользуемым переменным, разрешаем _ и рест операторы
        'no-unused-vars': ['error', {argsIgnorePattern: '^_', ignoreRestSiblings: true}],
        // По умолчанию это правило включено, тут мы делаем это правило менее строгим, если будет нужно то это вырубим
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        // Используем одинарные кавычки для строковых переменных
        quotes: ['error', 'single', {allowTemplateLiterals: true}],
        // Включаем всякие прикольные штуки для хуков
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react/jsx-uses-vars': 'error',
        'react/jsx-filename-extension': [2, {extensions: ['.jsx', '.tsx']}],
        /**
         * Новый JSX трансформер не требует импортировать React в область видимости
         * @link https://ru.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
         */
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        // Добавляем пустую строку после последнего импорта в файле
        'import/newline-after-import': 'error',
        // Заставляем импорты сортироваться, но вырубаем сортировку строк импортов, этим занимается правило import/order
        'sort-imports': [
            2,
            {
                ignoreDeclarationSort: true,
            },
        ],
        'import/order': [
            'error',
            {
                groups: [['external', 'builtin'], 'internal', ['parent', 'sibling', 'index']],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        // Вырубаем правила которые говорят нам импортировать зависимости с расширением файла
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        // Выключаем правило которое запрещает нам использовать именованный экспорт
        'import/prefer-default-export': 'off',
        'import/no-unresolved': ['warn', {ignore: ['^!file'], caseSensitive: true}],
        // Переключаем правило по иморту из lodash
        'lodash/import-scope': [2, 'member'],
        // Вырубаем правило которое заставляет нас использовать lodash
        'lodash/prefer-constant': 'off',
        'lodash/prefer-lodash-method': 'off',
        'lodash/prefer-lodash-typecheck': 'off',
        // Отключаем правило заставляющее нас обращаться к свойствам объекта через квадратные скобки
        'dot-notation': 'off',
        // Отключаем необходимость указывать default в switch case
        'default-case': 'off',
        // Выключаем правило которое запрещает нам использовать классы без this, иногда, но бывает что это не обязательно
        'class-methods-use-this': 'off',
        // Предупреждаем об оставленном console
        'no-console': 'warn',
        // Запрещаем дебаггер
        'no-debugger': 'error',
        // Запрещаем высшее зло
        'no-eval': 'error',
        // Отключаем правило запрещающее использовать бесполезные конструкторы, иногда они нужны
        'no-useless-constructor': 'off',
        'no-use-before-define': ['error', {functions: false, classes: true, variables: true}],
    },
};
