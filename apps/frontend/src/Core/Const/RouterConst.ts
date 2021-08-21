/**
 * Мапа всех роутов приложения
 */
export const ROUTE = {
    NOT_FOUND: {
        PATH: '/404',
    },
    APP: {
        PATH: '/',
    },
    UNAUTHORIZED: {
        PATH: '/:unauthorizedStep(|authorization|registration|restore-password)?',
        LAYOUT: {
            PATH: '/:unauthorizedStep(authorization|registration|restore-password)',
        },
        AUTHORIZATION: {
            PATH: '/authorization',
        },
        REGISTRATION: {
            PATH: '/registration',
        },
        RESTORE_PASSWORD: {
            PATH: '/restore-password',
        },
    },
    CLIENT: {
        LAYOUT_PATH: '/',
        ACCOUNT: {
            PATH: '/account',
            SECTIONS: {
                PATH: '/account/:section(profile|settings)',
            },
            PROFILE: {
                PATH: '/account/profile',
            },
            SETTINGS: {
                PATH: '/account/settings',
            },
        },
    },
};
