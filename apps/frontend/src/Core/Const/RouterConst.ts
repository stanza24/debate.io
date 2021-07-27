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
