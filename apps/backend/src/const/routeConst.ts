/** Роуты приложения. */
export const ROUTE = {
    SERVER: {
        PATH: '/',
    },
    API: {
        PATH: '/api',

        AUTHORIZATION: {
            PATH: '/auth',
            FULL_PATH: '/api/auth',
            CHECK: {
                PATH: '/check',
                FULL_PATH: '/api/auth/check',
            },
            SIGN_UP: {
                PATH: '/sign-up',
                FULL_PATH: '/api/auth/sign-up',
            },
            SIGN_IN: {
                PATH: '/sign-in',
                FULL_PATH: '/api/auth/sign-in',
            },
            VERIFY: {
                PATH: '/verify',
                FULL_PATH: '/api/auth/verify'
            },
            REFRESH: {
                PATH: '/refresh',
                FULL_PATH: '/api/auth/refresh'
            }
        },

        DEBATES: {
            PATH: '/debates',
            FULL_PATH: '/api/debates',
            ALL: {
                PATH: '/',
                FULL_PATH: '/api/debates',
            }
        }
    },
};
