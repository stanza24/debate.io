/** Префикс всех экшенов модуля */
const NAMESPACE = 'CORE_AUTH_SETTINGS';

/** Мапа всех экшен тайпов */
export const ActionTypes = {
    CORE_AUTH_SETTINGS_AUTH_CHECK: `${NAMESPACE}_AUTH_CHECK`,
    CORE_AUTH_SETTINGS_SIGN_UP: `${NAMESPACE}_SIGN_UP`,
    CORE_AUTH_SETTINGS_SIGN_IN: `${NAMESPACE}_SIGN_IN`,
    CORE_AUTH_SETTINGS_LOG_OUT: `${NAMESPACE}_LOG_OUT`,
    CORE_AUTH_SETTINGS_RESTORE_PASSWORD: `${NAMESPACE}_RESTORE_PASSWORD`,
    CORE_AUTH_SETTINGS_CHANGE_PASSWORD: `${NAMESPACE}_CHANGE_PASSWORD`,
};