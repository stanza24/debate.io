# TypeScript

Для работы с TypeScript вам необходимо описать файл конфигурации `tsconfig.json`, наша рекомендация заполнять его следующим образом:

    {
        "compilerOptions": {
            "allowJs": true,
            "allowSyntheticDefaultImports": true,
            "alwaysStrict": true,
            "baseUrl": "./src",
            "diagnostics": true,
            "esModuleInterop": true,
            "experimentalDecorators": true,
            "forceConsistentCasingInFileNames": true,
            "isolatedModules": true,
            "jsx": "react",
            "keyofStringsOnly": true,
            "lib": ["es6", "es7", "dom"],
            "module": "esnext",
            "moduleResolution": "node",
            "noEmitHelpers": false,
            "noEmitOnError": false,
            "noErrorTruncation": true,
            "noImplicitReturns": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "preserveConstEnums": true,
            "pretty": true,
            "removeComments": false,
            "skipDefaultLibCheck": true,
            "skipLibCheck": true,
            "sourceMap": true,
            "strict": true,
            "target": "es5"
        },
        "include": ["src"],
        "exclude": ["build", "node_modules"]
    }
